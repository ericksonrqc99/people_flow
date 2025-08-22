import { jsxs, jsx } from "react/jsx-runtime";
import { T as Tabs } from "./tabs-CsS9G-dH.js";
import first from "./tabs-list-rbzJlSi_.js";
import TabContent from "./tab-content-C5_INsGi.js";
import "@radix-ui/react-tabs";
import "./utils-BMo_LHkK.js";
import "clsx";
import "tailwind-merge";
import "./badge-44jshGyU.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./card-Cm8ppzCC.js";
import "lucide-react";
import "./button-BmnVj2kL.js";
function CategoryTabs({
  activeTab,
  setActiveTab,
  ticketsData,
  getFilteredTickets,
  openTakeModal,
  openViewModal
}) {
  return /* @__PURE__ */ jsxs(
    Tabs,
    {
      value: activeTab,
      onValueChange: setActiveTab,
      className: "space-y-4",
      children: [
        /* @__PURE__ */ jsx(first, { ticketsData }),
        /* @__PURE__ */ jsx(
          TabContent,
          {
            getFilteredTickets,
            openTakeModal,
            openViewModal,
            tabContentValue: "todos"
          }
        ),
        /* @__PURE__ */ jsx(
          TabContent,
          {
            getFilteredTickets,
            openTakeModal,
            openViewModal,
            tabContentValue: "en espera"
          }
        ),
        /* @__PURE__ */ jsx(
          TabContent,
          {
            getFilteredTickets,
            openTakeModal,
            openViewModal,
            tabContentValue: "atendiendo"
          }
        ),
        /* @__PURE__ */ jsx(
          TabContent,
          {
            getFilteredTickets,
            openTakeModal,
            openViewModal,
            tabContentValue: "cerrado"
          }
        ),
        /* @__PURE__ */ jsx(
          TabContent,
          {
            getFilteredTickets,
            openTakeModal,
            openViewModal,
            tabContentValue: "cancelado"
          }
        )
      ]
    }
  );
}
export {
  CategoryTabs as default
};
