import { AreaT } from '@/types/general';
import { ScreenT } from '..';
import { TicketGeneratorFormDataT } from '../types';
import { ArrowLeft, Check, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

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
            className={`p-2 border font-semibold text-center min-h-16 flex items-center justify-center text-xs ${
                isSelected
                    ? `${colorClass} text-white border-gray-800`
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
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
    const [searchTerm, setSearchTerm] = useState('');
    const searchLower = searchTerm.trim().toLowerCase();
    const hasSearch = searchLower.length > 0;

    const matchesSearch = (area: AreaT) => {
        if (!searchLower) return true;
        const name = area.name?.toLowerCase() ?? '';
        const shortName = area.short_name?.toLowerCase() ?? '';
        return name.includes(searchLower) || shortName.includes(searchLower);
    };

    const gerencias = useMemo(
        () => areas.filter((a) => a.type_id === 1 && matchesSearch(a)),
        [areas, searchLower],
    );
    const oficinas = useMemo(
        () => areas.filter((a) => a.type_id === 4 && !a.parent_id && matchesSearch(a)),
        [areas, searchLower],
    );

    const subgerencias = useMemo(
        () =>
            areas.filter((a) => {
                if (a.type_id !== 2) return false;
                if (hasSearch) return matchesSearch(a);
                return a.parent_id === selectedAreas.gerencia.id;
            }),
        [areas, selectedAreas.gerencia.id, searchLower, hasSearch],
    );

    const selectGerencia = (gerencia: AreaT) => {
        setSelectedAreas({
            gerencia,
            subgerencia: initArea,
            unidad: initArea,
            oficina: initArea,
        });
    };

    const selectSubgerencia = (subgerencia: AreaT) => {
        const parentGerencia = !selectedAreas.gerencia.id
            ? areas.find((a) => a.id === subgerencia.parent_id)
            : null;

        setSelectedAreas({
            ...selectedAreas,
            gerencia: parentGerencia ?? selectedAreas.gerencia,
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
        <div className="flex flex-col h-full gap-0">
            {/* Botón volver */}
            <div className="flex justify-end flex-shrink-0 mb-2">
                <button
                    onClick={handleGoBack}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 transition-colors text-xs font-semibold"
                    title="Volver"
                >
                    ← Atrás
                </button>
            </div>

            {/* Panel de área seleccionada - Mostrar en la parte superior */}
            {hasSelection && (
                <div className="bg-gray-800 border-b border-gray-700 flex flex-col flex-shrink-0">
                    <div className="p-2">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                            Seleccionado
                        </p>
                        <p className="text-sm font-bold text-white mt-1">
                            {getSelectedAreaName()}
                        </p>
                    </div>
                </div>
            )}

            {/* Buscador de áreas */}
            <div className="bg-white border border-gray-300 mb-2">
                <div className="p-3">
                    <div className="relative max-w-md">
                        <div className="absolute left-3 top-2.5 text-gray-600">
                            <Search className="h-4 w-4" />
                        </div>
                        <input
                            placeholder="Buscar área..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 py-2 border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-0 text-xs font-medium bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* Contenedor de columnas - Todo en una pantalla sin scroll */}
            <div className="flex-1 overflow-hidden flex gap-2">
                {/* Columna 1: Gerencias */}
                <div className="flex-1 bg-gray-50 border border-gray-300 flex flex-col min-w-0 my-1">
                    <div className="bg-gray-700 text-white px-3 py-2 flex-shrink-0">
                        <h3 className="text-xs font-bold uppercase">Gerencias</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="grid grid-cols-2 gap-1">
                            {gerencias.map((gerencia) => (
                                <AreaButton
                                    key={gerencia.id}
                                    area={gerencia}
                                    isSelected={selectedAreas.gerencia.id === gerencia.id}
                                    onClick={() => selectGerencia(gerencia)}
                                    colorClass="bg-gray-700 hover:bg-gray-800"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna 2: Sub-gerencias (si hay una gerencia seleccionada) */}
                {(selectedAreas.gerencia.id || hasSearch) && (
                    <div className="flex-1 bg-gray-50 border border-gray-300 flex flex-col min-w-0 animate-in fade-in duration-500 my-1">
                        <div className="bg-gray-700 text-white px-3 py-2 flex-shrink-0">
                            <h3 className="text-xs font-bold uppercase">Sub Gerencias</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2">
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
                                            colorClass="bg-gray-700 hover:bg-gray-800"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 text-xs py-4 flex items-center justify-center h-full">
                                    Sin sub gerencias
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Columna 3: Oficinas (siempre visible) */}
                <div className="flex-1 bg-gray-50 border border-gray-300 flex flex-col min-w-0 my-1">
                    <div className="bg-gray-700 text-white px-3 py-2 flex-shrink-0">
                        <h3 className="text-xs font-bold uppercase">Oficinas</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="grid grid-cols-2 gap-1">
                            {oficinas.map((oficina) => (
                                <AreaButton
                                    key={oficina.id}
                                    area={oficina}
                                    isSelected={selectedAreas.oficina.id === oficina.id}
                                    onClick={() => selectOficina(oficina)}
                                    colorClass="bg-gray-700 hover:bg-gray-800"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón Seleccionar - Fijo en la parte inferior */}
            {hasSelection && (
                <button
                    onClick={handleConfirm}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-2 text-sm flex items-center justify-center gap-2 border border-gray-900 flex-shrink-0"
                >
                    <Check className="w-4 h-4" />
                    Seleccionar
                </button>
            )}
        </div>
    );
}
