import { jsxs, jsx } from "react/jsx-runtime";
import SquaredContent from "./squared-content-W42_vAKK.js";
import "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function StepThreeContent({
  areas,
  data,
  handleOnClick
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
    /* @__PURE__ */ jsx(
      SquaredContent,
      {
        area: data.area,
        className: "bg-amber-300 text-4xl"
      }
    ),
    !data.area.children && /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "py-2 px-4 bg-blue-300 text-center text-2xl font-bold", children: "SUB-GERENCIAS" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4", children: areas.map((area) => {
      if (area.parent_id === data.area.id) {
        return /* @__PURE__ */ jsx(
          SquaredContent,
          {
            area,
            handleOnClick,
            className: "bg-blue-300"
          }
        );
      }
    }) })
  ] });
}
export {
  StepThreeContent as default
};
