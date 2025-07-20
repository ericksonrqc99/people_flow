import { jsx, jsxs } from "react/jsx-runtime";
import { a as cn } from "./utils-MEMCRJMC.js";
import "clsx";
import "tailwind-merge";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function StepOneContent({
  handleOnChange,
  citizenFound,
  error,
  loadingFetch,
  data
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4 w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col gap-y-1 justify-center items-center", children: /* @__PURE__ */ jsx(
      Input,
      {
        id: "dni",
        type: "number",
        onChange: (e) => handleOnChange(e),
        value: data.citizen.numeroDocumento,
        placeholder: "Ingresa tu DNI",
        className: "text-center !text-4xl font-mono h-14 border-gray-400 border-2 w-2/4",
        min: 0,
        max: 8,
        autoFocus: true
      }
    ) }),
    citizenFound !== null && /* @__PURE__ */ jsxs("p", { className: "text-center text-3xl font-semibold", children: [
      citizenFound.nombres,
      " ",
      citizenFound.apellidoPaterno,
      " ",
      citizenFound.apellidoMaterno
    ] }),
    error !== null && /* @__PURE__ */ jsx("span", { className: "text-center text-red-400", children: error.message }),
    loadingFetch && /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "loaderCircle" }) })
  ] });
}
export {
  StepOneContent as default
};
