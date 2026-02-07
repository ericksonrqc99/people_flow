import { jsxs, jsx } from "react/jsx-runtime";
import axios from "axios";
import { c as capitalizeFirstLetter } from "./utils-CPq9aNLN.js";
import { useState } from "react";
import "clsx";
import "tailwind-merge";
const searchCitizenByDni = async (dni) => {
  const response = await axios.get(
    route("citizen.search-citizen-by-dni", {
      dni
    }),
    {
      withCredentials: true
    }
  );
  return response.data;
};
function FirstScreen({ setData, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleOnChangeInput = async (e) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    if (value.length <= 8 && value.length >= 0) {
      setData({
        ...data,
        citizen: { ...data.citizen, document_number: value }
      });
    }
    if (value.length === 8 && value !== "00000000") {
      try {
        setError("");
        setIsLoading(true);
        const response = await searchCitizenByDni(value);
        setIsLoading(false);
        console.log({ response });
        if (response.ok) {
          setData({ ...data, citizen: { ...response } });
          return;
        }
        setError(response.message);
      } catch (error2) {
        setIsLoading(false);
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full", children: [
    /* @__PURE__ */ jsx("header", { className: "flex justify-center h-1/2 ", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "assets/images/escudo-muni.png",
        className: "object-contain w-full h-full",
        alt: "Escudo de la municipalidad distrital de San Miguel"
      }
    ) }),
    /* @__PURE__ */ jsx("section", { className: "flex justify-center h-1/2 ", children: /* @__PURE__ */ jsxs("div", { className: "w-1/2 flex flex-col gap-y-6 justify-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center font-semibold text-4xl text-custom-foreground", children: "Genera tu ticket" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          onChange: (e) => {
            handleOnChangeInput(e);
          },
          value: data.citizen.document_number,
          autoFocus: true,
          type: "text",
          placeholder: "Ingresa tu DNI",
          className: "shadow-inner  text-center text-4xl h-14 border-1 border-custom-input-border rounded-md"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-14", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("span", { className: "loader" }) }) : data.citizen.ok ? /* @__PURE__ */ jsxs("p", { className: "text-3xl text-center font-semibold text-custom-900", children: [
        capitalizeFirstLetter(data.citizen.names),
        " ",
        capitalizeFirstLetter(
          data.citizen.first_surname
        ),
        " ",
        capitalizeFirstLetter(
          data.citizen.second_surname
        )
      ] }) : error && /* @__PURE__ */ jsx("p", { className: "text-xl text-center text-red-500 font-semibold", children: error }) })
    ] }) })
  ] });
}
export {
  FirstScreen as default
};
