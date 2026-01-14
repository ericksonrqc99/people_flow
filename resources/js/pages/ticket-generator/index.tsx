import GuestLayout from '@/layouts/guest-layout';
import FirstScreen from './components/first-screen';
import AreasScreen from './components/areas-screen';
import ConfirmScreen from './components/confirm-screen';
import { TicketGeneratorFormDataT } from './types';
import { MoveLeft } from 'lucide-react';
import { AreaT, CitizenT } from '@/types/general';
import { useMemo, useState } from 'react';
import { useForm } from '@inertiajs/react';

type props = {
    areas: AreaT[];
};

export type ScreenT = 'search-citizen' | 'areas' | 'confirm';

const initArea: AreaT = {
    id: '',
    name: '',
    description: '',
    short_name: '',
    parent_id: '',
    children: [],
    type_id: 0,
    code: '',
    is_active: 1,
};

const initData: { citizen: CitizenT; area: AreaT } = {
    citizen: {
        ok: false,
        names: '',
        first_surname: '',
        second_surname: '',
        document_number: '',
        address: '',
        departamet: '',
        district: '',
        province: '',
        message: '',
    },
    area: initArea,
};

const initSelectedAreas = {
    gerencia: initArea,
    oficina: initArea,
    subgerencia: initArea,
    unidad: initArea,
};
export default function TicketGenerator({ areas }: props) {
    // state that controls which screen will be displayed
    const [screen, setScreen] = useState<ScreenT>('search-citizen');
    const { data, setData, post } =
        useForm<Required<TicketGeneratorFormDataT>>(initData);

    const [ticketData, setTicketData] = useState<any>(null);

    const [selectedAreas, setSelectedAreas] = useState<{
        gerencia: AreaT;
        subgerencia: AreaT;
        unidad: AreaT;
        oficina: AreaT;
    }>(initSelectedAreas);

    const getAreasByType = (type: number, parentId?: string) =>
        areas.filter(
            (area) =>
                area.type_id === type &&
                (parentId ? area.parent_id === parentId : true),
        );

    function handleClickBackArrow(): void {
        switch (screen) {
            case 'search-citizen':
                break;
            case 'areas':
                setScreen('search-citizen');
                setSelectedAreas(initSelectedAreas);
                break;
            case 'confirm':
                setScreen('areas');
                break;
            default:
                break;
        }
    }

    const handleOnClickButton = (): void => {
        switch (screen) {
            case 'search-citizen':
                setScreen('areas');
                break;
            case 'areas':
                // La selección de área es manejada por AreasScreen
                break;
            case 'confirm':
                // Obtener el área seleccionada (la más profunda que tenga valor)
                const selectedArea = selectedAreas.oficina.id
                    ? selectedAreas.oficina
                    : selectedAreas.unidad.id
                    ? selectedAreas.unidad
                    : selectedAreas.subgerencia.id
                    ? selectedAreas.subgerencia
                    : selectedAreas.gerencia;
                
                setData({ ...data, area: selectedArea });
                post(route('ticket-generator.store'), {
                    onSuccess: (data) => {
                        setTicketData(data.props.ticketGenerated);
                    },
                });
                setScreen('search-citizen');
                setData(initData);
                setSelectedAreas(initSelectedAreas);
                break;
        }
    };

    const handleDisabledButton = (): boolean | undefined => {
        switch (screen) {
            case 'search-citizen':
                return !data.citizen.ok;
            case 'areas':
                return false; // Los botones están en AreasScreen
            case 'confirm':
                return false;
            default:
                return true;
        }
    };

    const getButtonText = (): string => {
        switch (screen) {
            case 'search-citizen':
                return 'Continuar';
            case 'areas':
                return 'Seleccionar';
            case 'confirm':
                return 'Generar Ticket';
            default:
                return 'Continuar';
        }
    };

    return (
        <GuestLayout className="font-inter">
            <div className="bg-slate-50 w-full h-screen p-3 sm:p-4 md:p-6 select-none flex flex-col">
                {/* Header AdminLTE style - Compacto */}
                <div className="mb-3 sm:mb-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <img
                            src="/assets/images/escudo-muni.png"
                            alt="Logo"
                            className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12"
                        />
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                            Generador de Tickets
                        </h2>
                    </div>
                </div>

                {/* Contenido principal - Sin scroll */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {screen === 'search-citizen' && (
                        <FirstScreen data={data} setData={setData} />
                    )}
                    {screen === 'areas' && (
                        <AreasScreen
                            areas={areas}
                            setScreen={setScreen}
                            screen={screen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                            title="Seleccionar Área"
                            setData={setData}
                            data={data}
                        />
                    )}
                    {screen === 'confirm' && <ConfirmScreen data={data} />}
                </div>

                {/* Botones de acción - Fijos en la parte inferior */}
                {screen !== 'areas' && (
                    <div className="flex justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 flex-shrink-0">
                        {screen !== 'search-citizen' && (
                            <button
                                onClick={handleClickBackArrow}
                                className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-bold h-10 sm:h-12 cursor-pointer text-sm sm:text-base shadow-md transition-colors px-4 sm:px-6"
                            >
                                ← Atrás
                            </button>
                        )}
                        <button
                            disabled={handleDisabledButton()}
                            onClick={handleOnClickButton}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg text-white font-bold h-10 sm:h-12 cursor-pointer text-sm sm:text-base shadow-md transition-colors px-4 sm:px-6 flex-1 sm:flex-initial"
                        >
                            {getButtonText()}
                        </button>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
