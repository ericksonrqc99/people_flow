import { jsx } from "react/jsx-runtime";
function GuestLayout({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: `bg-stone-100 h-screen w-screen ${className}`,
      ...props,
      children
    }
  );
}
export {
  GuestLayout as G
};
