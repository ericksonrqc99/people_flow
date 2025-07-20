import { jsx, Fragment, jsxs } from "react/jsx-runtime";
function SecondScreen({ setScreen }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { className: "flex flex-col justify-center items-center w-full h-full gap-y-10", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setScreen("gerencias"),
        className: "h-14 bg-custom-900 p-2 rounded-md hover:bg-custom-700 cursor-pointer text-custom-50 shadow-lg shadow-custom-800",
        children: /* @__PURE__ */ jsx("h2", { className: "text-4xl", children: "Gerencias" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setScreen("subgerencias"),
        className: "h-14 bg-custom-900 p-2 rounded-md hover:bg-custom-700 cursor-pointer text-custom-50 shadow-lg shadow-custom-800",
        children: /* @__PURE__ */ jsx("h2", { className: "text-4xl", children: "Sub Gerencias" })
      }
    )
  ] }) });
}
export {
  SecondScreen as default
};
