'use client';

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useEchoPublic } from '@laravel/echo-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserCheck, Eye, Edit, AlertTriangle } from 'lucide-react';
import { AvaibleTicketTypesT, Ticket, TypeT } from '@/types/general';
import Searcher from './components/searcher';
import CategoryTabs from './components/category-tabs';
import axios from 'axios';

// Tipo para los tickets

export default function Component({ ...props }) {
    const {
        auth: { user },
        tickets,
        ticketTypes,
    } = props;

    const [ticketsData, setTicketsData] = useState<Ticket[]>(tickets);

    const {
        listen: listenCreatedTicket,
        stopListening: stopListeningCreatedTicket,
    } = useEchoPublic(
        `ticket-created.${user.area.id}`,
        'TicketCreated',
        (e: { ticket: Ticket }) => {
            setTicketsData((prevTickets) => [e.ticket, ...prevTickets]);
            if (notificationSound.current) {
                notificationSound.current.play().catch((error) => {
                    console.error('No se pudo reproducir el sonido:', error);
                });
            } else {
                console.warn(
                    'notificationSound.current es null o no es un HTMLAudioElement',
                );
            }
        },
    );

    const {
        listen: listenUpdatedTicket,
        stopListening: stopListeningUpdatedTicket,
    } = useEchoPublic(
        `ticket-updated.${user.area.id}`,
        'UpdatedTicket',
        (e: { ticket: Ticket }) => {
            console.log({ 'updated-ticket': e });
            setTicketsData((prevTickets) =>
                prevTickets.map((prevTicket) => {
                    return prevTicket.id === e.ticket.id
                        ? e.ticket
                        : prevTicket;
                }),
            );
        },
    );

    useEffect(() => {
        listenCreatedTicket();
        listenUpdatedTicket();
        return () => {
            stopListeningCreatedTicket();
            stopListeningUpdatedTicket();
        };
    }, []);

    const notificationSound = useRef<HTMLAudioElement | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [userLoged] = useState(user);

    // Estados para modales
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [showTakeModal, setShowTakeModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Estado para ticket enfocado
    const [focusedTicket, setFocusedTicket] = useState<Ticket | null>(null);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [closeForm, setCloseForm] = useState({
        estado: '' as 'cerrado' | 'cancelado',
        comentario: '',
    });

    // Estados para el formulario de edición
    const [editForm, setEditForm] = useState({
        solicitante: '',
        estado: '' as 'en espera' | 'cancelado' | 'cerrado',
        fecha: '',
    });

    const [activeTab, setActiveTab] = useState('en espera');

    // Filtrar tickets por búsqueda y estado
    const getFilteredTickets = (estado?: string) => {
        return ticketsData.filter((ticket) => {
            const matchesSearch =
                ticket.visible_code
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ticket.citizen.names
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ticket.citizen?.first_surname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ticket.citizen?.second_surname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesEstado =
                !estado || estado === 'todos' || ticket.status?.type === estado;

            return matchesSearch && matchesEstado;
        });
    };

    const filteredTickets = getFilteredTickets(activeTab);

    // Función para obtener el color del badge según el estado
    const getEstadoBadge = (estado: string) => {
        switch (estado) {
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
                return <Badge variant="outline">{estado}</Badge>;
        }
    };

    // Funciones para abrir modales
    const openTakeModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setShowTakeModal(true);
    };

    const openViewModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setShowViewModal(true);
    };

    const openDeriveModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setEditForm({
            solicitante: ticket.citizen.name,
            estado: ticket.estado,
            fecha: ticket.fecha,
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setShowDeleteModal(true);
    };

    // Find ticket type by type name
    const findTicketTypeForType = (typeName: AvaibleTicketTypesT) => {
        return ticketTypes.find((type: TypeT) => type.type === typeName);
    };

    // Funciones para manejar las acciones
    const handleTakeTicket = async () => {
        // changes status of ticket to "atendiendo" and asignement attender

        // find tickettype for 'atendiendo' status

        const ticketType = findTicketTypeForType('atendiendo');

        // update ticket with new status and attended_by_id
        if (selectedTicket) {
            const ticket: Ticket = {
                ...selectedTicket,
                attended_by_id: user?.id,
                status: ticketType,
                status_id: ticketType.id,
            };

            try {
                const res = await axios.put(
                    route('tickets.update', {
                        ticket,
                    }),
                );
                setTicketsData((prev) =>
                    prev.map((ticket) =>
                        ticket.id === selectedTicket.id ? ticket : ticket,
                    ),
                );
                setFocusedTicket(res.data.ticket);
                setShowTakeModal(false);
                setSelectedTicket(null);
                console.log({ 'response/tickets.update': res });
            } catch (error) {
                console.log({ error });
            }

            //end fetch
        }
    };

    const handleEditTicket = () => {
        if (selectedTicket) {
            setTicketsData((prev) =>
                prev.map((ticket) =>
                    ticket.id === selectedTicket.id
                        ? { ...ticket, ...editForm }
                        : ticket,
                ),
            );
            setShowEditModal(false);
            setSelectedTicket(null);
        }
    };

    const handleDeleteTicket = () => {
        if (selectedTicket) {
            setTicketsData((prev) =>
                prev.filter((ticket) => ticket.id !== selectedTicket.id),
            );
            setShowDeleteModal(false);
            setSelectedTicket(null);
        }
    };

    const openCloseModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setCloseForm({
            estado: 'cerrado',
            comentario: '',
        });
        setShowCloseModal(true);
    };

    const handleCloseTicket = () => {
        if (selectedTicket) {
            setTicketsData((prev) =>
                prev.map((ticket) =>
                    ticket.id === selectedTicket.id
                        ? { ...ticket, estado: closeForm.estado }
                        : ticket,
                ),
            );
            setShowCloseModal(false);
            setSelectedTicket(null);
            setFocusedTicket(null); // Volver a la vista normal
        }
    };

    const cancelFocus = () => {
        if (focusedTicket) {
            // Liberar el ticket (quitar asignación)
            setTicketsData((prev) =>
                prev.map((ticket) =>
                    ticket.id === focusedTicket.id
                        ? { ...ticket, asignado_a: null }
                        : ticket,
                ),
            );
        }
        setFocusedTicket(null);
    };

    // Contar tickets por estado
    /*  const ticketsEnEspera = ticketsData.filter(
        (t) => t.status.type === 'en espera',
    ).length;
    const ticketsCerrados = ticketsData.filter(
        (t) => t.status.type === 'cerrado',
    ).length;
    const ticketsCancelados = ticketsData.filter(
        (t) => t.status.type === 'cancelado',
    ).length;
    const ticketsDisponibles = ticketsData.filter(
        (t) => t.status.type === 'en espera' && !t.asignado_a,
    ).length; */

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <audio
                ref={notificationSound}
                src="/assets/sounds/notification-new-ticket.mp3"
                preload="auto"
            ></audio>

            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    {user.name} - {user.area?.name}
                </h1>
                <p className="text-muted-foreground">
                    Gestiona los tickets asignados a tu área
                </p>
            </div>

            {focusedTicket ? (
                // Vista enfocada en un ticket
                <div className="space-y-6">
                    <Card className="border-2 border-blue-500">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">
                                        Ciudadano{': '}
                                        {`${focusedTicket.citizen.names} ${focusedTicket.citizen?.first_surname} ${focusedTicket.citizen?.second_surname}`}
                                    </CardTitle>
                                    <p className="text-muted-foreground">
                                        Ticket asignado a ti
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={cancelFocus}
                                        className="text-orange-600 hover:text-orange-700 bg-transparent"
                                    >
                                        Liberar Ticket
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            openCloseModal(focusedTicket)
                                        }
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Finalizar Ticket
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">
                                        Información del Ticket
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                Código:
                                            </span>
                                            <span className="font-mono">
                                                {focusedTicket.visible_code}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                Estado:
                                            </span>
                                            {getEstadoBadge(
                                                focusedTicket.status.type,
                                            )}
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                Fecha:
                                            </span>
                                            <span>
                                                {new Date(
                                                    focusedTicket.created_at,
                                                ).toLocaleDateString('es-ES')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                Asignado a:
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="bg-blue-50 text-blue-700"
                                            >
                                                {
                                                    focusedTicket.attended_by
                                                        ?.name
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">
                                        Acciones Disponibles
                                    </h3>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start bg-transparent"
                                            onClick={() =>
                                                openViewModal(focusedTicket)
                                            }
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Ver Detalles Completos
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start bg-transparent"
                                            onClick={() =>
                                                openDeriveModal(focusedTicket)
                                            }
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Derivar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100"
                                            onClick={() =>
                                                openCloseModal(focusedTicket)
                                            }
                                        >
                                            <UserCheck className="h-4 w-4 mr-2" />
                                            Finalizar Ticket
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                // Vista normal con todos los tickets
                <>
                    {/* Estadísticas */}
                    {/* <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Espera</CardTitle>
                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketsEnEspera}</div>
                <p className="text-xs text-muted-foreground">Tickets pendientes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketsDisponibles}</div>
                <p className="text-xs text-muted-foreground">Sin asignar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cerrados</CardTitle>
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketsCerrados}</div>
                <p className="text-xs text-muted-foreground">Completados</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketsCancelados}</div>
                <p className="text-xs text-muted-foreground">Cancelados</p>
              </CardContent>
            </Card>
          </div> */}

                    {/* Búsqueda */}
                    <Searcher
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    ></Searcher>

                    {/* Tabs por categorías */}
                    <CategoryTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        ticketsData={ticketsData}
                        getFilteredTickets={getFilteredTickets}
                        openTakeModal={openTakeModal}
                        openViewModal={openViewModal}
                    ></CategoryTabs>
                </>
            )}

            {/* Modal Tomar Ticket */}
            <Dialog open={showTakeModal} onOpenChange={setShowTakeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tomar Ticket</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres tomar este ticket? Se
                            te asignará automáticamente.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>
                                    <strong>
                                        Código: {selectedTicket.visible_code}
                                    </strong>{' '}
                                </p>
                                <p>
                                    <strong>Solicitante:</strong>{' '}
                                    {`${selectedTicket.citizen?.names} 
                                    ${selectedTicket.citizen?.first_surname} 
                                    ${selectedTicket.citizen?.second_surname}`}
                                </p>
                                <p>
                                    <strong>Fecha:</strong>{' '}
                                    {new Date(
                                        selectedTicket.created_at,
                                    ).toLocaleDateString('es-ES')}
                                </p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowTakeModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleTakeTicket}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Tomar Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Ver Ticket */}
            <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detalles del Ticket</DialogTitle>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Código:</span>
                                    <span className="font-mono">
                                        {selectedTicket.visible_code}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Estado:</span>
                                    {getEstadoBadge(selectedTicket.status.type)}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Fecha:</span>
                                    <span>
                                        {new Date(
                                            selectedTicket.created_at,
                                        ).toLocaleDateString('es-ES')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        Solicitante:
                                    </span>
                                    <span>{`${selectedTicket.citizen.names} 
                                                ${selectedTicket.citizen?.first_surname}
                                                 ${selectedTicket.citizen?.second_surname}`}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        Asignado a:
                                    </span>
                                    {selectedTicket.attended_by ? (
                                        <Badge
                                            variant="outline"
                                            className="bg-blue-50 text-blue-700"
                                        >
                                            {selectedTicket.attended_by_id}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            Sin asignar
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setShowViewModal(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Cerrar Ticket */}
            <Dialog open={showCloseModal} onOpenChange={setShowCloseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Finalizar Ticket</DialogTitle>
                        <DialogDescription>
                            Completa la información para finalizar el ticket{' '}
                            {selectedTicket?.visible_code}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="estado-final">Estado Final</Label>
                            <Select
                                value={closeForm.estado}
                                onValueChange={(
                                    value: 'cerrado' | 'cancelado',
                                ) =>
                                    setCloseForm((prev) => ({
                                        ...prev,
                                        estado: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el estado final" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cerrado">
                                        Cerrado - Completado exitosamente
                                    </SelectItem>
                                    <SelectItem value="cancelado">
                                        Cancelado - No se pudo completar
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="comentario">Comentarios</Label>
                            <textarea
                                id="comentario"
                                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Describe qué se hizo para resolver el ticket o por qué se canceló..."
                                value={closeForm.comentario}
                                onChange={(e) =>
                                    setCloseForm((prev) => ({
                                        ...prev,
                                        comentario: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        {selectedTicket && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">
                                    Resumen del Ticket:
                                </h4>
                                <p>
                                    <strong>Código:</strong>{' '}
                                    {selectedTicket.visible_code}
                                </p>
                                <p>
                                    <strong>Solicitante:</strong>{' '}
                                    {`${selectedTicket.citizen.names} 
                                        ${selectedTicket.citizen?.first_surname}
                                     ${selectedTicket.citizen?.second_surname}`}
                                </p>
                                <p>
                                    <strong>Fecha:</strong>{' '}
                                    {new Date(
                                        selectedTicket.created_at,
                                    ).toLocaleDateString('es-ES')}
                                </p>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowCloseModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleCloseTicket}
                            disabled={
                                !closeForm.estado ||
                                !closeForm.comentario.trim()
                            }
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Finalizar Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Editar Ticket */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Ticket</DialogTitle>
                        <DialogDescription>
                            Modifica la información del ticket{' '}
                            {selectedTicket?.visible_code}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="solicitante">Solicitante</Label>
                            <Input
                                id="solicitante"
                                value={editForm.solicitante}
                                onChange={(e) =>
                                    setEditForm((prev) => ({
                                        ...prev,
                                        solicitante: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fecha">Fecha</Label>
                            <Input
                                id="fecha"
                                type="date"
                                value={editForm.fecha}
                                onChange={(e) =>
                                    setEditForm((prev) => ({
                                        ...prev,
                                        fecha: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Select
                                value={editForm.estado}
                                onValueChange={(
                                    value:
                                        | 'en espera'
                                        | 'cancelado'
                                        | 'cerrado',
                                ) =>
                                    setEditForm((prev) => ({
                                        ...prev,
                                        estado: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en espera">
                                        En Espera
                                    </SelectItem>
                                    <SelectItem value="cerrado">
                                        Cerrado
                                    </SelectItem>
                                    <SelectItem value="cancelado">
                                        Cancelado
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowEditModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleEditTicket}>
                            Guardar Cambios
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Eliminar Ticket */}
            <AlertDialog
                open={showDeleteModal}
                onOpenChange={setShowDeleteModal}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Eliminar Ticket
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que quieres eliminar el ticket{' '}
                            <strong>{selectedTicket?.codigo}</strong>? Esta
                            acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteTicket}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
