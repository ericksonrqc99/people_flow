import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, UserCheck, Clock, CheckCircle, XCircle, Circle, ArrowRightLeft } from 'lucide-react';
import { Ticket } from '@/types/general';

interface CategoryTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    ticketsData: Ticket[];
    getFilteredTickets: () => Ticket[];
    openTakeModal: (ticket: Ticket) => void;
    openViewModal: (ticket: Ticket) => void;
}

export default function CategoryTabs({
    activeTab,
    setActiveTab,
    ticketsData,
    getFilteredTickets,
    openTakeModal,
    openViewModal
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

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'en espera':
                return 'default'; // Verde para destacar tickets disponibles
            case 'atendiendo':
                return 'secondary'; // Gris para en proceso
            case 'cerrado':
                return 'outline'; // Verde más sutil para completados
            case 'cancelado':
                return 'destructive'; // Rojo para cancelados
            default:
                return 'secondary';
        }
    };

    const getCardStyling = (status: string) => {
        switch (status) {
            case 'en espera':
                return 'border-green-200 bg-green-50/30 hover:bg-green-50/60 hover:border-green-300';
            case 'atendiendo':
                return 'border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60 hover:border-emerald-300';
            case 'cerrado':
                return 'border-teal-200 bg-teal-50/30 hover:bg-teal-50/60 hover:border-teal-300';
            case 'cancelado':
                return 'border-red-200 bg-red-50/30 hover:bg-red-50/60 hover:border-red-300';
            default:
                return 'border-gray-200 bg-gray-50/30 hover:bg-gray-50/60 hover:border-gray-300';
        }
    };

    const getStatusIcon = (status: string) => {
        const iconClass = "w-5 h-5";
        switch (status) {
            case 'en espera':
                return <Circle className={`${iconClass} text-green-600 fill-green-200`} />;
            case 'atendiendo':
                return <Clock className={`${iconClass} text-yellow-600 fill-yellow-200`} />;
            case 'cerrado':
                return <CheckCircle className={`${iconClass} text-teal-600 fill-teal-200`} />;
            case 'cancelado':
                return <XCircle className={`${iconClass} text-red-600 fill-red-200`} />;
            default:
                return <Circle className={`${iconClass} text-gray-400`} />;
        }
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
        <div className="space-y-6">
            {/* Tabs - AdminLTE style */}
            <div className="bg-white rounded-lg shadow-md border-b-4 border-b-blue-600 overflow-hidden">
                <div className="flex flex-wrap">
                    {categories.map((category, index) => (
                        <button
                            key={category.key}
                            onClick={() => setActiveTab(category.key)}
                            className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 border-r ${
                                index === categories.length - 1 ? 'border-r-0' : 'border-r-gray-200'
                            } ${
                                activeTab === category.key
                                    ? 'bg-blue-600 text-white shadow-inner'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span>{category.label}</span>
                                <span className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                    activeTab === category.key
                                        ? 'bg-white text-blue-600'
                                        : 'bg-gray-200 text-gray-700'
                                }`}>
                                    {category.count}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTickets.map((ticket) => (
                    <Card 
                        key={ticket.id} 
                        className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
                            ticket.status?.type === 'en espera'
                                ? 'border-l-green-500 hover:border-l-green-600'
                                : ticket.status?.type === 'atendiendo'
                                ? 'border-l-yellow-500 hover:border-l-yellow-600'
                                : ticket.status?.type === 'cerrado'
                                ? 'border-l-teal-500 hover:border-l-teal-600'
                                : 'border-l-red-500 hover:border-l-red-600'
                        } ${getCardStyling(ticket.status?.type || '')}`}
                    >
                        <CardContent className="p-4 space-y-3">
                            {/* Header */}
                            <div className="flex justify-between items-start border-b pb-3">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(ticket.status?.type || '')}
                                        <p className="text-lg font-bold text-blue-600">
                                            {ticket.visible_code}
                                        </p>
                                    </div>
                                    <Badge 
                                        variant={getStatusBadgeVariant(ticket.status?.type || '')}
                                        className="text-xs font-semibold"
                                    >
                                        {getStatusText(ticket.status?.type || '')}
                                    </Badge>
                                </div>
                                {isTicketDerived(ticket) && (
                                    <Badge 
                                        className="text-xs font-medium bg-purple-100 text-purple-700 border border-purple-300"
                                    >
                                        <ArrowRightLeft className="w-3 h-3 mr-1" />
                                        Derivado
                                    </Badge>
                                )}
                            </div>

                            {/* Citizen Info */}
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {[
                                        ticket.citizen?.names,
                                        ticket.citizen?.first_surname,
                                        ticket.citizen?.second_surname
                                    ].filter(Boolean).join(' ')}
                                </p>
                                <p className="text-xs text-gray-600">
                                    🆔 {ticket.citizen?.document_number}
                                </p>
                            </div>

                            {/* Area Info */}
                            <div className="bg-gray-50 rounded p-2">
                                <p className="text-xs text-gray-700">
                                    <span className="font-semibold">Área:</span> {ticket.area?.name}
                                </p>
                            </div>

                            {/* Attended by */}
                            {ticket.attended_by && (
                                <p className="text-xs text-gray-600">
                                    <span className="font-semibold">👤 Asignado a:</span> {ticket.attended_by.name}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-2 border-t">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openViewModal(ticket)}
                                    className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50 font-semibold"
                                >
                                    <Eye className="w-3 h-3 mr-1" />
                                    Ver
                                </Button>
                                {ticket.status?.type === 'en espera' && (
                                    <Button
                                        size="sm"
                                        onClick={() => openTakeModal(ticket)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm"
                                    >
                                        <UserCheck className="w-3 h-3 mr-1" />
                                        Tomar
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredTickets.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300">
                    <Circle className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-600 font-semibold">No se encontraron tickets</p>
                    <p className="text-gray-500 text-sm">Intenta cambiar de categoría o actualiza la página</p>
                </div>
            )}
        </div>
    );
}