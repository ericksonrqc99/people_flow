import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-eMoabTnV.js";
import { B as Button } from "./button-DYBWqrh5.js";
import { C as Card, a as CardContent } from "./card-o23MGwpj.js";
import { ArrowRightLeft, Eye, UserCheck, Circle, XCircle, CheckCircle, Clock } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-CPq9aNLN.js";
import "clsx";
import "tailwind-merge";
function CategoryTabs({
  activeTab,
  setActiveTab,
  ticketsData,
  getFilteredTickets,
  openTakeModal,
  openViewModal
}) {
  const getStatusText = (status) => {
    switch (status) {
      case "en espera":
        return "En espera";
      case "atendiendo":
        return "Atendiendo";
      case "cerrado":
        return "Cerrado";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };
  const isTicketDerived = (ticket) => {
    return ticket.observations && ticket.observations.includes("[Derivado desde área:");
  };
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "en espera":
        return "default";
      // Verde para destacar tickets disponibles
      case "atendiendo":
        return "secondary";
      // Gris para en proceso
      case "cerrado":
        return "outline";
      // Verde más sutil para completados
      case "cancelado":
        return "destructive";
      // Rojo para cancelados
      default:
        return "secondary";
    }
  };
  const getCardStyling = (status) => {
    switch (status) {
      case "en espera":
        return "border-green-200 bg-green-50/30 hover:bg-green-50/60 hover:border-green-300";
      case "atendiendo":
        return "border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60 hover:border-emerald-300";
      case "cerrado":
        return "border-teal-200 bg-teal-50/30 hover:bg-teal-50/60 hover:border-teal-300";
      case "cancelado":
        return "border-red-200 bg-red-50/30 hover:bg-red-50/60 hover:border-red-300";
      default:
        return "border-gray-200 bg-gray-50/30 hover:bg-gray-50/60 hover:border-gray-300";
    }
  };
  const getStatusIcon = (status) => {
    const iconClass = "w-5 h-5";
    switch (status) {
      case "en espera":
        return /* @__PURE__ */ jsx(Circle, { className: `${iconClass} text-green-600 fill-green-200` });
      case "atendiendo":
        return /* @__PURE__ */ jsx(Clock, { className: `${iconClass} text-yellow-600 fill-yellow-200` });
      case "cerrado":
        return /* @__PURE__ */ jsx(CheckCircle, { className: `${iconClass} text-teal-600 fill-teal-200` });
      case "cancelado":
        return /* @__PURE__ */ jsx(XCircle, { className: `${iconClass} text-red-600 fill-red-200` });
      default:
        return /* @__PURE__ */ jsx(Circle, { className: `${iconClass} text-gray-400` });
    }
  };
  const getCountForCategory = (category) => {
    if (category === "todos") {
      return ticketsData.length;
    }
    return ticketsData.filter((ticket) => {
      var _a;
      return ((_a = ticket.status) == null ? void 0 : _a.type) === category;
    }).length;
  };
  const categories = [
    { key: "todos", label: "Todos", count: getCountForCategory("todos") },
    { key: "en espera", label: "En espera", count: getCountForCategory("en espera") },
    { key: "atendiendo", label: "Atendiendo", count: getCountForCategory("atendiendo") },
    { key: "cerrado", label: "Cerrados", count: getCountForCategory("cerrado") },
    { key: "cancelado", label: "Cancelados", count: getCountForCategory("cancelado") }
  ];
  const filteredTickets = getFilteredTickets();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-gray-100 p-1 rounded-xl shadow-inner", children: categories.map((category) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setActiveTab(category.key),
        className: `flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === category.key ? "bg-white text-gray-900 shadow-md transform scale-105" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`,
        children: [
          category.label,
          /* @__PURE__ */ jsx("span", { className: `ml-2 px-2 py-1 rounded-full text-xs ${activeTab === category.key ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`, children: category.count })
        ]
      },
      category.key
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredTickets.map((ticket) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      return /* @__PURE__ */ jsx(
        Card,
        {
          className: `hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${getCardStyling(((_a = ticket.status) == null ? void 0 : _a.type) || "")} backdrop-blur-sm`,
          children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                getStatusIcon(((_b = ticket.status) == null ? void 0 : _b.type) || ""),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-green-700", children: ticket.visible_code })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: getStatusBadgeVariant(((_c = ticket.status) == null ? void 0 : _c.type) || ""),
                    className: "text-xs font-semibold",
                    children: getStatusText(((_d = ticket.status) == null ? void 0 : _d.type) || "")
                  }
                ),
                isTicketDerived(ticket) && /* @__PURE__ */ jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs font-medium bg-blue-50 text-blue-700 border-blue-200",
                    children: [
                      /* @__PURE__ */ jsx(ArrowRightLeft, { className: "w-3 h-3 mr-1" }),
                      "Derivado"
                    ]
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: [
                  (_e = ticket.citizen) == null ? void 0 : _e.names,
                  (_f = ticket.citizen) == null ? void 0 : _f.first_surname,
                  (_g = ticket.citizen) == null ? void 0 : _g.second_surname
                ].filter(Boolean).join(" ") }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  "DNI: ",
                  (_h = ticket.citizen) == null ? void 0 : _h.document_number
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
                /* @__PURE__ */ jsx("strong", { children: "Área:" }),
                " ",
                (_i = ticket.area) == null ? void 0 : _i.name
              ] }) }),
              ticket.attended_by && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
                /* @__PURE__ */ jsx("strong", { children: "Asignado a:" }),
                " ",
                ticket.attended_by.name
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 pt-3", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => openViewModal(ticket),
                  className: "flex-1 hover:bg-gray-50",
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-1" }),
                    "Ver"
                  ]
                }
              ),
              ((_j = ticket.status) == null ? void 0 : _j.type) === "en espera" && /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => openTakeModal(ticket),
                  className: "flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm",
                  children: [
                    /* @__PURE__ */ jsx(UserCheck, { className: "w-4 h-4 mr-1" }),
                    "Tomar"
                  ]
                }
              )
            ] })
          ] })
        },
        ticket.id
      );
    }) }),
    filteredTickets.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No se encontraron tickets" }) })
  ] });
}
export {
  CategoryTabs as default
};
