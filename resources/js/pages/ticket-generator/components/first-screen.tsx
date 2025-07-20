import { TicketGeneratorFormDataT } from '../types';
import { searchCitizenByDni } from '@/services/citizen';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useState } from 'react';

type props = {
    setData: (value: TicketGeneratorFormDataT) => void;
    data: TicketGeneratorFormDataT;
};

export default function FirstScreen({ setData, data }: props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const handleOnChangeInput = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value;

        if (isNaN(Number(value))) return;

        if (value.length <= 8 && value.length >= 0) {
            setData({
                ...data,
                citizen: { ...data.citizen, dni: value },
            });
        }
        
        if (value.length === 8 && value!== '00000000') {
            try {
                setError('');
                setIsLoading(true);
                const response = await searchCitizenByDni(value);
                setIsLoading(false);
                if (response.ok) {
                    setData({ ...data, citizen: { ...response } });
                    return;
                }
                setError(response.message);
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="h-full">
            <header className="flex justify-center h-1/2 ">
                <img
                    src="assets/images/escudo-muni.png"
                    className="object-contain w-full h-full"
                    alt="Escudo de la municipalidad distrital de San Miguel"
                />
            </header>
            <section className="flex justify-center h-1/2 ">
                <div className="w-1/2 flex flex-col gap-y-6 justify-center">
                    <h1 className="text-center font-semibold text-4xl text-custom-foreground">
                        Genera tu ticket
                    </h1>
                    <input
                        onChange={(e) => {
                            handleOnChangeInput(e);
                        }}
                        value={data.citizen.dni}
                        autoFocus
                        type="text"
                        placeholder="Ingresa tu DNI"
                        className="shadow-inner  text-center text-4xl h-14 border-1 border-custom-input-border rounded-md"
                    ></input>
                    <div className="h-14">
                        {isLoading ? (
                            <div className="text-center">
                                <span className="loader"></span>
                            </div>
                        ) : data.citizen.ok ? (
                            <p className="text-3xl text-center font-semibold text-custom-900">
                                {capitalizeFirstLetter(data.citizen.names)}{' '}
                                {capitalizeFirstLetter(
                                    data.citizen.first_surname,
                                )}{' '}
                                {capitalizeFirstLetter(
                                    data.citizen.second_surname,
                                )}
                            </p>
                        ) : (
                            error && (
                                <p className="text-xl text-center text-red-500 font-semibold">
                                    {error}
                                </p>
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
