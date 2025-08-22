import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Clock, ArrowUp } from 'lucide-react';

export default function ActiveTicketMessage() {
    return (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Ticket className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                                <Clock className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-800">
                            ¡Tienes un ticket activo!
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Tienes un ciudadano esperando tu atención. Haz clic en el banner naranja arriba para continuar.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2 text-green-600 animate-pulse">
                            <ArrowUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Mira el banner naranja</span>
                            <ArrowUp className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
