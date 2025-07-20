import { jsxs, jsx } from "react/jsx-runtime";
import BoxContent from "./box-content-epwYYoJF.js";
import "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function SubGerenciasScreen({
  subGerencias,
  setData,
  data,
  generateTicket
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2 ", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center text-4xl font-semibold", children: "Sub Gerencias" }),
    /* @__PURE__ */ jsx("section", { className: "grid grid-cols-6 gap-2 wrap", children: subGerencias.map((subGerencia) => /* @__PURE__ */ jsx(
      BoxContent,
      {
        area: subGerencia,
        className: "text-xl text-custom-900",
        generateTicket,
        data,
        setData
      },
      subGerencia.id
    )) })
  ] });
}
export {
  SubGerenciasScreen as default
};
