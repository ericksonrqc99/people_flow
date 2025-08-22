import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cm8ppzCC.js";
import { B as Badge } from "./badge-44jshGyU.js";
import { B as Button } from "./button-BmnVj2kL.js";
import { AlertTriangle, X, LogOut, User, Eye, Building2, Clock } from "lucide-react";
import { useState } from "react";
import "./utils-BMo_LHkK.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
function LogoutConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  userName
}) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md mx-4 shadow-2xl border-2", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-red-100 rounded-full", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-red-600" }) }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-bold text-gray-900", children: "Confirmar cierre de sesión" })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onCancel,
          className: "h-8 w-8 p-0 hover:bg-gray-100",
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: userName ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "¿Estás seguro de que deseas cerrar la sesión, ",
          /* @__PURE__ */ jsx("strong", { children: userName }),
          "?"
        ] }) : /* @__PURE__ */ jsx(Fragment, { children: "¿Estás seguro de que deseas cerrar la sesión?" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Tendrás que volver a iniciar sesión para acceder al sistema de tickets." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-3 pt-4", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: onCancel,
            className: "flex-1 hover:bg-gray-50",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onConfirm,
            className: "flex-1 bg-red-600 hover:bg-red-700 text-white",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
              "Cerrar sesión"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function TicketPageHeader({ userName, areaName }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const performLogout = () => {
    var _a;
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, "", window.location.href);
    });
    const csrfToken = (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content");
    if (csrfToken) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/logout";
      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "_token";
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
      document.body.appendChild(form);
      form.submit();
    } else {
      window.location.replace("/admin/login");
    }
  };
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    performLogout();
  };
  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };
  const currentTime = (/* @__PURE__ */ new Date()).toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  if (!isVisible) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-gray-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: userName }),
          areaName && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "•" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: areaName })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setIsVisible(true),
              className: "h-6 px-2",
              children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3 mr-1" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Mostrar" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleLogout,
              className: "h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50",
              title: "Cerrar sesión",
              children: /* @__PURE__ */ jsx(LogOut, { className: "w-3 h-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        LogoutConfirmationModal,
        {
          isOpen: showLogoutModal,
          onConfirm: handleLogoutConfirm,
          onCancel: handleLogoutCancel,
          userName
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setIsVisible(false),
          className: "absolute top-2 right-2 h-6 w-6 p-0 hover:bg-green-100",
          title: "Ocultar header",
          children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-green-100 rounded-full", children: /* @__PURE__ */ jsx(User, { className: "w-6 h-6 text-green-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [
                "¡Hola, ",
                userName,
                "!"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Bienvenido a tu área de trabajo" })
            ] })
          ] }),
          areaName && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-green-600" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-green-100 text-green-800", children: areaName })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: currentTime })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Sistema de gestión de tickets" }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleLogout,
              className: "bg-white/70 hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 transition-all duration-200",
              children: [
                /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                "Cerrar sesión"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      LogoutConfirmationModal,
      {
        isOpen: showLogoutModal,
        onConfirm: handleLogoutConfirm,
        onCancel: handleLogoutCancel,
        userName
      }
    )
  ] });
}
export {
  TicketPageHeader as default
};
