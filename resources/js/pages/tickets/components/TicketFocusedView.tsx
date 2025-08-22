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
            {/* Card principal con diseño físico moderno */}
            <Card className="border border-gray-200 shadow-2xl bg-white rounded-3xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
                {/* Header con diseño más sutil */}
                <CardHeader className="bg-gray-100 border-b border-gray-200 pt-6 pb-6 px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-200 shadow-sm">
                                <User className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold tracking-wide text-gray-900">
                                    {`${ticket.citizen?.names} ${ticket.citizen?.first_surname} ${ticket.citizen?.second_surname}`}
                                </CardTitle>
                                <p className="text-emerald-600 font-medium text-lg">
                                    Ticket #{ticket.visible_code}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 flex-wrap">
                                {getStatusBadge(ticket.status?.type || 'en espera')}
                                {isTicketDerived(ticket) && (
                                    <Badge 
                                        variant="outline"
                                        className="bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                        <ArrowRightLeft className="w-3 h-3 mr-1" />
                                        Derivado
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8">
                    {/* Grid de información con estilo de tarjetas físicas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* DNI Card */}
                        <div className="group cursor-default">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <IdCard className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">DNI</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900 font-mono">
                                    {ticket.citizen?.document_number || 'No especificado'}
                                </p>
                            </div>
                        </div>

                        {/* Área Card */}
                        <div className="group cursor-default">
                            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-5 rounded-2xl border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-emerald-200 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-4 h-4 text-emerald-700" />
                                    </div>
                                    <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Área</span>
                                </div>
                                <p className="text-xl font-bold text-emerald-900">
                                    {ticket.area?.name || 'No asignada'}
                                </p>
                            </div>
                        </div>

                        {/* Tiempo Card */}
                        <div className="group cursor-default md:col-span-2">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Hora de Admisión</span>
                                </div>
                                <p className="text-xl font-bold text-blue-900">
                                    {ticket.time_admission || 'Recién asignado'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Observaciones si existen */}
                    {ticket.observations && (
                        <div className="mb-8">
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-2xl border border-amber-200 shadow-md">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-amber-700" />
                                    </div>
                                    <h3 className="text-lg font-bold text-amber-900 uppercase tracking-wide">Observaciones</h3>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 max-h-[160px] overflow-y-auto border border-amber-300/30">
                                    <p className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                                        {ticket.observations}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones de acción con estilo físico */}
                    <div className="border-t border-gray-100 pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Dropdown de Más Opciones */}
                            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="outline"
                                        className="flex-1 h-14 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <MoreVertical className="h-5 w-5 mr-3" />
                                        Más Opciones
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuLabel>Acciones del Ticket</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    
                                    {onViewHistory && (
                                        <DropdownMenuItem onClick={handleViewHistory}>
                                            <History className="mr-2 h-4 w-4" />
                                            <span>Ver Historial</span>
                                        </DropdownMenuItem>
                                    )}
                                    
                                    {onAddNote && (
                                        <DropdownMenuItem onClick={handleAddNote}>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Agregar Nota</span>
                                        </DropdownMenuItem>
                                    )}
                                    
                                    <DropdownMenuSeparator />
                                    
                                    {onReassign && (
                                        <DropdownMenuItem onClick={handleReassign}>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            <span>Reasignar Área</span>
                                        </DropdownMenuItem>
                                    )}
                                    
                                    {onPrintTicket && (
                                        <DropdownMenuItem onClick={handlePrintTicket}>
                                            <FileText className="mr-2 h-4 w-4" />
                                            <span>Imprimir Ticket</span>
                                        </DropdownMenuItem>
                                    )}
                                    
                                    {onDerive && (
                                        <DropdownMenuItem onClick={handleDerive}>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            <span>Derivar a Otra Área</span>
                                        </DropdownMenuItem>
                                    )}
                                    
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem 
                                        onClick={handleRelease}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        <UserX className="mr-2 h-4 w-4" />
                                        <span>Liberar Ticket</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                            <Button 
                                onClick={onClose} 
                                className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <CheckCircle className="h-5 w-5 mr-3" />
                                Cerrar Ticket
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
