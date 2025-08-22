import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { B as Button } from "./button-BmnVj2kL.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { b as cn } from "./utils-BMo_LHkK.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function TicketModals({
  // Take Modal
  showTakeModal,
  setShowTakeModal,
  selectedTicket,
  onTakeTicket,
  // View Modal
  showViewModal,
  setShowViewModal,
  // Close Modal
  showCloseModal,
  setShowCloseModal,
  closeForm,
  setCloseForm,
  onCloseTicket,
  // Release Modal
  showReleaseModal,
  setShowReleaseModal,
  onReleaseTicket,
  // Edit Modal
  showEditModal,
  setShowEditModal,
  editForm,
  setEditForm,
  focusedTicket,
  setFocusedTicket,
  // Delete Modal
  showDeleteModal,
  setShowDeleteModal
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Dialog, { open: showTakeModal, onOpenChange: setShowTakeModal, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Confirmar acción" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "¿Estás seguro de que quieres tomar este ticket?" })
      ] }),
      selectedTicket && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Código:" }),
          " ",
          selectedTicket.visible_code
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Ciudadano:" }),
          " ",
          [
            (_a = selectedTicket.citizen) == null ? void 0 : _a.names,
            (_b = selectedTicket.citizen) == null ? void 0 : _b.first_surname,
            (_c = selectedTicket.citizen) == null ? void 0 : _c.second_surname
          ].filter(Boolean).join(" ")
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "DNI:" }),
          " ",
          (_d = selectedTicket.citizen) == null ? void 0 : _d.document_number
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowTakeModal(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { onClick: onTakeTicket, children: "Confirmar" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showViewModal, onOpenChange: setShowViewModal, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Detalles del Ticket" }) }),
      selectedTicket && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Código" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: selectedTicket.visible_code })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Estado" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: (_e = selectedTicket.status) == null ? void 0 : _e.type })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Ciudadano" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: [
              (_f = selectedTicket.citizen) == null ? void 0 : _f.names,
              (_g = selectedTicket.citizen) == null ? void 0 : _g.first_surname,
              (_h = selectedTicket.citizen) == null ? void 0 : _h.second_surname
            ].filter(Boolean).join(" ") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "DNI" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: (_i = selectedTicket.citizen) == null ? void 0 : _i.document_number })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Área" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: (_j = selectedTicket.area) == null ? void 0 : _j.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Fecha de creación" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: new Date(selectedTicket.created_at).toLocaleString() })
          ] })
        ] }),
        selectedTicket.observations && /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-gray-50 rounded-lg border", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-base font-semibold text-gray-900 mb-3 block", children: "Observaciones" }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-md border border-gray-200 min-h-[80px] max-h-[200px] overflow-y-auto", children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-700 whitespace-pre-wrap break-words", children: selectedTicket.observations }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: () => setShowViewModal(false), children: "Cerrar" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showCloseModal, onOpenChange: setShowCloseModal, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Cerrar Ticket" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Selecciona el estado final del ticket y añade observaciones." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Estado final" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: "cerrado",
                  name: "estado",
                  value: "cerrado",
                  checked: closeForm.estado === "cerrado",
                  onChange: (e) => setCloseForm({ ...closeForm, estado: e.target.value })
                }
              ),
              /* @__PURE__ */ jsx(Label, { htmlFor: "cerrado", children: "Cerrado (Completado)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: "cancelado",
                  name: "estado",
                  value: "cancelado",
                  checked: closeForm.estado === "cancelado",
                  onChange: (e) => setCloseForm({ ...closeForm, estado: e.target.value })
                }
              ),
              /* @__PURE__ */ jsx(Label, { htmlFor: "cancelado", children: "Cancelado" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "comentario", children: "Observaciones finales" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "comentario",
              value: closeForm.comentario,
              onChange: (e) => setCloseForm({ ...closeForm, comentario: e.target.value }),
              placeholder: "Escribe observaciones sobre la atención...",
              className: "mt-1 w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowCloseModal(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: onCloseTicket,
            disabled: !closeForm.estado,
            children: "Cerrar Ticket"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showReleaseModal, onOpenChange: setShowReleaseModal, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Liberar Ticket" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "¿Estás seguro de que quieres liberar este ticket? Volverá al estado pendiente." })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowReleaseModal(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: onReleaseTicket, children: "Liberar" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showEditModal, onOpenChange: setShowEditModal, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Editar Ticket" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Funcionalidad de edición en desarrollo." })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: () => setShowEditModal(false), children: "Cerrar" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showDeleteModal, onOpenChange: setShowDeleteModal, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Eliminar Ticket" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Funcionalidad de eliminación en desarrollo." })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: () => setShowDeleteModal(false), children: "Cerrar" }) })
    ] }) })
  ] });
}
export {
  TicketModals as default
};
