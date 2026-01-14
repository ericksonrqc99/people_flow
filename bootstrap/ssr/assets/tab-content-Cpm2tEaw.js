import { jsxs, jsx } from "react/jsx-runtime";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-o23MGwpj.js";
import { B as Badge } from "./badge-eMoabTnV.js";
import { a as TabsContent } from "./tabs-B4582oMd.js";
import { Calendar, User, UserCheck } from "lucide-react";
import { B as Button } from "./button-DYBWqrh5.js";
import "./utils-CPq9aNLN.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-tabs";
function TabContent({
  getFilteredTickets,
  openTakeModal,
  openViewModal,
  tabContentValue
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "en espera":
        return /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "secondary",
            className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
            children: "En Espera"
          }
        );
      case "cancelado":
        return /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Cancelado" });
      case "cerrado":
        return /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "default",
            className: "bg-green-100 text-green-800 hover:bg-green-200",
            children: "Cerrado"
          }
        );
      default:
        return /* @__PURE__ */ jsx(Badge, { variant: "outline", children: status });
    }
  };
  return /* @__PURE__ */ jsxs(TabsContent, { value: tabContentValue, className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold", children: [
      "Todos los Tickets (",
      getFilteredTickets(tabContentValue).length,
      ")"
    ] }) }),
    getFilteredTickets(tabContentValue).length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No se encontraron tickets" }) }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: getFilteredTickets(tabContentValue).map((ticket) => {
      var _a, _b;
      return /* @__PURE__ */ jsxs(
        Card,
        {
          className: "hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: ticket.visible_code }),
              getStatusBadge(ticket.status.type)
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
                  new Date(
                    ticket.created_at
                  ).toLocaleDateString("es-ES")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: `${ticket.citizen.names} ${(_a = ticket.citizen) == null ? void 0 : _a.first_surname} ${(_b = ticket.citizen) == null ? void 0 : _b.second_surname}` })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsx(UserCheck, { className: "h-4 w-4 text-muted-foreground" }),
                  ticket.attended_by ? /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "bg-blue-50 text-blue-700",
                      children: ticket.attended_by.name
                    }
                  ) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Sin asignar" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-2 pt-2", children: !ticket.attended_by && ticket.status.type === "en espera" && /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => openTakeModal(ticket),
                  className: "flex-1 bg-green-600 hover:bg-green-700",
                  children: [
                    /* @__PURE__ */ jsx(UserCheck, { className: "h-4 w-4 mr-1" }),
                    "Tomar"
                  ]
                }
              ) })
            ] })
          ]
        },
        ticket.id
      );
    }) })
  ] });
}
export {
  TabContent as default
};
