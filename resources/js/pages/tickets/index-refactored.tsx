'use client';

import { useEffect, useRef, useState } from 'react';
import { useTicketEcho } from '@/hooks/useMultipleEcho';
import { useTicketActions } from '@/hooks/useTicketActions';
import { AvaibleTicketTypesT, Ticket, TicketStatusTypeT } from '@/types/general';

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
    } = props;
    const userFullName = user?.name || 'Usuario';
    const userDisplayName = user?.display_name || user?.name || 'el módulo';

    // State
    const [ticketsData, setTicketsData] = useState<Ticket[]>(tickets);
    const [hasActiveTicket, setHasActiveTicket] = useState(userHasActiveTicket);
    const [currentActiveTicket, setCurrentActiveTicket] = useState(activeTicket);
    const [focusedTicket, setFocusedTicket] = useState<Ticket | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('todos');

    // Modals state
    const [showTakeModal, setShowTakeModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [showReleaseModal, setShowReleaseModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Form state
    const [closeForm, setCloseForm] = useState({
        estado: '' as 'cerrado' | 'cancelado',
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

    const notificationSound = useRef<HTMLAudioElement | null>(null);

    // Ticket actions hook
    const { handleTakeTicket, handleCloseTicket, handleReleaseTicket } = useTicketActions({
        user,
        ticketTypes,
        setTicketsData,
        setFocusedTicket,
        setHasActiveTicket,
        setCurrentActiveTicket
    });

    // Handle ticket creation/update callbacks
    const handleTicketCreated = (e: { ticket: Ticket }) => {
        setTicketsData((prevTickets) => [e.ticket, ...prevTickets]);
        if (notificationSound.current) {
            notificationSound.current.play().catch((error) => {
                console.error('No se pudo reproducir el sonido:', error);
            });
        }
    };

    const handleTicketUpdated = (e: { ticket: Ticket }) => {
        setTicketsData((prevTickets) =>
            prevTickets.map((prevTicket) => {
                return prevTicket.id === e.ticket.id ? e.ticket : prevTicket;
            }),
        );
    };

    // Echo setup
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

    // Set focused ticket if user has an active ticket
    useEffect(() => {
        if (hasActiveTicket && currentActiveTicket && !focusedTicket) {
            setFocusedTicket(currentActiveTicket);
        }
    }, [hasActiveTicket, currentActiveTicket, focusedTicket]);

    // Filter tickets
    const getFilteredTickets = () => {
        return ticketsData.filter((ticket) => {
            const matchesSearch = ticket.citizen?.names?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.citizen?.document_number?.includes(searchTerm) ||
                ticket.visible_code?.toLowerCase().includes(searchTerm.toLowerCase());

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
                setCloseForm({ estado: '' as 'cerrado' | 'cancelado', comentario: '' });
            }
        }
    };

    const onReleaseTicket = async () => {
        if (focusedTicket) {
            const result = await handleReleaseTicket(focusedTicket, currentActiveTicket);
            if (result?.success) {
                setShowReleaseModal(false);
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
        <div className="container mx-auto p-6 space-y-6">
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
                voiceEnabled={true}
                onToggleVoice={() => {}}
            />

            {/* Active Ticket Banner */}
            {hasActiveTicket && currentActiveTicket && (
                <ActiveTicketBanner 
                    currentActiveTicket={currentActiveTicket}
                    onViewTicket={onViewActiveTicket}
                />
            )}

            {/* Main Content */}
            {focusedTicket ? (
                <TicketFocusedView 
                    ticket={focusedTicket}
                    onBack={() => setFocusedTicket(null)}
                    onEdit={() => setShowEditModal(true)}
                    onClose={() => setShowCloseModal(true)}
                    onRelease={() => setShowReleaseModal(true)}
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
            />
        </div>
    );
}
