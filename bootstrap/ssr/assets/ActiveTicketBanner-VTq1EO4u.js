import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button } from "./button-BmnVj2kL.js";
import { C as Card, a as CardContent } from "./card-Cm8ppzCC.js";
import { AlertTriangle, Eye } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BMo_LHkK.js";
import "clsx";
import "tailwind-merge";
function ActiveTicketBanner({
  currentActiveTicket,
  onViewTicket
}) {
  var _a, _b, _c;
  return /* @__PURE__ */ jsx(Card, { className: "border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full animate-pulse", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6 text-orange-600" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-orange-800 text-lg", children: "Ticket en atención activa" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-orange-700 font-medium", children: [
          currentActiveTicket.visible_code,
          " - ",
          [
            (_a = currentActiveTicket.citizen) == null ? void 0 : _a.names,
            (_b = currentActiveTicket.citizen) == null ? void 0 : _b.first_surname,
            (_c = currentActiveTicket.citizen) == null ? void 0 : _c.second_surname
          ].filter(Boolean).join(" ")
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-orange-600 mt-1", children: "Continúa atendiendo a este ciudadano" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      Button,
      {
        onClick: onViewTicket,
        className: "bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
        children: [
          /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 mr-2" }),
          "Continuar atención"
        ]
      }
    )
  ] }) }) });
}
export {
  ActiveTicketBanner as default
};
