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
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl shadow-inner">
                {categories.map((category) => (
                    <button
                        key={category.key}
                        onClick={() => setActiveTab(category.key)}
                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeTab === category.key
                                ? 'bg-white text-gray-900 shadow-md transform scale-105'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                        }`}
                    >
                        {category.label}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            activeTab === category.key
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-200 text-gray-600'
                        }`}>
                            {category.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTickets.map((ticket) => (
                    <Card 
                        key={ticket.id} 
                        className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${getCardStyling(ticket.status?.type || '')} backdrop-blur-sm`}
                    >
                        <CardContent className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(ticket.status?.type || '')}
                                        <p className="text-lg font-bold text-green-700">
                                            {ticket.visible_code}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge 
                                            variant={getStatusBadgeVariant(ticket.status?.type || '')}
                                            className="text-xs font-semibold"
                                        >
                                            {getStatusText(ticket.status?.type || '')}
                                        </Badge>
                                        {isTicketDerived(ticket) && (
                                            <Badge 
                                                variant="outline"
                                                className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200"
                                            >
                                                <ArrowRightLeft className="w-3 h-3 mr-1" />
                                                Derivado
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {[
                                            ticket.citizen?.names,
                                            ticket.citizen?.first_surname,
                                            ticket.citizen?.second_surname
                                        ].filter(Boolean).join(' ')}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        DNI: {ticket.citizen?.document_number}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-600">
                                        <strong>Área:</strong> {ticket.area?.name}
                                    </p>
                                </div>

                                {ticket.attended_by && (
                                    <p className="text-xs text-gray-600">
                                        <strong>Asignado a:</strong> {ticket.attended_by.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex space-x-2 pt-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openViewModal(ticket)}
                                    className="flex-1 hover:bg-gray-50"
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Ver
                                </Button>
                                {ticket.status?.type === 'en espera' && (
                                    <Button
                                        size="sm"
                                        onClick={() => openTakeModal(ticket)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                    >
                                        <UserCheck className="w-4 h-4 mr-1" />
                                        Tomar
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No se encontraron tickets</p>
                </div>
            )}
        </div>
    );
}