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
        <Card className="border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full animate-pulse">
                                <AlertTriangle className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-orange-800 text-lg">
                                    Ticket en atención activa
                                </h3>
                                <p className="text-sm text-orange-700 font-medium">
                                    {currentActiveTicket.visible_code} - {[
                                        currentActiveTicket.citizen?.names,
                                        currentActiveTicket.citizen?.first_surname,
                                        currentActiveTicket.citizen?.second_surname
                                    ].filter(Boolean).join(' ')}
                                </p>
                                <p className="text-xs text-orange-600 mt-1">
                                    Continúa atendiendo a este ciudadano
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={onViewTicket}
                        className="bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Continuar atención
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
