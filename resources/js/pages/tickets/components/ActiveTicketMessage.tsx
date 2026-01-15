import { Ticket, Clock, ArrowUp } from 'lucide-react';

export default function ActiveTicketMessage() {
    return (
        <div className="bg-gray-50 border border-gray-300 shadow">
            <div className="p-8">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gray-700 text-white flex items-center justify-center">
                                <Ticket className="w-6 h-6" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-700 flex items-center justify-center animate-pulse">
                                <Clock className="w-2.5 h-2.5 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-base font-bold text-gray-800">
                            Ticket activo en atención
                        </h3>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                            Continúa la atención del ciudadano. Haz clic en el banner de arriba para continuar.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2 text-gray-700 animate-pulse">
                            <ArrowUp className="w-3 h-3" />
                            <span className="text-xs font-medium">Mira el banner de arriba</span>
                            <ArrowUp className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
