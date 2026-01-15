'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';
import { useTicketEcho } from '@/hooks/useMultipleEcho';
import { useTicketActions } from '@/hooks/useTicketActions';
import { Ticket } from '@/types/general';
import { TicketSchema } from '@/schemas/ticket';

// Components
import TicketPageHeader from './components/TicketPageHeader';
import ActiveTicketBanner from './components/ActiveTicketBanner';
import TicketFocusedView from './components/TicketFocusedView';
import ActiveTicketMessage from './components/ActiveTicketMessage';
import Searcher from './components/searcher';
import CategoryTabs from './components/CategoryTabs';
import TicketModals from './components/TicketModals';

export default function TicketsPage({ ...props }) {
    const {
        auth: { user },
        tickets,
        ticketTypes,
        userHasActiveTicket = false,
        activeTicket = null,
        areas = [],
    } = props;
    const userFullName = user?.name || 'Usuario';
    const userDisplayName = user?.display_name || user?.name || 'el módulo';

    // State
    const [ticketsData, setTicketsData] = useState<Ticket[]>(() => {
        // Normalizar tickets con Zod al inicializar
        return tickets.map((ticket: any) => TicketSchema.parse(ticket));
    });
    const [hasActiveTicket, setHasActiveTicket] = useState(userHasActiveTicket);
    const [currentActiveTicket, setCurrentActiveTicket] = useState(() => {
        // Normalizar ticket activo si existe
        return activeTicket ? TicketSchema.parse(activeTicket) : null;
    });
    const [focusedTicket, setFocusedTicket] = useState<Ticket | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('en espera');

    // Modals state
    const [showTakeModal, setShowTakeModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [showReleaseModal, setShowReleaseModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeriveModal, setShowDeriveModal] = useState(false);

    // Form state
    const [closeForm, setCloseForm] = useState({
        estado: 'cerrado' as 'cerrado' | 'cancelado',
        comentario: '',
    });
    const [editForm, setEditForm] = useState({
        codigo: '',
        area: '',
        ciudadano: '',
        estado: '',
        fecha: '',
        comentario: '',
    });
    const [deriveForm, setDeriveForm] = useState({
        toAreaId: '',
        reason: '',
    });

    const notificationSound = useRef<HTMLAudioElement | null>(null);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true;
        const saved = localStorage.getItem('ticketsVoiceEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    // Ticket actions hook
    const { handleTakeTicket, handleCloseTicket, handleReleaseTicket } =
        useTicketActions({
            user,
            ticketTypes,
            setTicketsData,
            setFocusedTicket,
            setHasActiveTicket,
            setCurrentActiveTicket,
        });

    // Handle ticket creation/update callbacks
    const handleTicketCreated = (e: { ticket: any }) => {
        console.log('llego handleTicketCreated');

        const normalizedTicket = TicketSchema.parse(e.ticket);
        setTicketsData((prevTickets) => [normalizedTicket, ...prevTickets]);
        if (notificationSound.current) {
            notificationSound.current.play().catch((error) => {
                console.error('No se pudo reproducir el sonido:', error);
            });
        }
    };

    const handleTicketUpdated = (e: { ticket: any }) => {
        const normalizedTicket = TicketSchema.parse(e.ticket);
        setTicketsData((prevTickets) =>
            prevTickets.map((prevTicket) => {
                return prevTicket.id === normalizedTicket.id
                    ? normalizedTicket
                    : prevTicket;
            }),
        );
    };

    const handleTicketDerived = (e: {
        ticket: any;
        fromAreaId: number;
        reason: string;
        derivedByUserId: number;
    }) => {
        const normalizedTicket = TicketSchema.parse(e.ticket);
        // Add the derived ticket to our area
        setTicketsData((prevTickets) => [normalizedTicket, ...prevTickets]);

        // Show notification
        if (notificationSound.current) {
            notificationSound.current.play().catch(console.error);
        }

        console.log('Ticket derivado recibido:', {
            ticket: normalizedTicket,
            fromAreaId: e.fromAreaId,
            reason: e.reason,
        });
    };

    // Echo setup
    const {
        listen: listenToTicketChannels,
        stopListening: stopListeningToTicketChannels,
    } = useTicketEcho(
        user.area.id,
        handleTicketCreated,
        handleTicketUpdated,
        handleTicketDerived,
    );

    useEffect(() => {
        listenToTicketChannels();
        return () => {
            stopListeningToTicketChannels();
        };
    }, []);

    // Set focused ticket if user has an active ticket
    useEffect(() => {
        if (hasActiveTicket && currentActiveTicket && !focusedTicket) {
            setFocusedTicket(currentActiveTicket);
        }
    }, [hasActiveTicket, currentActiveTicket, focusedTicket]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('ticketsVoiceEnabled', JSON.stringify(isVoiceEnabled));
    }, [isVoiceEnabled]);

    // Filter tickets
    const getFilteredTickets = () => {
        return ticketsData.filter((ticket) => {
            const fullName = [
                ticket.citizen?.names,
                ticket.citizen?.first_surname,
                ticket.citizen?.second_surname,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            const searchLower = searchTerm.toLowerCase();

            const matchesSearch =
                fullName.includes(searchLower) ||
                String(ticket.citizen?.document_number || '').includes(
                    searchTerm,
                ) ||
                ticket.visible_code?.toLowerCase().includes(searchLower);

            let matchesEstado = true;
            if (activeTab !== 'todos') {
                matchesEstado = ticket.status?.type === activeTab;
            }

            return matchesSearch && matchesEstado;
        });
    };

    // Modal handlers
    const openTakeModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setShowTakeModal(true);
    };

    const openViewModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setShowViewModal(true);
    };

    const handleCallTicket = async (ticket: Ticket) => {
        const code = ticket.visible_code ?? '';
        const message = `Ticket ${code}, pasar con ${userDisplayName}. Ticket ${code}, pasar con ${userDisplayName}`;

        if (isVoiceEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
            const synth = window.speechSynthesis;
            const speakMessage = () => {
                const utterance = new SpeechSynthesisUtterance(message);
                utterance.lang = 'es-PE';
                utterance.rate = 0.9;
                utterance.pitch = 1.05;
                utterance.volume = 1;

                const voices = synth.getVoices();
                const esVoice =
                    voices.find((voice) =>
                        /google|microsoft|natural|neural/i.test(voice.name),
                    ) ||
                    voices.find((voice) => voice.lang?.toLowerCase().startsWith('es')) ||
                    voices[0];
                if (esVoice) {
                    utterance.voice = esVoice;
                }

                synth.cancel();
                setTimeout(() => {
                    synth.speak(utterance);
                    if (synth.paused) {
                        synth.resume();
                    }
                }, 150);
            };

            if (synth.getVoices().length === 0) {
                const previousHandler = synth.onvoiceschanged;
                synth.onvoiceschanged = () => {
                    speakMessage();
                    synth.onvoiceschanged = previousHandler ?? null;
                };
            } else {
                speakMessage();
            }
        }

        try {
            const res = await axios.post(route('tickets.call'), {
                ticket_id: ticket.id,
            });

            if (res.data?.ticket) {
                setTicketsData((prev) =>
                    prev.map((t) => (t.id === ticket.id ? res.data.ticket : t)),
                );
            }
        } catch (error) {
            console.error('Error al llamar ticket:', error);
        }
    };

    const handleStopCallTicket = async (ticket: Ticket) => {
        try {
            const res = await axios.post(route('tickets.uncall'), {
                ticket_id: ticket.id,
            });

            if (res.data?.ticket) {
                setTicketsData((prev) =>
                    prev.map((t) => (t.id === ticket.id ? res.data.ticket : t)),
                );
            }
        } catch (error) {
            console.error('Error al liberar ticket llamado:', error);
        }
    };

    // Action handlers with proper signatures
    const onTakeTicket = async () => {
        if (selectedTicket) {
            const result = await handleTakeTicket(selectedTicket);
            if (result?.success) {
                setShowTakeModal(false);
                setSelectedTicket(null);
            }
        }
    };

    const onCloseTicket = async () => {
        if (focusedTicket) {
            const result = await handleCloseTicket(focusedTicket, closeForm);
            if (result?.success) {
                setShowCloseModal(false);
                setCloseForm({
                    estado: 'cerrado' as 'cerrado' | 'cancelado',
                    comentario: '',
                });
            }
        }
    };

    const onReleaseTicket = async () => {
        if (focusedTicket) {
            const result = await handleReleaseTicket(
                focusedTicket,
                currentActiveTicket,
            );
            if (result?.success) {
                setShowReleaseModal(false);
            }
        }
    };

    const onDeriveTicket = async () => {
        if (focusedTicket && deriveForm.toAreaId && deriveForm.reason.trim()) {
            try {
                const response = await axios.post(route('tickets.derive'), {
                    ticket_id: focusedTicket.id,
                    to_area_id: parseInt(deriveForm.toAreaId),
                    reason: deriveForm.reason,
                });

                const result = response.data;

                if (result.ok) {
                    setShowDeriveModal(false);
                    setDeriveForm({ toAreaId: '', reason: '' });

                    // Remove ticket from current area since it was derived
                    setTicketsData((prevTickets) =>
                        prevTickets.filter(
                            (ticket) => ticket.id !== focusedTicket.id,
                        ),
                    );

                    // Clear focused ticket since it's no longer in this area
                    setFocusedTicket(null);
                    setHasActiveTicket(false);
                    setCurrentActiveTicket(null);

                    console.log('Ticket derivado exitosamente');
                } else {
                    alert(result.message || 'Error al derivar el ticket');
                }
            } catch (error) {
                console.error('Error derivando ticket:', error);
                alert(
                    'Error al derivar el ticket. Por favor intente nuevamente.',
                );
            }
        }
    };

    const onViewActiveTicket = () => {
        if (currentActiveTicket) {
            setFocusedTicket(currentActiveTicket);
            setSelectedTicket(currentActiveTicket);
            setShowViewModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Audio */}
                <audio
                    ref={notificationSound}
                    src="/assets/sounds/notification-new-ticket.mp3"
                    preload="auto"
                />

                {/* Header */}
                <TicketPageHeader
                    userName={userFullName}
                    displayName={userDisplayName}
                    areaName={user.area?.name}
                    voiceEnabled={isVoiceEnabled}
                    onToggleVoice={() => setIsVoiceEnabled((prev) => !prev)}
                />

                {/* Active Ticket Banner - solo mostrar si no hay focused ticket */}
                {hasActiveTicket && currentActiveTicket && !focusedTicket && (
                    <ActiveTicketBanner
                        currentActiveTicket={currentActiveTicket}
                        onViewTicket={onViewActiveTicket}
                    />
                )}

                {/* Main Content */}
                {focusedTicket ? (
                    <TicketFocusedView
                        ticket={focusedTicket}
                        onClose={() => setShowCloseModal(true)}
                        onRelease={() => setShowReleaseModal(true)}
                        onDerive={() => setShowDeriveModal(true)}
                    />
                ) : hasActiveTicket && !focusedTicket ? (
                    <ActiveTicketMessage />
                ) : (
                    <>
                        <Searcher
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                        <CategoryTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            ticketsData={ticketsData}
                            getFilteredTickets={getFilteredTickets}
                            openTakeModal={openTakeModal}
                            openViewModal={openViewModal}
                            onCallTicket={handleCallTicket}
                            onStopCallTicket={handleStopCallTicket}
                        />
                    </>
                )}

                {/* Modals */}
                <TicketModals
                    // Take Modal
                    showTakeModal={showTakeModal}
                    setShowTakeModal={setShowTakeModal}
                    selectedTicket={selectedTicket}
                    onTakeTicket={onTakeTicket}
                    // View Modal
                    showViewModal={showViewModal}
                    setShowViewModal={setShowViewModal}
                    // Close Modal
                    showCloseModal={showCloseModal}
                    setShowCloseModal={setShowCloseModal}
                    closeForm={closeForm}
                    setCloseForm={setCloseForm}
                    onCloseTicket={onCloseTicket}
                    // Release Modal
                    showReleaseModal={showReleaseModal}
                    setShowReleaseModal={setShowReleaseModal}
                    onReleaseTicket={onReleaseTicket}
                    // Edit Modal
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    editForm={editForm}
                    setEditForm={setEditForm}
                    focusedTicket={focusedTicket}
                    setFocusedTicket={setFocusedTicket}
                    // Delete Modal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    // Derive Modal
                    showDeriveModal={showDeriveModal}
                    setShowDeriveModal={setShowDeriveModal}
                    deriveForm={deriveForm}
                    setDeriveForm={setDeriveForm}
                    onDeriveTicket={onDeriveTicket}
                    areas={areas}
                />
            </div>
        </div>
    );
}
