import { TabsTrigger, Tabs } from '@/components/ui/tabs';
import TabList from './tabs-list';
import { Badge } from '@/components/ui/badge';
import TabContent from './tab-content';
import { Ticket } from '..';

type Props = {
    activeTab: string;
    setActiveTab: (value: string) => void;
    ticketsData: Ticket[];
    getFilteredTickets: (value: string) => any[];
    openTakeModal: (value: Ticket) => void;
    openViewModal: (value: Ticket) => void;
};

export default function CategoryTabs({
    activeTab,
    setActiveTab,
    ticketsData,
    getFilteredTickets,
    openTakeModal,
    openViewModal,
}: Props) {
    return (
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
        >
            <TabList ticketsData={ticketsData}></TabList>

            <TabContent
                getFilteredTickets={getFilteredTickets}
                openTakeModal={openTakeModal}
                openViewModal={openViewModal}
                tabContentValue="todos"
            ></TabContent>
            <TabContent
                getFilteredTickets={getFilteredTickets}
                openTakeModal={openTakeModal}
                openViewModal={openViewModal}
                tabContentValue="en espera"
            ></TabContent>
            <TabContent
                getFilteredTickets={getFilteredTickets}
                openTakeModal={openTakeModal}
                openViewModal={openViewModal}
                tabContentValue="atendiendo"
            ></TabContent>
            <TabContent
                getFilteredTickets={getFilteredTickets}
                openTakeModal={openTakeModal}
                openViewModal={openViewModal}
                tabContentValue="cerrado"
            ></TabContent>
            <TabContent
                getFilteredTickets={getFilteredTickets}
                openTakeModal={openTakeModal}
                openViewModal={openViewModal}
                tabContentValue="cancelado"
            ></TabContent>
            {/* <TabContent
                getEstadoBadge={}
                getFilteredTickets={}
                openTakeModal={}
            ></TabContent>

            <TabsContent value="todos" className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Todos los Tickets ({getFilteredTickets('todos').length})
                    </h2>
                </div>
                {getFilteredTickets('todos').length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <p className="text-muted-foreground">
                                No se encontraron tickets
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {getFilteredTickets('todos').map((ticket) => (
                            <Card
                                key={ticket.id}
                                className="hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">
                                            {ticket.visible_code}
                                        </CardTitle>
                                        {getEstadoBadge(ticket.estado)}
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
                                            {ticket.asignado_a ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-50 text-blue-700"
                                                >
                                                    {ticket.asignado_a}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Sin asignar
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        {!ticket.asignado_a &&
                                            ticket.estado === 'en espera' && (
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
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openViewModal(ticket)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openEditModal(ticket)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive bg-transparent"
                                            onClick={() =>
                                                openDeleteModal(ticket)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="en espera" className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Tickets en Espera (
                        {getFilteredTickets('en espera').length})
                    </h2>
                </div>
                {getFilteredTickets('en espera').length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <p className="text-muted-foreground">
                                No hay tickets en espera
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {getFilteredTickets('en espera').map((ticket) => (
                            <Card
                                key={ticket.id}
                                className="hover:shadow-md transition-shadow border-yellow-200"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">
                                            {ticket.codigo}
                                        </CardTitle>
                                        {getEstadoBadge(ticket.estado)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                ticket.fecha,
                                            ).toLocaleDateString('es-ES')}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">
                                                {ticket.solicitante}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                                            {ticket.asignado_a ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-50 text-blue-700"
                                                >
                                                    {ticket.asignado_a}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Sin asignar
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        {!ticket.asignado_a && (
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
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openViewModal(ticket)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openEditModal(ticket)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive bg-transparent"
                                            onClick={() =>
                                                openDeleteModal(ticket)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="cerrado" className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Tickets Cerrados ({getFilteredTickets('cerrado').length}
                        )
                    </h2>
                </div>
                {getFilteredTickets('cerrado').length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <p className="text-muted-foreground">
                                No hay tickets cerrados
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {getFilteredTickets('cerrado').map((ticket) => (
                            <Card
                                key={ticket.id}
                                className="hover:shadow-md transition-shadow border-green-200"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">
                                            {ticket.codigo}
                                        </CardTitle>
                                        {getEstadoBadge(ticket.estado)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                ticket.fecha,
                                            ).toLocaleDateString('es-ES')}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">
                                                {ticket.solicitante}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                                            {ticket.asignado_a ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-50 text-blue-700"
                                                >
                                                    {ticket.asignado_a}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Sin asignar
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openViewModal(ticket)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openEditModal(ticket)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive bg-transparent"
                                            onClick={() =>
                                                openDeleteModal(ticket)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="cancelado" className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Tickets Cancelados (
                        {getFilteredTickets('cancelado').length})
                    </h2>
                </div>
                {getFilteredTickets('cancelado').length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <p className="text-muted-foreground">
                                No hay tickets cancelados
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {getFilteredTickets('cancelado').map((ticket) => (
                            <Card
                                key={ticket.id}
                                className="hover:shadow-md transition-shadow border-red-200"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">
                                            {ticket.codigo}
                                        </CardTitle>
                                        {getEstadoBadge(ticket.estado)}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                ticket.fecha,
                                            ).toLocaleDateString('es-ES')}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">
                                                {ticket.solicitante}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                                            {ticket.asignado_a ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-50 text-blue-700"
                                                >
                                                    {ticket.asignado_a}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Sin asignar
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openViewModal(ticket)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                openEditModal(ticket)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive bg-transparent"
                                            onClick={() =>
                                                openDeleteModal(ticket)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent> */}
        </Tabs>
    );
}
