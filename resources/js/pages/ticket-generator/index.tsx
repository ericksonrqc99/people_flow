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

export type ScreenT =
    | 'search-citizen'
    | 'gerencias'
    | 'subgerencias'
    | 'oficinas'
    | 'unidades'
    | 'confirm';

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

    const gerencias = useMemo(() => getAreasByType(1), []);
    const subGerencias = useMemo(
        () => getAreasByType(2, selectedAreas.gerencia.id),
        [selectedAreas.gerencia],
    );
    const unidades = useMemo(
        () => getAreasByType(3, selectedAreas.subgerencia.id),
        [selectedAreas.subgerencia],
    );
    const oficinas = useMemo(() => getAreasByType(4), []);

    function handleClickBackArrow(): void {
        switch (screen) {
            case 'gerencias':
                setScreen('search-citizen');
                setSelectedAreas({ ...selectedAreas, gerencia: initArea });
                break;
            case 'subgerencias':
                setScreen('gerencias');
                setSelectedAreas({ ...selectedAreas, subgerencia: initArea });
                break;
            case 'unidades':
                setScreen('subgerencias');
                setSelectedAreas({ ...selectedAreas, unidad: initArea });
                break;
            case 'oficinas':
                setScreen('gerencias');
                setSelectedAreas({ ...selectedAreas, oficina: initArea });
                break;
            case 'confirm':
                setScreen('gerencias');
                setSelectedAreas({ ...selectedAreas, oficina: initArea });
                break;
            default:
                break;
        }
    }

    const handleOnClickButton = (): void => {
        switch (screen) {
            case 'search-citizen':
                setScreen('gerencias');
                break;
            case 'gerencias':
                setData({ ...data, area: selectedAreas.gerencia });
                setScreen('confirm');
                break;
            case 'subgerencias':
                setData({ ...data, area: selectedAreas.subgerencia });
                setScreen('confirm');
                break;
            case 'unidades':
                setData({ ...data, area: selectedAreas.unidad });
                setScreen('confirm');
                break;
            case 'oficinas':
                setData({ ...data, area: selectedAreas.oficina });
                setScreen('confirm');
                break;
            case 'confirm':
                console.log({ data });

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
            case 'gerencias':
                return selectedAreas.gerencia.id === '';
            case 'oficinas':
                return selectedAreas.oficina.id === '';
            case 'subgerencias':
                return selectedAreas.subgerencia.id === '';
            case 'unidades':
                return selectedAreas.unidad.id === '';
        }
    };

    return (
        <GuestLayout className="font-inter">
            <div className="bg-slate-50 w-full h-full p-6 select-none">
                {/* Header AdminLTE style */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/assets/images/escudo-muni.png"
                            alt="Logo"
                            className="h-12 w-12"
                        />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Sistema de Tickets
                        </h2>
                    </div>
                </div>

                {/* back screen button*/}
                {screen !== 'search-citizen' ? (
                    <div className="mb-4 h-auto flex justify-start">
                        <button
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-semibold transition-colors"
                            onClick={handleClickBackArrow}
                        >
                            <MoveLeft size={20} />
                            Atrás
                        </button>
                    </div>
                ) : (
                    <div className="mb-4"></div>
                )}

                {/* render screen */}
                <div className="mb-6">
                    {screen === 'search-citizen' && (
                        <FirstScreen data={data} setData={setData} />
                    )}
                    {screen === 'gerencias' && (
                        <AreasScreen
                            areas={gerencias}
                            setScreen={setScreen}
                            screen={screen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                            title="Gerencias"
                        />
                    )}
                    {screen === 'subgerencias' && (
                        <AreasScreen
                            areas={subGerencias}
                            setScreen={setScreen}
                            screen={screen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                            title="Sub Gerencias"
                        />
                    )}
                    {screen === 'unidades' && (
                        <AreasScreen
                            areas={unidades}
                            setScreen={setScreen}
                            screen={screen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                            title="Unidades"
                        />
                    )}
                    {screen === 'oficinas' && (
                        <AreasScreen
                            areas={oficinas}
                            setScreen={setScreen}
                            screen={screen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                            title="Oficinas"
                        />
                    )}
                    {screen === 'confirm' && <ConfirmScreen data={data} />}
                </div>
                {/* render screen */}

                <div className="flex justify-center gap-4">
                    <button
                        disabled={handleDisabledButton()}
                        onClick={handleOnClickButton}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg text-white font-bold h-12 cursor-pointer text-lg shadow-md transition-colors px-8"
                    >
                        {screen === 'search-citizen'
                            ? 'Continuar'
                            : screen === 'confirm'
                              ? 'Generar Ticket'
                              : 'Seleccionar'}
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}
