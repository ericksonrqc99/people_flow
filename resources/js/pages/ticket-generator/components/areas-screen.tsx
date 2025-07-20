import { AreaT } from '@/types/general';
import BoxContent from './box-content';
import { TicketGeneratorFormDataT } from '../types';
import { ScreenT } from '..';
import { Button } from '@/components/ui/button';

type props = {
    areas: AreaT[];
    screen: ScreenT;
    setScreen: (value: ScreenT) => void;
    title: string;
    selectedAreas: {
        gerencia: AreaT;
        subgerencia: AreaT;
        unidad: AreaT;
        oficina: AreaT;
    };
    setSelectedAreas: (value: {
        gerencia: AreaT;
        subgerencia: AreaT;
        unidad: AreaT;
        oficina: AreaT;
    }) => void;
};

export default function AreasScreen({
    areas,
    setScreen,
    screen,
    title,
    setSelectedAreas,
    selectedAreas,
}: props) {
    return (
        <div className="flex flex-col gap-y-6 items-center">
            <h1 className="text-center text-4xl font-semibold text-custom-foreground">{title}</h1>
            <section className="flex flex-col justify-between items-center gap-y-6">
                <div className="grid grid-cols-6 gap-2 w-10/12">
                    {areas.map((area) => (
                        <BoxContent
                            area={area}
                            className="text-2xl"
                            key={area.id}
                            screen={screen}
                            setScreen={setScreen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                        ></BoxContent>
                    ))}
                    {screen === 'gerencias' && (
                        <button
                            onClick={() => setScreen('oficinas')}
                            className="text-2xl font-semibold p-4 rounded-md cursor-pointer text-custom-button-text bg-custom-foreground "
                        >
                            Ver Oficinas
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}
