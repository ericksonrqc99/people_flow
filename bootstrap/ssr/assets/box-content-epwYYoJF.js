import { jsx } from "react/jsx-runtime";
import { c as capitalizeFirstLetter } from "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function BoxContent({
  area,
  className,
  screen,
  setScreen,
  selectedAreas,
  setSelectedAreas,
  ...props
}) {
  const handleOnClick = () => {
    if (screen === "gerencias") {
      setSelectedAreas({ ...selectedAreas, gerencia: area });
    }
    if (screen === "subgerencias") {
      setSelectedAreas({ ...selectedAreas, subgerencia: area });
    }
    if (screen === "unidades") {
      setSelectedAreas({ ...selectedAreas, unidad: area });
    }
    if (screen === "oficinas") {
      setSelectedAreas({ ...selectedAreas, oficina: area });
    }
  };
  const handleOnDoubleClick = () => {
    if (area.children.length === 0) {
      return;
    }
    if (screen === "gerencias") {
      setScreen("subgerencias");
    }
    if (screen == "subgerencias") {
      setScreen("unidades");
    }
  };
  const setStyles = () => {
    switch (screen) {
      case "gerencias":
        return selectedAreas.gerencia.id === area.id;
      case "subgerencias":
        return selectedAreas.subgerencia.id === area.id;
      case "unidades":
        return selectedAreas.unidad.id === area.id;
      case "oficinas":
        return selectedAreas.oficina.id === area.id;
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: handleOnClick,
      onDoubleClick: handleOnDoubleClick,
      className: `bg-custom-muted  px-2 min-h-40  py-4 flex items-center justify-center rounded-md hover:bg-custom-200 cursor-pointer border-4  border-transparent ${className} shadow-lg ${setStyles() && "border-4 border-dashed !border-black"}`,
      children: /* @__PURE__ */ jsx("h3", { className: "text-center", children: capitalizeFirstLetter(area.short_name) })
    }
  );
}
export {
  BoxContent as default
};
