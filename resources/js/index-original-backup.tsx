'use client';

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { route } from 'ziggy-js';

import { useTicketEcho } from '@/hooks/useMultipleEcho';
import { useTicketActions } from '@/hooks/useTicketActions';

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
import { AvaibleTicketTypesT, Ticket, TicketStatusTypeT } from '@/types/general';
import Searcher from './components/searcher';
import CategoryTabs from './components/category-tabs';
import TicketPageHeader from './components/TicketPageHeader';
import ActiveTicketBanner from './components/ActiveTicketBanner';
import TicketFocusedView from './components/TicketFocusedView';
import ActiveTicketMessage from './components/ActiveTicketMessage';
import axios from 'axios';
import { normalizeTicket } from '@/hooks/useZodNormalizer';

// Tipo para los tickets

export default function Component({ ...props }) {
    const {
        auth: { user },
        tickets,
        ticketTypes,
        userHasActiveTicket = false,
        activeTicket = null,
    } = props;

    const [ticketsData, setTicketsData] = useState<Ticket[]>(tickets);
    const [hasActiveTicket, setHasActiveTicket] = useState(userHasActiveTicket);
    const [currentActiveTicket, setCurrentActiveTicket] = useState(activeTicket);

    // Handle ticket creation callback
    const handleTicketCreated = (e: { ticket: Ticket }) => {
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
    };

    // Handle ticket update callback
    const handleTicketUpdated = (e: { ticket: Ticket }) => {
        console.log({ 'updated-ticket': e });
        setTicketsData((prevTickets) =>
            prevTickets.map((prevTicket) => {
                return prevTicket.id === e.ticket.id ? e.ticket : prevTicket;
            }),
        );
    };

    // Use the custom hook for handling multiple Echo channels
    const {
        listen: listenToTicketChannels,
        stopListening: stopListeningToTicketChannels,
    } = useTicketEcho(user.area.id, handleTicketCreated, handleTicketUpdated);

    useEffect(() => {
        listenToTicketChannels();
        return () => {
            stopListeningToTicketChannels();
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
    const [showReleaseModal, setShowReleaseModal] = useState(false);

    // Set focused ticket if user has an active ticket
    useEffect(() => {
        if (hasActiveTicket && currentActiveTicket && !focusedTicket) {
            setFocusedTicket(currentActiveTicket);
        }
    }, [hasActiveTicket, currentActiveTicket, focusedTicket]);

    // Hook for ticket actions
    const { handleTakeTicket, handleCloseTicket, handleReleaseTicket } = useTicketActions({
        user,
        ticketTypes,
        setTicketsData,
        setFocusedTicket,
        setHasActiveTicket,
        setCurrentActiveTicket
    });
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

        // get current time server
        const resRaw = await fetch(route('clock.server-time'));
        const response = await resRaw.json();
        // update ticket with new status and attended_by_id
        if (selectedTicket) {
            const ticket: Ticket = {
                ...selectedTicket,
                attended_by_id: user?.id,
                status: ticketType,
                status_id: ticketType.id,
                time_admission: response.server_time,
            };

            try {
                const res = await axios.put(
                    route('tickets.update'),
                    {
                        ticket: normalizeTicket(ticket),
                    }
                );
                setTicketsData((prev) =>
                    prev.map((t) =>
                        t.id === selectedTicket.id ? res.data.ticket : t,
                    ),
                );
                setFocusedTicket(res.data.ticket);
                setShowTakeModal(false);
                setSelectedTicket(null);
                
                // Update active ticket state
                setHasActiveTicket(true);
                setCurrentActiveTicket(res.data.ticket);
                console.log({ 'response/tickets.update': res });
            } catch (error: any) {
                if (error.response?.status === 409) {
                    // Optimistic locking conflict
                    alert('Este ticket ya fue tomado por otro usuario. La página se actualizará.');
                    window.location.reload(); // Recargar para obtener datos actualizados
                } else {
                    console.log({ error });
                    alert('Error al tomar el ticket. Por favor intente nuevamente.');
                }
            }

            //end fetch
        }
    };

    // Function to release a ticket (change status back to "en espera" and remove attended_by_id)
    const handleReleaseTicket = async () => {
        if (!focusedTicket) return;

        // Validate that only the user who took the ticket can release it
        if (focusedTicket.attended_by_id != user?.id) {
            console.log({
                attended_by_id: focusedTicket.attended_by_id,
                user_id: user?.id,
            });
            console.error('Only the user who took the ticket can release it');
            return;
        }

        // Find ticket type for 'en espera' status
        const ticketType = findTicketTypeForType('en espera');

        if (!ticketType) {
            console.error('Ticket type "en espera" not found');
            return;
        }

        // Update ticket: remove assignment and change status back to "en espera"
        const updatedTicket: Ticket = {
            ...focusedTicket,
            attended_by_id: null,
            status: ticketType,
            status_id: ticketType.id,
            time_admission: null,
        };

        const ticket = normalizeTicket(updatedTicket);

        try {
            const res = await axios.put(route('tickets.update'), {
                ticket,
            });

            // Update local state
            setTicketsData((prev) =>
                prev.map((ticket) =>
                    ticket.id === focusedTicket.id ? res.data.ticket : ticket,
                ),
            );

            // Clear focused ticket and close modal
            setFocusedTicket(null);
            setShowReleaseModal(false);
            
            // If this was the user's active ticket, update the active ticket state
            if (currentActiveTicket?.id === focusedTicket.id) {
                setHasActiveTicket(false);
                setCurrentActiveTicket(null);
                // Reload page to show all tickets again
                window.location.reload();
            }

            console.log({ 'response/tickets.release': res });
        } catch (error) {
            console.error('Error releasing ticket:', error);
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
            // Show confirmation modal before releasing the ticket
            setShowReleaseModal(true);
        }
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

            {/* Banner cuando el usuario tiene un ticket activo */}
            {hasActiveTicket && currentActiveTicket && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <h3 className="font-semibold text-orange-800">
                                            Tienes un ticket en atención
                                        </h3>
                                        <p className="text-sm text-orange-600">
                                            Ticket {currentActiveTicket.visible_code} - {currentActiveTicket.citizen?.names} {currentActiveTicket.citizen?.first_surname}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setFocusedTicket(currentActiveTicket);
                                    setSelectedTicket(currentActiveTicket);
                                    setShowViewModal(true);
                                }}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Ticket
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

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

            {/* Mostrar mensaje cuando tiene ticket activo pero no hay focused ticket */}
            {hasActiveTicket && !focusedTicket && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <div className="text-muted-foreground">
                                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                                <h3 className="text-lg font-semibold">
                                    Tienes un ticket en atención
                                </h3>
                                <p>
                                    Para ver otros tickets debes finalizar el ticket actual.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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

            {/* Modal Liberar Ticket */}
            <Dialog open={showReleaseModal} onOpenChange={setShowReleaseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Liberar Ticket</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres liberar este ticket? El
                            ticket volverá al estado "en espera" y otros
                            usuarios podrán tomarlo.
                        </DialogDescription>
                    </DialogHeader>
                    {focusedTicket && (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>
                                    <strong>
                                        Código: {focusedTicket.visible_code}
                                    </strong>
                                </p>
                                <p>
                                    <strong>Solicitante:</strong>{' '}
                                    {`${focusedTicket.citizen?.names} 
                                    ${focusedTicket.citizen?.first_surname} 
                                    ${focusedTicket.citizen?.second_surname}`}
                                </p>
                                <p>
                                    <strong>Estado actual:</strong>{' '}
                                    <Badge variant="secondary">
                                        {focusedTicket.status?.type}
                                    </Badge>
                                </p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowReleaseModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleReleaseTicket}
                            className="bg-orange-600 hover:bg-orange-700"
                        >
                            Liberar Ticket
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
