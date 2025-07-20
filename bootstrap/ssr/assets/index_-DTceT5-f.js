import { jsx, jsxs } from "react/jsx-runtime";
import { G as GuestLayout } from "./guest-layout-t0v6R3w2.js";
import { useForm } from "@inertiajs/react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { a as cn, c as capitalizeFirstLetter } from "./utils-MEMCRJMC.js";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { useState } from "react";
import { AxiosError } from "axios";
import { s as searchCitizenByDni } from "./citizen-ujNgKD5J.js";
import StepTwoContent from "./step-two-content-Yaw3pOF4.js";
import StepThreeContent from "./step-three-content-DGCSAIm9.js";
import StepOneContent from "./step-one-content-6gWcwmh7.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import "clsx";
import "tailwind-merge";
import "./squared-content-W42_vAKK.js";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const initData = {
  citizen: {
    ok: false,
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombreCompleto: "",
    numeroDocumento: "",
    digitoVerificador: "",
    tipoDocumento: ""
  },
  area: {
    id: "",
    name: "",
    description: "",
    short_name: "",
    parent_id: "",
    children: [],
    is_active: 1
  }
};
function TicketGenerator({ areas }) {
  const { data, setData } = useForm(initData);
  const [step, setStep] = useState(1);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [citizenFound, setCitizenFound] = useState(
    null
  );
  const [error, setError] = useState(null);
  const handleOnChange = async (e) => {
    var _a;
    const value = e.target.value;
    setData({
      ...data,
      citizen: { ...data.citizen, numeroDocumento: value }
    });
    if (value.length === 8) {
      setError(null);
      try {
        setLoadingFetch(true);
        let response = await searchCitizenByDni(value);
        setData({ ...data, citizen: response });
        setCitizenFound(response);
        setLoadingFetch(false);
      } catch (error2) {
        if (error2 instanceof AxiosError) {
          setError({
            message: (_a = error2.response) == null ? void 0 : _a.data.message
          });
          setCitizenFound(null);
        }
        setLoadingFetch(false);
      }
    }
  };
  const handleOnClick = (area) => {
    setData("area", area);
    changeStep("next");
  };
  const changeStep = (value) => {
    if (value === "previous") {
      if (step > 1) {
        setStep(step - 1);
      }
    }
    if (value === "next") {
      if (step < 3) {
        console.log({ stepIndex: step });
        setStep(step + 1);
      }
    }
  };
  return /* @__PURE__ */ jsx(GuestLayout, { children: /* @__PURE__ */ jsx("div", { className: "p-8 flex items-center justify-center flex-col h-full w-full font-mono border", children: /* @__PURE__ */ jsxs(Card, { className: "shadow-2xs p-4 max-w-7xl min-w-11/12 h-fit bg-transparent border-0", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center border-b pb-6", children: [
      step > 1 && /* @__PURE__ */ jsx(
        Button,
        {
          className: "w-1/12 cursor-pointer text-xl",
          onClick: () => {
            changeStep("previous");
          },
          children: "Atrás"
        }
      ),
      /* @__PURE__ */ jsxs(CardTitle, { className: "text-2xl font-semibold text-gray-900 font-mono", children: [
        step === 1 && /* @__PURE__ */ jsx("span", { className: "py-2 px-4 ", children: "BÚSQUEDA POR DNI" }),
        step === 2 && /* @__PURE__ */ jsx("span", { className: "py-2 px-4 rounded bg-amber-300", children: "GERENCIAS" }),
        step === 3 && /* @__PURE__ */ jsxs("span", { className: "py-2 px-4 text-gray-400", children: [
          "Seleccionaste: ",
          data.area.name
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      step === 1 && /* @__PURE__ */ jsx(
        StepOneContent,
        {
          citizenFound,
          data,
          error,
          handleOnChange,
          loadingFetch
        }
      ),
      step === 2 && /* @__PURE__ */ jsx(
        StepTwoContent,
        {
          areas,
          handleOnClick
        }
      ),
      step === 3 && /* @__PURE__ */ jsx(
        StepThreeContent,
        {
          areas,
          data,
          handleOnClick
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    step !== 2 && /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col gap-2 items-center", children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        onClick: () => changeStep("next"),
        disabled: data.citizen.numeroDocumento.length < 8,
        className: "bg-green-600 w-1/2 h-14 text-2xl cursor-pointer p-0",
        children: step === 1 ? "Continuar" : step === 3 && /* @__PURE__ */ jsxs(Dialog, { children: [
          /* @__PURE__ */ jsx(DialogTrigger, { className: "w-full h-full cursor-pointer", children: "Generar Ticket" }),
          /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { className: "text-center", children: "Generación de Ticket" }),
            /* @__PURE__ */ jsxs(DialogDescription, { className: "flex flex-col gap-y-4", children: [
              /* @__PURE__ */ jsx("h2", { children: "Nombre: " }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl text-black", children: capitalizeFirstLetter(
                `${data.citizen.nombres} ${data.citizen.apellidoPaterno} ${data.citizen.apellidoMaterno}`
              ) }),
              /* @__PURE__ */ jsx("h2", { children: "Area: " }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl text-black", children: data.area.name }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Button, { className: "text-center", children: "Generar" }) })
            ] })
          ] }) })
        ] })
      }
    ) }) })
  ] }) }) });
}
export {
  TicketGenerator as default
};
