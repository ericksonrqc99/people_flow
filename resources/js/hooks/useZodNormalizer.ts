import {
    TicketSchema,
    TicketUpdateSchema,
    AreaSchema,
} from '../schemas/ticket';
import type { Ticket, Area, TicketUpdate } from '../schemas/ticket';

/**
 * Hook para normalizar datos usando Zod schemas
 */
export const useZodNormalizer = () => {
    const normalizeTicket = (data: any): Ticket => {
        try {
            return TicketSchema.parse(data);
        } catch (error) {
            console.error('Error normalizing ticket:', error);
            throw new Error('Invalid ticket data received from server');
        }
    };

    const normalizeTickets = (data: any[]): Ticket[] => {
        return data.map((ticket) => normalizeTicket(ticket));
    };

    const normalizeArea = (data: any): Area => {
        try {
            return AreaSchema.parse(data);
        } catch (error) {
            console.error('Error normalizing area:', error);
            throw new Error('Invalid area data received from server');
        }
    };

    const normalizeAreas = (data: any[]): Area[] => {
        return data.map((area) => normalizeArea(area));
    };

    const prepareTicketUpdate = (data: any): TicketUpdate => {
        try {
            return TicketUpdateSchema.parse(data);
        } catch (error) {
            console.error('Error preparing ticket update:', error);
            throw new Error('Invalid ticket update data');
        }
    };

    return {
        normalizeTicket,
        normalizeTickets,
        normalizeArea,
        normalizeAreas,
        prepareTicketUpdate,
    };
};

// Export directo de las funciones para uso sin hook
export const normalizeTicket = (data: any): Ticket => TicketSchema.parse(data);
export const normalizeTickets = (data: any[]): Ticket[] =>
    data.map(normalizeTicket);
export const normalizeArea = (data: any): Area => AreaSchema.parse(data);
export const normalizeAreas = (data: any[]): Area[] => data.map(normalizeArea);
export const prepareTicketUpdate = (data: any): TicketUpdate =>
    TicketUpdateSchema.parse(data);
