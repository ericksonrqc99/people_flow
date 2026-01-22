import { TicketGeneratorFormDataT } from '../types';
import { searchCitizenByDni } from '@/services/citizen';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AreaT } from '@/types/general';

type props = {
    setData: (value: TicketGeneratorFormDataT) => void;
    data: TicketGeneratorFormDataT;
    quickAccessAreas: AreaT[];
    onQuickCreate: (area: AreaT) => void;
};

export default function FirstScreen({ setData, data, quickAccessAreas, onQuickCreate }: props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [isQuickAccessOpen, setIsQuickAccessOpen] = useState(false);
    const isInactiveCitizen = error.toLowerCase().includes('desactivado');

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
                setData({
                    ...data,
                    citizen: {
                        ...data.citizen,
                        ok: false,
                        document_number: value,
                    },
                });
                setError(response.message);
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full gap-4 sm:gap-6">
            <div className="w-full max-w-2xl px-4">
                {/* Logo section */}
                <div className="flex justify-center mb-4 sm:mb-6">
                    <img
                        src="/assets/images/escudo-muni.png"
                        className="h-20 sm:h-24 md:h-32 w-20 sm:w-24 md:w-32 object-contain"
                        alt="Escudo de la municipalidad distrital de San Miguel"
                    />
                </div>

                {/* Main Card */}
                <div className="bg-white border border-gray-300 p-4 sm:p-6 md:p-8">
                    <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 sm:mb-6">
                        Generar Ticket
                    </h1>

                    <div className="mb-4 sm:mb-6">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
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
                            className="w-full text-center text-lg sm:text-2xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:border-gray-700 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Quick Access */}
                    {data.citizen.ok && quickAccessAreas.length > 0 && (
                        <div className="mb-4 sm:mb-6 bg-gray-50 border border-gray-300 p-3 sm:p-4">
                            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Accesos rápidos
                            </p>
                            <button
                                onClick={() => setIsQuickAccessOpen(true)}
                                className="inline-flex items-center px-6 py-3 bg-yellow-700 text-white text-md font-bold border border-yellow-800 hover:bg-yellow-800 transition-colors"
                            >
                                GAT
                            </button>
                        </div>
                    )}

                    {/* Status messages */}
                    <div className="min-h-20 sm:min-h-24 flex items-center justify-center">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="animate-spin">
                                    <div className="h-6 sm:h-8 w-6 sm:w-8 border-4 border-gray-700 border-t-transparent"></div>
                                </div>
                                <span className="text-sm sm:text-base text-gray-600">Buscando DNI...</span>
                            </div>
                        ) : data.citizen.ok ? (
                            <div className="text-center p-3 sm:p-4 bg-gray-50 border border-gray-300 w-full">
                                <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Ciudadano encontrado:</p>
                                <p className="text-sm sm:text-lg font-semibold text-gray-900">
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
                                <div className={`text-center p-3 sm:p-4 w-full ${
                                    isInactiveCitizen
                                        ? 'bg-red-50 border border-red-500'
                                        : 'bg-gray-50 border border-red-400'
                                }`}>
                                    <p className="text-sm sm:text-base text-red-700 font-semibold">
                                        ⚠ {error}
                                    </p>
                                    {isInactiveCitizen && (
                                        <p className="text-xs sm:text-sm text-red-600 mt-2">
                                            No se puede generar ticket para este ciudadano.
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={isQuickAccessOpen} onOpenChange={setIsQuickAccessOpen}>
                <DialogContent className="max-w-md border border-gray-300 rounded-none shadow-none">
                    <DialogHeader>
                        <DialogTitle>Accesos rápidos - GAT</DialogTitle>
                        
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-2 py-2">
                        {quickAccessAreas.map((area) => (
                            <button
                                key={area.id}
                                onClick={() => {
                                    onQuickCreate(area);
                                    setIsQuickAccessOpen(false);
                                }}
                                className="w-full px-6 py-3 text-md font-bold border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
                            >
                                {area.name}
                            </button>
                        ))}
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setIsQuickAccessOpen(false)}
                            className="px-3 py-2 text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        >
                            Cerrar
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
