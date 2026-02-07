import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { Calendar, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/types/general';

type Props = {
    getFilteredTickets: (value: string) => Ticket[];
    openTakeModal: (value: Ticket) => void;
    openViewModal: (value: Ticket) => void;
    tabContentValue: string;
};

export default function TabContent({
    getFilteredTickets,
    openTakeModal,
    openViewModal,
    tabContentValue,
}: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'en espera':
                return (
                    <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    >
                        En Espera
                    </Badge>
                );
            case 'cancelado':
                return <Badge variant="destructive">Cancelado</Badge>;
            case 'cerrado':
                return (
                    <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                    >
                        Cerrado
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };
    return (
        <TabsContent value={tabContentValue} className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Todos los Tickets (
                    {getFilteredTickets(tabContentValue).length})
                </h2>
            </div>
            {getFilteredTickets(tabContentValue).length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-muted-foreground">
                            No se encontraron tickets
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {getFilteredTickets(tabContentValue).map((ticket) => (
                        <Card
                            key={ticket.id}
                            className="hover:shadow-md transition-shadow"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold">
                                        {ticket.visible_code}
                                    </CardTitle>
                                    {getStatusBadge(ticket.status.type)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(
                                            ticket.created_at,
                                        ).toLocaleDateString('es-ES')}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">
                                            {`${ticket.citizen.names} ${ticket.citizen?.first_surname} ${ticket.citizen?.second_surname}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                                        {ticket.attended_by ? (
                                            <Badge
                                                variant="outline"
                                                className="bg-blue-50 text-blue-700"
                                            >
                                                {ticket.attended_by.name}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                Sin asignar
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    {!ticket.attended_by &&
                                        ticket.status.type === 'en espera' && (
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    openTakeModal(ticket)
                                                }
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                            >
                                                <UserCheck className="h-4 w-4 mr-1" />
                                                Tomar
                                            </Button>
                                        )}
                                    {/* <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openViewModal(ticket)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openEditModal(ticket)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive hover:text-destructive bg-transparent"
                                        onClick={() => openDeleteModal(ticket)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button> */}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </TabsContent>
    );
}
