import { jsx, jsxs } from "react/jsx-runtime";
import { B as Badge } from "./badge-eMoabTnV.js";
import { B as Button } from "./button-DYBWqrh5.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-o23MGwpj.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { a as cn } from "./utils-CPq9aNLN.js";
import { User, ArrowRightLeft, IdCard, Building2, Clock, FileText, MoreVertical, History, MessageSquare, RefreshCw, UserX, CheckCircle, X, UserCheck } from "lucide-react";
import { useState } from "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function TicketFocusedView({
  ticket,
  onClose,
  onRelease,
  onDerive,
  onViewHistory,
  onAddNote,
  onReassign,
  onPrintTicket
}) {
  var _a, _b, _c, _d, _e, _f;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDerive = () => {
    setDropdownOpen(false);
    onDerive == null ? void 0 : onDerive();
  };
  const handleViewHistory = () => {
    setDropdownOpen(false);
    onViewHistory == null ? void 0 : onViewHistory();
  };
  const handleAddNote = () => {
    setDropdownOpen(false);
    onAddNote == null ? void 0 : onAddNote();
  };
  const handleReassign = () => {
    setDropdownOpen(false);
    onReassign == null ? void 0 : onReassign();
  };
  const handlePrintTicket = () => {
    setDropdownOpen(false);
    onPrintTicket == null ? void 0 : onPrintTicket();
  };
  const handleRelease = () => {
    setDropdownOpen(false);
    onRelease();
  };
  const isTicketDerived = (ticket2) => {
    return ticket2.observations && ticket2.observations.includes("[Derivado desde área:");
  };
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
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "border border-gray-200 shadow-2xl bg-white rounded-3xl overflow-hidden hover:shadow-3xl transition-shadow duration-500", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "bg-gray-100 border-b border-gray-200 pt-6 pb-6 px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-200 shadow-sm", children: /* @__PURE__ */ jsx(User, { className: "w-7 h-7 text-emerald-600" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold tracking-wide text-gray-900", children: `${(_a = ticket.citizen) == null ? void 0 : _a.names} ${(_b = ticket.citizen) == null ? void 0 : _b.first_surname} ${(_c = ticket.citizen) == null ? void 0 : _c.second_surname}` }),
          /* @__PURE__ */ jsxs("p", { className: "text-emerald-600 font-medium text-lg", children: [
            "Ticket #",
            ticket.visible_code
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        getStatusBadge(((_d = ticket.status) == null ? void 0 : _d.type) || "en espera"),
        isTicketDerived(ticket) && /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: "bg-blue-50 text-blue-700 border-blue-200",
            children: [
              /* @__PURE__ */ jsx(ArrowRightLeft, { className: "w-3 h-3 mr-1" }),
              "Derivado"
            ]
          }
        )
      ] }) })
    ] }) }),
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
        /* @__PURE__ */ jsxs(DropdownMenu, { open: dropdownOpen, onOpenChange: setDropdownOpen, children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "flex-1 h-14 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5",
              children: [
                /* @__PURE__ */ jsx(MoreVertical, { className: "h-5 w-5 mr-3" }),
                "Más Opciones"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", align: "start", children: [
            /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Acciones del Ticket" }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            onViewHistory && /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleViewHistory, children: [
              /* @__PURE__ */ jsx(History, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Ver Historial" })
            ] }),
            onAddNote && /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleAddNote, children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Agregar Nota" })
            ] }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            onReassign && /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleReassign, children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Reasignar Área" })
            ] }),
            onPrintTicket && /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handlePrintTicket, children: [
              /* @__PURE__ */ jsx(FileText, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Imprimir Ticket" })
            ] }),
            onDerive && /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleDerive, children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Derivar a Otra Área" })
            ] }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs(
              DropdownMenuItem,
              {
                onClick: handleRelease,
                className: "text-red-600 focus:text-red-600",
                children: [
                  /* @__PURE__ */ jsx(UserX, { className: "mr-2 h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Liberar Ticket" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onClose,
            className: "flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 mr-3" }),
              "Cerrar Ticket"
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
