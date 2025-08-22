import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-44jshGyU.js";
import { b as TabsList, c as TabsTrigger } from "./tabs-CsS9G-dH.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BMo_LHkK.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tabs";
function first({ ticketsData }) {
  return /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
    /* @__PURE__ */ jsxs(TabsTrigger, { value: "todos", className: "flex items-center gap-2", children: [
      "Todos",
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-1 px-2 py-0 text-xs", children: ticketsData.length })
    ] }),
    /* @__PURE__ */ jsxs(TabsTrigger, { value: "en espera", className: "flex items-center gap-2", children: [
      "En Espera",
      /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "secondary",
          className: "ml-1 px-2 py-0 text-xs bg-yellow-100 text-yellow-800",
          children: ticketsData.filter((t) => t.status.type === "en espera").length
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(TabsTrigger, { value: "cerrado", className: "flex items-center gap-2", children: [
      "Cerrados",
      /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "secondary",
          className: "ml-1 px-2 py-0 text-xs bg-green-100 text-green-800",
          children: ticketsData.filter((t) => t.status.type === "cerrado").length
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(TabsTrigger, { value: "cancelado", className: "flex items-center gap-2", children: [
      "Cancelados",
      /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "secondary",
          className: "ml-1 px-2 py-0 text-xs bg-red-100 text-red-800",
          children: ticketsData.filter((t) => t.status.type === "cancelado").length
        }
      )
    ] })
  ] });
}
export {
  first as default
};
