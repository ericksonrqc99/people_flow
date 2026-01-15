import { ArrowRightLeft } from 'lucide-react';
import { Ticket } from '@/types/general';

interface CategoryTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    ticketsData: Ticket[];
    getFilteredTickets: () => Ticket[];
    openTakeModal: (ticket: Ticket) => void;
    openViewModal: (ticket: Ticket) => void;
    onCallTicket: (ticket: Ticket) => void;
    onStopCallTicket: (ticket: Ticket) => void;
}

export default function CategoryTabs({
    activeTab,
    setActiveTab,
    ticketsData,
    getFilteredTickets,
    openTakeModal,
    openViewModal,
    onCallTicket,
    onStopCallTicket
}: CategoryTabsProps) {
    const getStatusText = (status: string) => {
        switch (status) {
            case 'en espera':
                return 'En espera';
            case 'atendiendo':
                return 'Atendiendo';
            case 'cerrado':
                return 'Cerrado';
            case 'cancelado':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const isTicketDerived = (ticket: Ticket) => {
        return ticket.observations && ticket.observations.includes('[Derivado desde área:');
    };

    const getCountForCategory = (category: string) => {
        if (category === 'todos') {
            return ticketsData.length;
        }
        return ticketsData.filter(ticket => ticket.status?.type === category).length;
    };

    const categories = [
        { key: 'todos', label: 'Todos', count: getCountForCategory('todos') },
        { key: 'en espera', label: 'En espera', count: getCountForCategory('en espera') },
        { key: 'atendiendo', label: 'Atendiendo', count: getCountForCategory('atendiendo') },
        { key: 'cerrado', label: 'Cerrados', count: getCountForCategory('cerrado') },
        { key: 'cancelado', label: 'Cancelados', count: getCountForCategory('cancelado') },
    ];

    const filteredTickets = getFilteredTickets();

    return (
        <div className="space-y-4">
            {/* Tabs - AdminLTE style */}
            <div className="bg-white shadow border border-gray-300">
                <div className="flex flex-wrap border-b border-gray-300">
                    {categories.map((category, index) => (
                        <button
                            key={category.key}
                            onClick={() => setActiveTab(category.key)}
                            className={`flex-1 px-4 py-3 text-center font-semibold transition-all text-xs border-b-4 ${
                                activeTab === category.key
                                    ? 'bg-blue-700 text-white border-b-blue-900'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-r border-gray-300 border-b-gray-50'
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span>{category.label}</span>
                                <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-bold ${
                                    activeTab === category.key
                                        ? 'bg-blue-900 text-white'
                                        : 'bg-gray-300 text-gray-700'
                                }`}>
                                    {category.count}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {filteredTickets.map((ticket) => (
                    <div 
                        key={ticket.id} 
                        className="border border-gray-300 bg-white hover:border-blue-500 transition-colors cursor-pointer"
                    >
                        <div className="p-3 space-y-2">
                            {/* Code and Status */}
                            <div className="flex justify-between items-start gap-1">
                                <span className="inline-block px-2 py-1 bg-blue-700 text-white text-xs font-bold flex-shrink-0">
                                    {ticket.visible_code}
                                </span>
                                <span className={`inline-block px-2 py-0.5 text-xs font-bold flex-shrink-0 ${
                                    ticket.status?.type === 'en espera'
                                        ? 'bg-green-100 text-green-700'
                                        : ticket.status?.type === 'atendiendo'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : ticket.status?.type === 'cerrado'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {getStatusText(ticket.status?.type || '')}
                                </span>
                            </div>

                            {/* Derived Badge */}
                            {isTicketDerived(ticket) && (
                                <div className="px-2 py-1 bg-purple-100 border border-purple-300 text-purple-700 text-xs font-semibold flex items-center gap-1">
                                    <ArrowRightLeft className="w-3 h-3" />
                                    Derivado
                                </div>
                            )}

                            {/* Citizen Info */}
                            <div className="border-t border-gray-200 pt-2 text-xs">
                                <p className="font-semibold text-gray-700 truncate">
                                    {[
                                        ticket.citizen?.names,
                                        ticket.citizen?.first_surname,
                                        ticket.citizen?.second_surname
                                    ].filter(Boolean).join(' ')}
                                </p>
                                <p className="text-gray-600">
                                    {ticket.citizen?.document_number}
                                </p>
                            </div>

                            {/* Observations */}
                            <div className="text-xs text-gray-600">
                                <p className="font-semibold text-gray-700">Observaciones:</p>
                                <p className="text-gray-600 line-clamp-2">
                                    {ticket.observations?.trim() || 'Sin observaciones'}
                                </p>
                            </div>

                            {/* Created At */}
                            <div className="p-1 bg-gray-50 border-l-4 border-l-blue-700 text-xs">
                                <p className="text-gray-700">
                                    <span className="font-semibold">Creado:</span>{' '}
                                    {new Date(ticket.created_at).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>

                            {/* Attended by */}
                            {ticket.attended_by && (
                                <p className="text-xs text-gray-600">
                                    <span className="font-semibold">Asignado:</span> {ticket.attended_by.name}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-2 border-t border-gray-200">
                                <button
                                    onClick={() => openViewModal(ticket)}
                                    className="flex-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-300"
                                >
                                    Observaciones
                                </button>
                                {ticket.status?.type === 'en espera' && (
                                    <button
                                        onClick={() => openTakeModal(ticket)}
                                        className="flex-1 px-2 py-1 bg-green-700 text-white text-xs font-semibold hover:bg-green-800 transition-colors border border-green-800"
                                    >
                                        Tomar
                                    </button>
                                )}
                            </div>
                            {ticket.status?.type === 'en espera' && (
                                <div className="pt-2 flex items-center gap-2">
                                    <button
                                        onClick={() => onCallTicket(ticket)}
                                        className="flex-1 px-2 py-1 bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors border border-blue-800"
                                    >
                                        Llamar
                                    </button>
                                    <button
                                        onClick={() => onStopCallTicket(ticket)}
                                        disabled={!ticket.called_at}
                                        title="Dejar de llamar"
                                        className={`px-2 py-1 text-xs font-semibold border transition-colors ${
                                            ticket.called_at
                                                ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
                                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                        }`}
                                    >
                                        Stop
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredTickets.length === 0 && (
                <div className="text-center py-16 bg-white border border-gray-300">
                    <p className="text-gray-700 font-semibold">No se encontraron tickets</p>
                    <p className="text-gray-600 text-xs">Intenta cambiar de categoría</p>
                </div>
            )}
        </div>
    );
}