import { jsxs, jsx } from "react/jsx-runtime";
import { s as searchCitizenByDni } from "./citizen-ujNgKD5J.js";
import { c as capitalizeFirstLetter } from "./utils-MEMCRJMC.js";
import { useState } from "react";
import "axios";
import "clsx";
import "tailwind-merge";
function FirstScreen({ setData, data }) {
  var _a;
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChangeInput = async (e) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    if (value.length <= 8 && value.length >= 0) {
      setData({
        ...data,
        citizen: { ...data.citizen, numeroDocumento: value }
      });
    }
    if (value.length === 8) {
      try {
        setIsLoading(true);
        const response = await searchCitizenByDni(value);
        setIsLoading(false);
        setData({ ...data, citizen: { ...response } });
      } catch (error) {
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
          value: (_a = data.citizen) == null ? void 0 : _a.numeroDocumento,
          autoFocus: true,
          type: "text",
          placeholder: "Ingresa tu DNI",
          className: "shadow-inner  text-center text-4xl h-14 border-1 border-custom-input-border rounded-md"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-14", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("span", { className: "loader" }) }) : data.citizen.ok && /* @__PURE__ */ jsxs("p", { className: "text-3xl text-center font-semibold text-custom-900", children: [
        capitalizeFirstLetter(
          data.citizen.nombres
        ),
        " ",
        capitalizeFirstLetter(
          data.citizen.apellidoPaterno
        ),
        " ",
        capitalizeFirstLetter(
          data.citizen.apellidoMaterno
        )
      ] }) })
    ] }) })
  ] });
}
export {
  FirstScreen as default
};
