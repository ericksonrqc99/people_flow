import { jsxs, jsx } from "react/jsx-runtime";
import BoxContent from "./box-content-epwYYoJF.js";
import "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function GerenciasScreen({
  gerencias,
  setData,
  data,
  generateTicket
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2 items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center text-4xl font-semibold", children: "Gerencias" }),
    /* @__PURE__ */ jsx("section", { className: "grid grid-cols-2 gap-2 w-3/12", children: gerencias.map((gerencia) => /* @__PURE__ */ jsx(
      BoxContent,
      {
        area: gerencia,
        className: "text-xl  text-custom-900 ",
        data,
        setData,
        generateTicket
      },
      gerencia.id
    )) })
  ] });
}
export {
  GerenciasScreen as default
};
