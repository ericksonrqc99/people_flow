import { useState } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';
import { Ticket, AvaibleTicketTypesT, TicketStatusTypeT } from '@/types/general';
import { normalizeTicket } from '@/hooks/useZodNormalizer';

interface UseTicketActionsProps {
    user: any;
    ticketTypes: TicketStatusTypeT[];
    setTicketsData: React.Dispatch<React.SetStateAction<Ticket[]>>;
    setFocusedTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
    setHasActiveTicket: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentActiveTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}

export const useTicketActions = ({
    user,
    ticketTypes,
    setTicketsData,
    setFocusedTicket,
    setHasActiveTicket,
    setCurrentActiveTicket
}: UseTicketActionsProps) => {
    
    // Find ticket type by type name
    const findTicketTypeForType = (typeName: AvaibleTicketTypesT) => {
        return ticketTypes.find((type: TicketStatusTypeT) => type.type === typeName);
    };

    // Handle take ticket
    const handleTakeTicket = async (selectedTicket: Ticket) => {
        const ticketType = findTicketTypeForType('atendiendo');
        if (!ticketType) {
            console.error('Ticket type not found for: atendiendo');
            return { success: false, error: 'Ticket type not found' };
        }

        // Get current time server
        const resRaw = await fetch(route('clock.server-time'));
        const response = await resRaw.json();
        
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
                
                // Update active ticket state
                setHasActiveTicket(true);
                setCurrentActiveTicket(res.data.ticket);
                
                console.log({ 'response/tickets.update': res });
                return { success: true };
            } catch (error: any) {
                if (error.response?.status === 409) {
                    // Optimistic locking conflict
                    alert('Este ticket ya fue tomado por otro usuario. La página se actualizará.');
                    window.location.reload();
                } else {
                    console.log({ error });
                    alert('Error al tomar el ticket. Por favor intente nuevamente.');
                }
                return { success: false, error };
            }
        }
        return { success: false };
    };

    // Handle close ticket
    const handleCloseTicket = async (focusedTicket: Ticket, closeForm: any) => {
        if (!focusedTicket) return;

        const ticketType = findTicketTypeForType(closeForm.estado);
        if (!ticketType) {
            console.error('Ticket type not found for:', closeForm.estado);
            return;
        }

        // Get current time server for time_departure
        const resRaw = await fetch(route('clock.server-time'));
        const response = await resRaw.json();

        try {
            const ticket: Ticket = {
                ...focusedTicket,
                status: ticketType,
                status_id: ticketType.id,
                time_departure: response.server_time,
                observations: closeForm.comentario,
            };

            const res = await axios.put(route('tickets.update'), {
                ticket: normalizeTicket(ticket),
            });

            // Update local state
            setTicketsData((prev) =>
                prev.map((ticket) =>
                    ticket.id === focusedTicket.id ? res.data.ticket : ticket,
                ),
            );

            // Clear focused ticket and update active ticket state
            setFocusedTicket(null);
            
            // If this was the user's active ticket, clear the active ticket state
            setHasActiveTicket(false);
            setCurrentActiveTicket(null);
            
            return { success: true };
        } catch (error) {
            console.error('Error closing ticket:', error);
            return { success: false, error };
        }
    };

    // Handle release ticket
    const handleReleaseTicket = async (focusedTicket: Ticket, currentActiveTicket: Ticket | null) => {
        if (!focusedTicket) return;

        const ticketType = findTicketTypeForType('en espera');
        if (!ticketType) {
            console.error('Ticket type not found for: en espera');
            return;
        }

        try {
            const ticket: Ticket = {
                ...focusedTicket,
                attended_by_id: null,
                status: ticketType,
                status_id: ticketType.id,
                time_admission: null,
            };

            const res = await axios.put(route('tickets.update'), {
                ticket: normalizeTicket(ticket),
            });

            // Update local state
            setTicketsData((prev) =>
                prev.map((ticket) =>
                    ticket.id === focusedTicket.id ? res.data.ticket : ticket,
                ),
            );

            // Clear focused ticket
            setFocusedTicket(null);
            
            // If this was the user's active ticket, update the active ticket state
            if (currentActiveTicket?.id === focusedTicket.id) {
                setHasActiveTicket(false);
                setCurrentActiveTicket(null);
                // Reload page to show all tickets again
                window.location.reload();
            }

            console.log({ 'response/tickets.release': res });
            return { success: true };
        } catch (error) {
            console.error('Error releasing ticket:', error);
            return { success: false, error };
        }
    };

    return {
        handleTakeTicket,
        handleCloseTicket,
        handleReleaseTicket,
        findTicketTypeForType
    };
};
