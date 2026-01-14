import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Eye } from 'lucide-react';
import { Ticket } from '@/types/general';

interface ActiveTicketBannerProps {
    currentActiveTicket: Ticket;
    onViewTicket: () => void;
}

export default function ActiveTicketBanner({ 
    currentActiveTicket, 
    onViewTicket 
}: ActiveTicketBannerProps) {
    return (
        <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-14 h-14 bg-yellow-200 rounded-lg animate-pulse">
                            <AlertTriangle className="h-7 w-7 text-yellow-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">
                                ⚠️ Ticket en atención activa
                            </h3>
                            <p className="text-sm text-gray-700 font-semibold">
                                {currentActiveTicket.visible_code} - {[
                                    currentActiveTicket.citizen?.names,
                                    currentActiveTicket.citizen?.first_surname,
                                    currentActiveTicket.citizen?.second_surname
                                ].filter(Boolean).join(' ')}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Continúa atendiendo a este ciudadano
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={onViewTicket}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-md font-semibold"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Continuar atención
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
