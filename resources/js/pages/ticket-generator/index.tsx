import GuestLayout from '@/layouts/guest-layout';
import FirstScreen from './components/first-screen';
import AreasScreen from './components/areas-screen';
import ConfirmScreen from './components/confirm-screen';
import { TicketGeneratorFormDataT } from './types';
import { MoveLeft } from 'lucide-react';
import { AreaT, CitizenResponseT, CitizenT } from '@/types/general';
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
        dni: '',
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
                post(route('ticket-generator.store'), {
                    onSuccess: () => {},
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
            <div className="bg-custom-background w-full h-full p-4 select-none">
                {/* back screen button*/}
                {screen !== 'search-citizen' ? (
                    <div className="flex text-cust h-1/15 justify-between items-center">
                        <div
                            className=" h-full flex items-center bg-custom-foreground text-custom-button-text rounded-md"
                            onClick={handleClickBackArrow}
                        >
                            <MoveLeft
                                size={70}
                                className="cursor-pointer p-2"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="h-1/15"></div>
                )}

                {/* render screen */}
                <div className="h-12/15 w-full">
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

                <div className="h-2/15 flex justify-center">
                    <button
                        disabled={handleDisabledButton()}
                        onClick={handleOnClickButton}
                        className="bg-custom-foreground  rounded-md text-custom-button-text font-bold h-14 cursor-pointer text-2xl shadow-xl shadow-custom-700 w-1/2"
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
