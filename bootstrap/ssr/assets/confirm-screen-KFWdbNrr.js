import { jsxs, jsx } from "react/jsx-runtime";
import { f as formatterNameCitizen } from "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function ConfirmScreen({ data }) {
  return /* @__PURE__ */ jsxs("section", { className: "flex justify-center items-center flex-col gap-y-6  ", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center text-custom-foreground text-4xl font-semibold", children: "Confirmar Datos" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-custom-muted border-4 border-dashed border-custom-foreground flex flex-col p-6 rounded-md gap-y-4 text-2xl min-w-1/2 shadow-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Nombre:" }),
      /* @__PURE__ */ jsxs("p", { className: "", children: [
        formatterNameCitizen(data.citizen),
        " "
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Area:" }),
      /* @__PURE__ */ jsx("p", { children: data.area.name })
    ] })
  ] });
}
export {
  ConfirmScreen as default
};
