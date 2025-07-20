import { jsxs, jsx } from "react/jsx-runtime";
import BoxContent from "./box-content-epwYYoJF.js";
import "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function AreasScreen({
  areas,
  setScreen,
  screen,
  title,
  setSelectedAreas,
  selectedAreas
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-6 items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center text-4xl font-semibold text-custom-foreground", children: title }),
    /* @__PURE__ */ jsx("section", { className: "flex flex-col justify-between items-center gap-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-6 gap-2 w-10/12", children: [
      areas.map((area) => /* @__PURE__ */ jsx(
        BoxContent,
        {
          area,
          className: "text-xl text-custom-900 ",
          screen,
          setScreen,
          setSelectedAreas,
          selectedAreas
        },
        area.id
      )),
      screen === "gerencias" && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setScreen("oficinas"),
          className: "text-2xl font-semibold p-4 rounded-md cursor-pointer text-custom-button-text bg-custom-foreground ",
          children: "Ver Oficinas"
        }
      )
    ] }) })
  ] });
}
export {
  AreasScreen as default
};
