import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
    UserCheck, 
    X, 
    CheckCircle, 
    User, 
    Clock, 
    IdCard, 
    Building2,
    FileText,
    MoreVertical,
    History,
    MessageSquare,
    UserX,
    RefreshCw,
    ArrowRightLeft
} from 'lucide-react';
import { Ticket } from '@/types/general';
import { useState } from 'react';

interface TicketFocusedViewProps {
    ticket: Ticket;
    onClose: () => void;
    onRelease: () => void;
    onDerive?: () => void;
    onViewHistory?: () => void;
    onAddNote?: () => void;
    onReassign?: () => void;
    onPrintTicket?: () => void;
}

export default function TicketFocusedView({ 
    ticket, 
    onClose, 
    onRelease,
    onDerive,
    onViewHistory,
    onAddNote,
    onReassign,
    onPrintTicket
}: TicketFocusedViewProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Funciones que cierran el dropdown después de ejecutar la acción
    const handleDerive = () => {
        setDropdownOpen(false);
        onDerive?.();
    };

    const handleViewHistory = () => {
        setDropdownOpen(false);
        onViewHistory?.();
    };

    const handleAddNote = () => {
        setDropdownOpen(false);
        onAddNote?.();
    };

    const handleReassign = () => {
        setDropdownOpen(false);
        onReassign?.();
    };

    const handlePrintTicket = () => {
        setDropdownOpen(false);
        onPrintTicket?.();
    };

    const handleRelease = () => {
        setDropdownOpen(false);
        onRelease();
    };

    const isTicketDerived = (ticket: Ticket) => {
        return ticket.observations && ticket.observations.includes('[Derivado desde área:');
    };
    
    const getStatusBadge = (estado: string) => {
        switch (estado) {
            case 'atendiendo':
                return (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <UserCheck className="w-4 h-4 mr-1" />
                        En Atención
                    </Badge>
                );
            case 'cerrado':
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Cerrado
                    </Badge>
                );
            case 'cancelado':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <X className="w-4 h-4 mr-1" />
                        Cancelado
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Clock className="w-4 h-4 mr-1" />
                        {estado}
                    </Badge>
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Main Card - AdminLTE Style */}
            <Card className="border-none shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">
                                    {`${ticket.citizen?.names} ${ticket.citizen?.first_surname} ${ticket.citizen?.second_surname}`}
                                </CardTitle>
                                <p className="text-blue-100">
                                    Ticket #{ticket.visible_code}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {getStatusBadge(ticket.status?.type || 'en espera')}
                            {isTicketDerived(ticket) && (
                                <Badge 
                                    className="bg-purple-200 text-purple-800 border border-purple-300"
                                >
                                    <ArrowRightLeft className="w-3 h-3 mr-1" />
                                    Derivado
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* DNI */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-2 mb-2">
                                <IdCard className="w-4 h-4 text-gray-600" />
                                <span className="text-xs font-semibold text-gray-600 uppercase">DNI</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {ticket.citizen?.document_number || 'N/A'}
                            </p>
                        </div>

                        {/* Área */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2 mb-2">
                                <Building2 className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-semibold text-green-600 uppercase">Área</span>
                            </div>
                            <p className="text-lg font-bold text-green-900">
                                {ticket.area?.name || 'N/A'}
                            </p>
                        </div>

                        {/* Hora */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-600 uppercase">Admisión</span>
                            </div>
                            <p className="text-lg font-bold text-blue-900">
                                {ticket.time_admission || 'Reciente'}
                            </p>
                        </div>

                        {/* Atendido por */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center space-x-2 mb-2">
                                <UserCheck className="w-4 h-4 text-purple-600" />
                                <span className="text-xs font-semibold text-purple-600 uppercase">Atendido por</span>
                            </div>
                            <p className="text-lg font-bold text-purple-900">
                                {ticket.attended_by?.name || 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Observaciones */}
                    {ticket.observations && (
                        <div className="mb-8 p-4 bg-amber-50 border-l-4 border-l-amber-500 rounded">
                            <div className="flex items-center space-x-2 mb-3">
                                <FileText className="w-4 h-4 text-amber-600" />
                                <h3 className="font-bold text-amber-900">Observaciones</h3>
                            </div>
                            <div className="bg-white p-4 rounded border border-amber-200 max-h-48 overflow-y-auto">
                                <p className="text-gray-800 whitespace-pre-wrap">
                                    {ticket.observations}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 border-t pt-6">
                        {/* Dropdown */}
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="outline"
                                    className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-lg shadow-sm"
                                >
                                    <MoreVertical className="h-4 w-4 mr-2" />
                                    Más Opciones
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                
                                {onViewHistory && (
                                    <DropdownMenuItem onClick={handleViewHistory}>
                                        <History className="mr-2 h-4 w-4" />
                                        Ver Historial
                                    </DropdownMenuItem>
                                )}
                                
                                {onAddNote && (
                                    <DropdownMenuItem onClick={handleAddNote}>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Agregar Nota
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSeparator />
                                
                                {onDerive && (
                                    <DropdownMenuItem onClick={handleDerive}>
                                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                                        Derivar
                                    </DropdownMenuItem>
                                )}
                                
                                {onReassign && (
                                    <DropdownMenuItem onClick={handleReassign}>
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Reasignar
                                    </DropdownMenuItem>
                                )}
                                
                                {onPrintTicket && (
                                    <DropdownMenuItem onClick={handlePrintTicket}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Imprimir
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem 
                                    onClick={handleRelease}
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Liberar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button 
                            onClick={onClose} 
                            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Cerrar Ticket
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
