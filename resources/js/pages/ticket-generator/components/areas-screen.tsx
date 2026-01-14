import { AreaT } from '@/types/general';
import { ScreenT } from '..';
import { TicketGeneratorFormDataT } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

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
    setData: (value: Required<TicketGeneratorFormDataT>) => void;
    data: Required<TicketGeneratorFormDataT>;
};

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

const AreaButton = ({
    area,
    isSelected,
    onClick,
    colorClass,
}: {
    area: AreaT;
    isSelected: boolean;
    onClick: () => void;
    colorClass: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={`p-1.5 rounded-lg transition-all border-3 font-bold text-center min-h-16 flex items-center justify-center text-sm ${
                isSelected
                    ? `${colorClass} text-white shadow-2xl ring-2 ring-offset-2`
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
            }`}
        >
            <span className="line-clamp-2">{area.short_name}</span>
        </button>
    );
};

export default function AreasScreen({
    areas,
    setScreen,
    screen,
    title,
    setSelectedAreas,
    selectedAreas,
    setData,
    data,
}: props) {
    const gerencias = areas.filter((a) => a.type_id === 1);
    const oficinas = areas.filter((a) => a.type_id === 4 && !a.parent_id);

    const subgerencias = selectedAreas.gerencia.id
        ? areas.filter(
              (a) => a.type_id === 2 && a.parent_id === selectedAreas.gerencia.id,
          )
        : [];

    const selectGerencia = (gerencia: AreaT) => {
        setSelectedAreas({
            gerencia,
            subgerencia: initArea,
            unidad: initArea,
            oficina: initArea,
        });
    };

    const selectSubgerencia = (subgerencia: AreaT) => {
        setSelectedAreas({
            ...selectedAreas,
            subgerencia,
        });
    };

    const selectOficina = (oficina: AreaT) => {
        setSelectedAreas({
            gerencia: initArea,
            subgerencia: initArea,
            unidad: initArea,
            oficina,
        });
    };

    const handleConfirm = () => {
        // Obtener el área seleccionada (la más profunda que tenga valor)
        const selectedArea = selectedAreas.oficina.id
            ? selectedAreas.oficina
            : selectedAreas.subgerencia.id
            ? selectedAreas.subgerencia
            : selectedAreas.gerencia;
        
        setData({ ...data, area: selectedArea });
        setScreen('confirm');
    };

    const handleGoBack = () => {
        setScreen('search-citizen');
        setSelectedAreas({
            gerencia: initArea,
            subgerencia: initArea,
            unidad: initArea,
            oficina: initArea,
        });
    };

    const getSelectedAreaName = () => {
        if (selectedAreas.oficina.id) return selectedAreas.oficina.name;
        if (selectedAreas.subgerencia.id) return selectedAreas.subgerencia.name;
        if (selectedAreas.gerencia.id) return selectedAreas.gerencia.name;
        return '';
    };

    const hasSelection =
        selectedAreas.gerencia.id ||
        selectedAreas.subgerencia.id ||
        selectedAreas.oficina.id;

    return (
        <div className="flex flex-col h-full gap-1">
            {/* Botón volver */}
            <div className="flex justify-end flex-shrink-0">
                <button
                    onClick={handleGoBack}
                    className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg p-1 transition-all"
                    title="Volver"
                >
                    <ArrowLeft className="w-3 h-3" />
                </button>
            </div>

            {/* Panel de confirmación - Mostrar en la parte superior */}
            {hasSelection && (
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 border-b-4 border-blue-700 flex flex-col flex-shrink-0 shadow-lg rounded-lg p-2">
                    <p className="text-xs text-white font-semibold uppercase tracking-wide">
                        ✓ Seleccionado:
                    </p>
                    <p className="text-base font-bold text-white line-clamp-2 mt-1">
                        {getSelectedAreaName()}
                    </p>
                </div>
            )}

            {/* Contenedor de columnas - Todo en una pantalla sin scroll */}
            <div className="flex-1 overflow-hidden flex gap-1">
                {/* Columna 1: Gerencias */}
                <div className="flex-1 bg-blue-50 rounded-lg p-1.5 flex flex-col min-w-0">
                    <h3 className="text-xs font-bold text-blue-900 uppercase mb-1 flex-shrink-0">
                        Gerencias
                    </h3>
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-1">
                            {gerencias.map((gerencia) => (
                                <AreaButton
                                    key={gerencia.id}
                                    area={gerencia}
                                    isSelected={selectedAreas.gerencia.id === gerencia.id}
                                    onClick={() => selectGerencia(gerencia)}
                                    colorClass="bg-gradient-to-br from-blue-600 to-blue-700"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna 2: Sub-gerencias (si hay una gerencia seleccionada) */}
                {selectedAreas.gerencia.id && (
                    <div className="flex-1 bg-green-50 rounded-lg p-1.5 flex flex-col min-w-0">
                        <h3 className="text-xs font-bold text-green-900 uppercase mb-1 flex-shrink-0">
                            Sub Gerencias
                        </h3>
                        <div className="flex-1 overflow-y-auto">
                            {subgerencias.length > 0 ? (
                                <div className="grid grid-cols-2 gap-1">
                                    {subgerencias.map((subgerencia) => (
                                        <AreaButton
                                            key={subgerencia.id}
                                            area={subgerencia}
                                            isSelected={
                                                selectedAreas.subgerencia.id ===
                                                subgerencia.id
                                            }
                                            onClick={() => selectSubgerencia(subgerencia)}
                                            colorClass="bg-gradient-to-br from-green-600 to-green-700"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-green-700 text-xs py-1 flex items-center justify-center h-full">
                                    Sin sub gerencias
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Columna 3: Oficinas (siempre visible) */}
                <div className="flex-1 bg-orange-50 rounded-lg p-1.5 flex flex-col min-w-0">
                    <h3 className="text-xs font-bold text-orange-900 uppercase mb-1 flex-shrink-0">
                        Oficinas
                    </h3>
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-1">
                            {oficinas.map((oficina) => (
                                <AreaButton
                                    key={oficina.id}
                                    area={oficina}
                                    isSelected={selectedAreas.oficina.id === oficina.id}
                                    onClick={() => selectOficina(oficina)}
                                    colorClass="bg-gradient-to-br from-orange-600 to-orange-700"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón Generar Ticket - Fijo en la parte inferior */}
            {hasSelection && (
                <button
                    onClick={handleConfirm}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-2 transition-colors text-sm flex items-center justify-center gap-2 shadow-md rounded-lg flex-shrink-0"
                >
                    <Check className="w-4 h-4" />
                    Seleccionar
                </button>
            )}
        </div>
    );
}
