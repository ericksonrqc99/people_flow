import { Button } from '@/components/ui/button';
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
        <div className="bg-yellow-100 border-l-4 border-l-yellow-700 shadow">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-yellow-700 text-white">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                                Ticket en atención
                            </h3>
                            <p className="text-xs text-gray-700">
                                {currentActiveTicket.visible_code} - {[
                                    currentActiveTicket.citizen?.names,
                                    currentActiveTicket.citizen?.first_surname,
                                    currentActiveTicket.citizen?.second_surname
                                ].filter(Boolean).join(' ')}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={onViewTicket}
                        className="bg-yellow-700 hover:bg-yellow-800 text-white text-xs px-3 py-1.5"
                    >
                        <Eye className="h-3 w-3 mr-1" />
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
}
