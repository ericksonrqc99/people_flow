import { jsx } from "react/jsx-runtime";
import SquaredContent from "./squared-content-W42_vAKK.js";
import "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function StepTwoContent({ areas, handleOnClick }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4 ", children: areas.map((area) => {
    if (area.parent_id === null) {
      return /* @__PURE__ */ jsx(
        SquaredContent,
        {
          area,
          handleOnClick,
          className: "bg-amber-300"
        }
      );
    }
  }) });
}
export {
  StepTwoContent as default
};
