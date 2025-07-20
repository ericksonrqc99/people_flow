import { TicketGeneratorFormDataT } from '../types';
import { AreaT } from '@/types/general';
import { capitalizeFirstLetter, capitalizeFirstLetterOnly } from '@/lib/utils';
import { ScreenT } from '..';

type props = {
    area: AreaT;
    className?: string;
    setScreen: (value: ScreenT) => void;
    screen: ScreenT;
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

export default function BoxContent({
    area,
    className,
    screen,
    setScreen,
    selectedAreas,
    setSelectedAreas,
    ...props
}: props) {
    const handleOnClick = () => {
        if (screen === 'gerencias') {
            setSelectedAreas({ ...selectedAreas, gerencia: area });
        }
        if (screen === 'subgerencias') {
            setSelectedAreas({ ...selectedAreas, subgerencia: area });
        }
        if (screen === 'unidades') {
            setSelectedAreas({ ...selectedAreas, unidad: area });
        }
        if (screen === 'oficinas') {
            setSelectedAreas({ ...selectedAreas, oficina: area });
        }
    };

    const handleOnDoubleClick = () => {
        if (area.children.length === 0) {
            return;
        }
        if (screen === 'gerencias') {
            setScreen('subgerencias');
        }
        if (screen == 'subgerencias') {
            setScreen('unidades');
        }
    };

    const setStyles = () => {
        switch (screen) {
            case 'gerencias':
                return selectedAreas.gerencia.id === area.id;

            case 'subgerencias':
                return selectedAreas.subgerencia.id === area.id;

            case 'unidades':
                return selectedAreas.unidad.id === area.id;
            case 'oficinas':
                return selectedAreas.oficina.id === area.id;
            default:
        }
    };

    return (
        <div
            onClick={handleOnClick}
            onDoubleClick={handleOnDoubleClick}
            className={`bg-custom-muted px-2 min-h-40  py-4 flex items-center justify-center rounded-md hover:bg-custom-200 cursor-pointer border-4  border-transparent ${className} shadow-lg ${setStyles() && 'border-4 border-dashed !border-black'}`}
        >
            <h3 className="text-center font-semibold">
                {capitalizeFirstLetterOnly(area.short_name)}
            </h3>
        </div>
    );
}
