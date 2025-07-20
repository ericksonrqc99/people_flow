import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.toLowerCase().split(" ").map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
}
function formatterNameCitizen(citizen) {
  return capitalizeFirstLetter(
    `${citizen.nombres} ${citizen.apellidoPaterno} ${citizen.apellidoMaterno}`
  );
}
export {
  cn as a,
  capitalizeFirstLetter as c,
  formatterNameCitizen as f
};
