import { CitizenT } from '@/types/general';
import axios from 'axios';

export const searchCitizenByDni = async (
    dni: string
): Promise<CitizenT> => {
    const response = await axios.get(
        route('citizen.search-citizen-by-dni', {
            dni,
        }),
        {
            withCredentials: true,
        }
    );
    return response.data;
};

