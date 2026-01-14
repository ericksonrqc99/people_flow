import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card, a as CardContent } from "./card-o23MGwpj.js";
import { Ticket, Clock, ArrowUp } from "lucide-react";
import "./utils-CPq9aNLN.js";
import "clsx";
import "tailwind-merge";
function ActiveTicketMessage() {
  return /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-br from-green-50 to-emerald-100 border-green-200", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-8 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Ticket, { className: "w-8 h-8 text-green-600" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-bounce", children: /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-white" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800", children: "¡Tienes un ticket activo!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-md mx-auto", children: "Tienes un ciudadano esperando tu atención. Haz clic en el banner naranja arriba para continuar." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-green-600 animate-pulse", children: [
      /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Mira el banner naranja" }),
      /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" })
    ] }) })
  ] }) }) });
}
export {
  ActiveTicketMessage as default
};
