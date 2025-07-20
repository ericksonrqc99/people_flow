import axios from "axios";
const searchCitizenByDni = async (dni) => {
  const response = await axios.get(
    route("citizen.search-citizen-by-dni", {
      dni
    }),
    {
      withCredentials: true
    }
  );
  return response.data;
};
export {
  searchCitizenByDni as s
};
