import { jsx, jsxs } from "react/jsx-runtime";
import { G as GuestLayout } from "./guest-layout-t0v6R3w2.js";
import FirstScreen from "./first-screen-D1mKpitX.js";
import { MoveLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import AreasScreen from "./areas-screen-Cx1uaWdY.js";
import ConfirmScreen from "./confirm-screen-KFWdbNrr.js";
import "./citizen-ujNgKD5J.js";
import "axios";
import "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
import "./box-content-epwYYoJF.js";
const initArea = {
  id: "",
  name: "",
  description: "",
  short_name: "",
  parent_id: "",
  children: [],
  type_id: 0,
  is_active: 1
};
const initData = {
  citizen: {
    ok: false,
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombreCompleto: "",
    numeroDocumento: "",
    digitoVerificador: "",
    tipoDocumento: ""
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
      case "confirm":
        post(route("ticket-generator.store"));
        setScreen("search-citizen");
        setData(initData);
        setSelectedAreas(initSelectedAreas);
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
    screen !== "search-citizen" ? /* @__PURE__ */ jsx("div", { className: "flex text-cust h-1/15  justify-between items-center", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-1/15  flex items-center",
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
