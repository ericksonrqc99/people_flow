import { jsx } from "react/jsx-runtime";
function Info({ message }) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen w-full", children: /* @__PURE__ */ jsx("h1", { className: "text-yellow-700 ", children: message }) });
}
export {
  Info as default
};
