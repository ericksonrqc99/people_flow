import { jsx } from "react/jsx-runtime";
import { c as capitalizeFirstLetter } from "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function SquaredContent({
  area,
  handleOnClick,
  className
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: () => {
        if (handleOnClick) {
          handleOnClick(area);
        }
      },
      className: `rounded font-mono font-semibold cursor-pointer  p-2 flex justify-center items-center min-h-32 text-center text-2xl ${className}`,
      children: capitalizeFirstLetter(area.name)
    }
  );
}
export {
  SquaredContent as default
};
