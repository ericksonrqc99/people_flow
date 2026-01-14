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
                citizen: { ...data.citizen, document_number: value },
            });
        }

        if (value.length === 8 && value !== '00000000') {
            try {
                setError('');
                setIsLoading(true);
                const response = await searchCitizenByDni(value);
                setIsLoading(false);

                console.log({response});
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
        <div className="flex flex-col justify-center items-center min-h-full gap-8">
            <div className="w-full max-w-md">
                {/* Logo section */}
                <div className="flex justify-center mb-8">
                    <img
                        src="/assets/images/escudo-muni.png"
                        className="h-32 w-32 object-contain"
                        alt="Escudo de la municipalidad distrital de San Miguel"
                    />
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-t-blue-600">
                    <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">
                        Generar Ticket
                    </h1>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Número de DNI
                        </label>
                        <input
                            onChange={(e) => {
                                handleOnChangeInput(e);
                            }}
                            value={data.citizen.document_number}
                            autoFocus
                            type="text"
                            placeholder="Ej: 12345678"
                            className="w-full text-center text-2xl px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Status messages */}
                    <div className="h-24 flex items-center justify-center">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="animate-spin">
                                    <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                                </div>
                                <span className="text-gray-600">Buscando DNI...</span>
                            </div>
                        ) : data.citizen.ok ? (
                            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg w-full">
                                <p className="text-sm text-gray-600 mb-2">Ciudadano encontrado:</p>
                                <p className="text-lg font-semibold text-green-700">
                                    {capitalizeFirstLetter(data.citizen.names)}{' '}
                                    {capitalizeFirstLetter(
                                        data.citizen.first_surname,
                                    )}{' '}
                                    {capitalizeFirstLetter(
                                        data.citizen.second_surname,
                                    )}
                                </p>
                            </div>
                        ) : (
                            error && (
                                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg w-full">
                                    <p className="text-red-700 font-semibold">
                                        ⚠ {error}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
