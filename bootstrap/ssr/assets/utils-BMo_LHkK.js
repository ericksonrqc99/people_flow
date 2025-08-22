import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.toLowerCase().split(" ").map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
}
function capitalizeFirstLetterOnly(sentence) {
  if (!sentence) return "";
  const lower = sentence.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
function formatterNameCitizen(citizen) {
  return capitalizeFirstLetter(
    `${citizen.names} ${citizen.first_surname} ${citizen.second_surname}`
  );
}
export {
  capitalizeFirstLetter as a,
  cn as b,
  capitalizeFirstLetterOnly as c,
  formatterNameCitizen as f
};
