import { jsxs, jsx } from "react/jsx-runtime";
import { T as Tabs } from "./tabs-B4582oMd.js";
import first from "./tabs-list-CuoOUHRg.js";
import TabContent from "./tab-content-Cpm2tEaw.js";
import "@radix-ui/react-tabs";
import "./utils-CPq9aNLN.js";
import "clsx";
import "tailwind-merge";
import "./badge-eMoabTnV.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./card-o23MGwpj.js";
import "lucide-react";
import "./button-DYBWqrh5.js";
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
