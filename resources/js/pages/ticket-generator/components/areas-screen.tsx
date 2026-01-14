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
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md border-l-4 border-l-blue-600 p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        {title}
                    </h1>
                </div>

                {/* Grid de áreas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {areas.map((area) => (
                        <BoxContent
                            area={area}
                            key={area.id}
                            screen={screen}
                            setScreen={setScreen}
                            setSelectedAreas={setSelectedAreas}
                            selectedAreas={selectedAreas}
                        />
                    ))}
                    {screen === 'gerencias' && (
                        <button
                            onClick={() => setScreen('oficinas')}
                            className="p-4 rounded-lg cursor-pointer text-white bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-semibold shadow-md transition-all h-32 flex items-center justify-center text-center"
                        >
                            Ver Oficinas
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
