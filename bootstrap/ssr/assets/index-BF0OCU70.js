import { jsx, jsxs } from "react/jsx-runtime";
import FirstScreen from "./first-screen-keeifiLU.js";
import AreasScreen from "./areas-screen-DTx7e6vA.js";
import ConfirmScreen from "./confirm-screen-DO2W1bSe.js";
import { MoveLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import "axios";
import "./utils-CPq9aNLN.js";
import "clsx";
import "tailwind-merge";
import "./box-content-Cnn9_Run.js";
function GuestLayout({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: `bg-stone-100 h-screen w-screen ${className}`,
      ...props,
      children
    }
  );
}
const initArea = {
  id: "",
  name: "",
  description: "",
  short_name: "",
  parent_id: "",
  children: [],
  type_id: 0,
  code: "",
  is_active: 1
};
const initData = {
  citizen: {
    ok: false,
    names: "",
    first_surname: "",
    second_surname: "",
    document_number: "",
    address: "",
    departamet: "",
    district: "",
    province: "",
    message: ""
  },
  area: initArea
};
const initSelectedAreas = {
  gerencia: initArea,
  oficina: initArea,
  subgerencia: initArea,
  unidad: initArea
};
function TicketGenerator({ areas }) {
  const [screen, setScreen] = useState("search-citizen");
  const { data, setData, post } = useForm(initData);
  const [ticketData, setTicketData] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState(initSelectedAreas);
  const getAreasByType = (type, parentId) => areas.filter(
    (area) => area.type_id === type && (parentId ? area.parent_id === parentId : true)
  );
  const gerencias = useMemo(() => getAreasByType(1), []);
  const subGerencias = useMemo(
    () => getAreasByType(2, selectedAreas.gerencia.id),
    [selectedAreas.gerencia]
  );
  const unidades = useMemo(
    () => getAreasByType(3, selectedAreas.subgerencia.id),
    [selectedAreas.subgerencia]
  );
  const oficinas = useMemo(() => getAreasByType(4), []);
  function handleClickBackArrow() {
    switch (screen) {
      case "gerencias":
        setScreen("search-citizen");
        setSelectedAreas({ ...selectedAreas, gerencia: initArea });
        break;
      case "subgerencias":
        setScreen("gerencias");
        setSelectedAreas({ ...selectedAreas, subgerencia: initArea });
        break;
      case "unidades":
        setScreen("subgerencias");
        setSelectedAreas({ ...selectedAreas, unidad: initArea });
        break;
      case "oficinas":
        setScreen("gerencias");
        setSelectedAreas({ ...selectedAreas, oficina: initArea });
        break;
      case "confirm":
        setScreen("gerencias");
        setSelectedAreas({ ...selectedAreas, oficina: initArea });
        break;
    }
  }
  const handleOnClickButton = () => {
    switch (screen) {
      case "search-citizen":
        setScreen("gerencias");
        break;
      case "gerencias":
        setData({ ...data, area: selectedAreas.gerencia });
        setScreen("confirm");
        break;
      case "subgerencias":
        setData({ ...data, area: selectedAreas.subgerencia });
        setScreen("confirm");
        break;
      case "unidades":
        setData({ ...data, area: selectedAreas.unidad });
        setScreen("confirm");
        break;
      case "oficinas":
        setData({ ...data, area: selectedAreas.oficina });
        setScreen("confirm");
        break;
      case "confirm":
        console.log({ data });
        post(route("ticket-generator.store"), {
          onSuccess: (data2) => {
            setTicketData(data2.props.ticketGenerated);
          }
        });
        setScreen("search-citizen");
        setData(initData);
        setSelectedAreas(initSelectedAreas);
        break;
    }
  };
  const handleDisabledButton = () => {
    switch (screen) {
      case "search-citizen":
        return !data.citizen.ok;
      case "gerencias":
        return selectedAreas.gerencia.id === "";
      case "oficinas":
        return selectedAreas.oficina.id === "";
      case "subgerencias":
        return selectedAreas.subgerencia.id === "";
      case "unidades":
        return selectedAreas.unidad.id === "";
    }
  };
  return /* @__PURE__ */ jsx(GuestLayout, { className: "font-inter", children: /* @__PURE__ */ jsxs("div", { className: "bg-custom-background w-full h-full p-4 select-none", children: [
    screen !== "search-citizen" ? /* @__PURE__ */ jsx("div", { className: "flex text-cust h-1/15 justify-between items-center", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: " h-full flex items-center bg-custom-foreground text-custom-button-text rounded-md",
        onClick: handleClickBackArrow,
        children: /* @__PURE__ */ jsx(
          MoveLeft,
          {
            size: 70,
            className: "cursor-pointer p-2"
          }
        )
      }
    ) }) : /* @__PURE__ */ jsx("div", { className: "h-1/15" }),
    /* @__PURE__ */ jsxs("div", { className: "h-12/15 w-full", children: [
      screen === "search-citizen" && /* @__PURE__ */ jsx(FirstScreen, { data, setData }),
      screen === "gerencias" && /* @__PURE__ */ jsx(
        AreasScreen,
        {
          areas: gerencias,
          setScreen,
          screen,
          setSelectedAreas,
          selectedAreas,
          title: "Gerencias"
        }
      ),
      screen === "subgerencias" && /* @__PURE__ */ jsx(
        AreasScreen,
        {
          areas: subGerencias,
          setScreen,
          screen,
          setSelectedAreas,
          selectedAreas,
          title: "Sub Gerencias"
        }
      ),
      screen === "unidades" && /* @__PURE__ */ jsx(
        AreasScreen,
        {
          areas: unidades,
          setScreen,
          screen,
          setSelectedAreas,
          selectedAreas,
          title: "Unidades"
        }
      ),
      screen === "oficinas" && /* @__PURE__ */ jsx(
        AreasScreen,
        {
          areas: oficinas,
          setScreen,
          screen,
          setSelectedAreas,
          selectedAreas,
          title: "Oficinas"
        }
      ),
      screen === "confirm" && /* @__PURE__ */ jsx(ConfirmScreen, { data })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-2/15 flex justify-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        disabled: handleDisabledButton(),
        onClick: handleOnClickButton,
        className: "bg-custom-foreground  rounded-md text-custom-button-text font-bold h-14 cursor-pointer text-2xl shadow-xl shadow-custom-700 w-1/2",
        children: screen === "search-citizen" ? "Continuar" : screen === "confirm" ? "Generar Ticket" : "Seleccionar"
      }
    ) })
  ] }) });
}
export {
  TicketGenerator as default
};
