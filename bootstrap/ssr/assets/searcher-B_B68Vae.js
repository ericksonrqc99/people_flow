import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card, a as CardContent } from "./card-o23MGwpj.js";
import { a as cn } from "./utils-CPq9aNLN.js";
import { Search } from "lucide-react";
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
function Searcher({
  searchTerm,
  setSearchTerm
}) {
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-md", children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Buscar por código o solicitante...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        className: "pl-8"
      }
    )
  ] }) }) });
}
export {
  Searcher as default
};
