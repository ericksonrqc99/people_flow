import { Badge } from '@/components/ui/badge';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket } from '@/types/general';

export default function first({ ticketsData }: { ticketsData: Ticket[] }) {
    return (
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="todos" className="flex items-center gap-2">
                Todos
                <Badge variant="secondary" className="ml-1 px-2 py-0 text-xs">
                    {ticketsData.length}
                </Badge>
            </TabsTrigger>
            <TabsTrigger value="en espera" className="flex items-center gap-2">
                En Espera
                <Badge
                    variant="secondary"
                    className="ml-1 px-2 py-0 text-xs bg-yellow-100 text-yellow-800"
                >
                    {
                        ticketsData.filter((t) => t.status.type === 'en espera')
                            .length
                    }
                </Badge>
            </TabsTrigger>
            <TabsTrigger value="cerrado" className="flex items-center gap-2">
                Cerrados
                <Badge
                    variant="secondary"
                    className="ml-1 px-2 py-0 text-xs bg-green-100 text-green-800"
                >
                    {
                        ticketsData.filter((t) => t.status.type === 'cerrado')
                            .length
                    }
                </Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelado" className="flex items-center gap-2">
                Cancelados
                <Badge
                    variant="secondary"
                    className="ml-1 px-2 py-0 text-xs bg-red-100 text-red-800"
                >
                    {
                        ticketsData.filter((t) => t.status.type === 'cancelado')
                            .length
                    }
                </Badge>
            </TabsTrigger>
        </TabsList>
    );
}
