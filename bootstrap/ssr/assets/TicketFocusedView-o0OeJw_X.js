import { jsx, jsxs } from "react/jsx-runtime";
import { B as Badge } from "./badge-44jshGyU.js";
import { B as Button } from "./button-BmnVj2kL.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cm8ppzCC.js";
import { User, IdCard, Building2, Clock, FileText, Edit, CheckCircle, X, UserCheck } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-BMo_LHkK.js";
import "clsx";
import "tailwind-merge";
function TicketFocusedView({
  ticket,
  onEdit,
  onClose,
  onRelease
}) {
  var _a, _b, _c, _d, _e, _f;
  const getStatusBadge = (estado) => {
    switch (estado) {
      case "atendiendo":
        return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "bg-emerald-50 text-emerald-700 border-emerald-200", children: [
          /* @__PURE__ */ jsx(UserCheck, { className: "w-4 h-4 mr-1" }),
          "En Atención"
        ] });
      case "cerrado":
        return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "bg-gray-50 text-gray-700 border-gray-200", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-1" }),
          "Cerrado"
        ] });
      case "cancelado":
        return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "bg-red-50 text-red-700 border-red-200", children: [
          /* @__PURE__ */ jsx(X, { className: "w-4 h-4 mr-1" }),
          "Cancelado"
        ] });
      default:
        return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-1" }),
          estado
        ] });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-2xl bg-white rounded-3xl overflow-hidden hover:shadow-3xl transition-shadow duration-500", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.05)_50%,transparent_70%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-between text-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg", children: /* @__PURE__ */ jsx(User, { className: "w-7 h-7 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold tracking-wide", children: `${(_a = ticket.citizen) == null ? void 0 : _a.names} ${(_b = ticket.citizen) == null ? void 0 : _b.first_surname} ${(_c = ticket.citizen) == null ? void 0 : _c.second_surname}` }),
            /* @__PURE__ */ jsxs("p", { className: "text-emerald-100 font-medium text-lg", children: [
              "Ticket #",
              ticket.visible_code
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30", children: getStatusBadge(((_d = ticket.status) == null ? void 0 : _d.type) || "en espera") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "group cursor-default", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(IdCard, { className: "w-4 h-4 text-gray-600" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-600 uppercase tracking-wide", children: "DNI" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 font-mono", children: ((_e = ticket.citizen) == null ? void 0 : _e.document_number) || "No especificado" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "group cursor-default", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-emerald-50 to-green-100 p-5 rounded-2xl border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-emerald-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-emerald-700" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-emerald-700 uppercase tracking-wide", children: "Área" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-emerald-900", children: ((_f = ticket.area) == null ? void 0 : _f.name) || "No asignada" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "group cursor-default md:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-700" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-blue-700 uppercase tracking-wide", children: "Hora de Admisión" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-blue-900", children: ticket.time_admission || "Recién asignado" })
        ] }) })
      ] }),
      ticket.observations && /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-2xl border border-amber-200 shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-amber-700" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-amber-900 uppercase tracking-wide", children: "Observaciones" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/70 backdrop-blur-sm rounded-xl p-4 max-h-[160px] overflow-y-auto border border-amber-300/30", children: /* @__PURE__ */ jsx("p", { className: "text-gray-800 whitespace-pre-wrap break-words leading-relaxed", children: ticket.observations }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onEdit,
            variant: "outline",
            className: "flex-1 h-14 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsx(Edit, { className: "h-5 w-5 mr-3" }),
              "Editar Ticket"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onClose,
            className: "flex-1 h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 mr-3" }),
              "Cerrar Ticket"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onRelease,
            variant: "outline",
            className: "flex-1 h-14 border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsx(X, { className: "h-5 w-5 mr-3" }),
              "Liberar Ticket"
            ]
          }
        )
      ] }) })
    ] })
  ] }) });
}
export {
  TicketFocusedView as default
};
