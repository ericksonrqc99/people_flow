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
    ArrowRightLeft,
    Calendar,
    LogIn,
    LogOut as LogOutIcon
} from 'lucide-react';
import { Ticket } from '@/types/general';
import { useState, useEffect } from 'react';

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
    const [elapsedTime, setElapsedTime] = useState('00:00:00');

    // Actualizar el contador cada segundo
    useEffect(() => {
        if (!ticket.time_admission) return;

        const interval = setInterval(() => {
            const admissionTime = new Date(ticket.time_admission).getTime();
            const now = new Date().getTime();
            const diff = Math.floor((now - admissionTime) / 1000);

            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            setElapsedTime(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [ticket.time_admission]);

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
                    <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Atendiendo
                    </div>
                );
            case 'cerrado':
                return (
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Cerrado
                    </div>
                );
            case 'cancelado':
                return (
                    <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1">
                        <X className="w-3 h-3" />
                        Cancelado
                    </div>
                );
            default:
                return (
                    <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {estado}
                    </div>
                );
        }
    };

    return (
        <div className="space-y-4">
            {/* Main Container - AdminLTE style */}
            <div className="bg-white border border-gray-300 shadow">
                {/* Header */}
                <div className="bg-gray-700 text-white p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 bg-blue-700 flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-sm font-bold">
                                    {`${ticket.citizen?.names} ${ticket.citizen?.first_surname} ${ticket.citizen?.second_surname}`}
                                </h2>
                                <p className="text-xs text-gray-300">
                                    Ticket #{ticket.visible_code}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {getStatusBadge(ticket.status?.type || 'en espera')}
                            {isTicketDerived(ticket) && (
                                <div className="px-2 py-1 bg-purple-700 text-white text-xs font-bold flex items-center gap-1">
                                    <ArrowRightLeft className="w-3 h-3" />
                                    Derivado
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Contador de Tiempo */}
                    {ticket.time_admission && (
                        <div className="p-3 bg-gray-900 text-white border border-gray-700 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-xs font-semibold text-gray-400 mb-1">Tiempo en atención</p>
                                <p className="text-2xl font-bold font-mono">{elapsedTime}</p>
                            </div>
                        </div>
                    )}

                    {/* Info Grid - Columna */}
                    <div className="grid grid-cols-1 gap-2 mb-4">
                        {/* DNI */}
                        <div className="p-2 bg-gray-50 border border-gray-300">
                            <div className="flex items-center gap-1 mb-1">
                                <IdCard className="w-4 h-4 text-gray-700" />
                                <span className="text-xs font-semibold text-gray-700">DNI</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                {ticket.citizen?.document_number || 'N/A'}
                            </p>
                        </div>

                        {/* Tipo de Trámite */}
                        {ticket.type && (
                            <div className="p-2 bg-gray-50 border border-gray-300">
                                <div className="flex items-center gap-1 mb-1">
                                    <FileText className="w-4 h-4 text-gray-700" />
                                    <span className="text-xs font-semibold text-gray-700">Tipo de Trámite</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    {ticket.type.name || 'N/A'}
                                </p>
                            </div>
                        )}

                        {/* Estado del Ticket */}
                        <div className="p-2 bg-gray-50 border border-gray-300">
                            <div className="flex items-center gap-1 mb-1">
                                <UserCheck className="w-4 h-4 text-green-700" />
                                <span className="text-xs font-semibold text-gray-700">Estado</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                {ticket.status?.type ? ticket.status.type.charAt(0).toUpperCase() + ticket.status.type.slice(1) : 'N/A'}
                            </p>
                        </div>

                        {/* Código de Ticket */}
                        <div className="p-2 bg-gray-50 border border-gray-300">
                            <div className="flex items-center gap-1 mb-1">
                                <FileText className="w-4 h-4 text-gray-700" />
                                <span className="text-xs font-semibold text-gray-700">Código del Ticket</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                {ticket.visible_code || 'N/A'}
                            </p>
                        </div>

                        {/* Fecha de Creación */}
                        <div className="p-2 bg-gray-50 border border-gray-300">
                            <div className="flex items-center gap-1 mb-1">
                                <Calendar className="w-4 h-4 text-gray-700" />
                                <span className="text-xs font-semibold text-gray-700">Fecha de Creación</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('es-ES') : 'N/A'}
                            </p>
                        </div>

                        {/* Hora de Salida (si existe) */}
                        {ticket.time_departure && (
                            <div className="p-2 bg-gray-50 border border-gray-300">
                                <div className="flex items-center gap-1 mb-1">
                                    <LogOutIcon className="w-4 h-4 text-red-700" />
                                    <span className="text-xs font-semibold text-gray-700">Hora de Salida</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    {new Date(ticket.time_departure).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        )}

                        {/* Registrado por */}
                        {ticket.registered_by && (
                            <div className="p-2 bg-gray-50 border border-gray-300">
                                <div className="flex items-center gap-1 mb-1">
                                    <User className="w-4 h-4 text-gray-700" />
                                    <span className="text-xs font-semibold text-gray-700">Registrado por</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    {ticket.registered_by.name || 'N/A'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Horas Grid - Fila */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {/* Hora de Creación de Ticket */}
                        <div className="p-2 bg-gray-50 border border-gray-300">
                            <div className="flex items-center gap-1 mb-1">
                                <LogIn className="w-4 h-4 text-blue-700" />
                                <span className="text-xs font-semibold text-gray-700">Hora de Creación de Ticket</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                {ticket.created_at ? new Date(ticket.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                            </p>
                        </div>

                        {/* Hora de Inicio de Atención */}
                        <div className="p-2 bg-gray-50 border border-gray-300">
                            <div className="flex items-center gap-1 mb-1">
                                <Clock className="w-4 h-4 text-yellow-700" />
                                <span className="text-xs font-semibold text-gray-700">Hora de Inicio de Atención</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                {ticket.time_admission ? new Date(ticket.time_admission).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Observaciones */}
                    {ticket.observations && (
                        <div className="p-3 bg-yellow-100 border border-yellow-700 border-l-4 border-l-yellow-700 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-yellow-700" />
                                <h3 className="font-bold text-yellow-900 text-xs">Observaciones</h3>
                            </div>
                            <div className="bg-white p-2 border border-yellow-300 text-xs text-gray-700 max-h-32 overflow-y-auto">
                                {ticket.observations}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 border-t border-gray-300 pt-4">
                        {/* Dropdown */}
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <button 
                                    className="flex-1 h-9 px-3 border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                    Más
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 border border-gray-300 rounded-none bg-white shadow" align="start">
                                <DropdownMenuLabel className="bg-gray-700 text-white px-3 py-2 text-sm font-bold">Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-300" />
                                
                                {onViewHistory && (
                                    <DropdownMenuItem onClick={handleViewHistory} className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 py-2 px-3">
                                        <History className="mr-2 h-4 w-4" />
                                        Ver Historial
                                    </DropdownMenuItem>
                                )}
                                
                                {onAddNote && (
                                    <DropdownMenuItem onClick={handleAddNote} className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 py-2 px-3">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Agregar Nota
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSeparator className="bg-gray-300" />
                                
                                {onDerive && (
                                    <DropdownMenuItem onClick={handleDerive} className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 py-2 px-3">
                                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                                        Derivar
                                    </DropdownMenuItem>
                                )}
                                
                                {onReassign && (
                                    <DropdownMenuItem onClick={handleReassign} className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 py-2 px-3">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Reasignar
                                    </DropdownMenuItem>
                                )}
                                
                                {onPrintTicket && (
                                    <DropdownMenuItem onClick={handlePrintTicket} className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 py-2 px-3">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Imprimir
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSeparator className="bg-gray-300" />
                                
                                <DropdownMenuItem 
                                    onClick={handleRelease}
                                    className="text-sm text-red-700 cursor-pointer hover:bg-red-50 py-2 px-3"
                                >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Liberar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <button 
                            onClick={onClose} 
                            className="flex-1 h-9 px-3 bg-green-700 hover:bg-green-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                        >
                            <CheckCircle className="h-4 w-4" />
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
