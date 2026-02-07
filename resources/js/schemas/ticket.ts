import { z } from 'zod';

// Schema para normalizar datos de ticket que vienen del backend
export const TicketSchema = z.object({
    id: z.coerce.number(),
    code: z.string(),
    visible_code: z.string(),
    area_id: z.coerce.number(),
    citizen_id: z.coerce.number(),
    registered_by_id: z.coerce.number(),
    attended_by_id: z.coerce.number().nullable(),
    status_id: z.coerce.number(),
    time_admission: z.string().nullable(),
    time_departure: z.string().nullable(),
    called_at: z.string().nullable().optional(),
    called_by_id: z.coerce.number().nullable().optional(),
    observations: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    
    // Relaciones (opcionales si vienen pobladas)
    area: z.any().optional(),
    citizen: z.any().optional(),
    status: z.any().optional(),
    registered_by: z.any().optional(),
    attended_by: z.any().optional().nullable(),
    called_by: z.any().optional().nullable(),
});

// Schema para datos que envías al backend (para update)
export const TicketUpdateSchema = z.object({
    ticket: z.object({
        id: z.coerce.number(),
        code: z.string(),
        visible_code: z.string(),
        area_id: z.coerce.number(),
        citizen_id: z.coerce.number(),
        registered_by_id: z.coerce.number(),
        status_id: z.coerce.number().optional(),
        attended_by_id: z.coerce.number().optional().nullable(),
        time_admission: z.string().optional().nullable(),
        time_departure: z.string().optional().nullable(),
        observations: z.string().optional().nullable(),
        updated_at: z.string(), // Para optimistic locking
    })
});

// Schema para Area
export const AreaSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
    description: z.string(),
    short_name: z.string(),
    parent_id: z.coerce.number().nullable(),
    children: z.array(z.any()).default([]),
    code: z.string(),
    type_id: z.coerce.number(),
    is_active: z.coerce.number(),
});

// Tipos inferidos de los schemas
export type Ticket = z.infer<typeof TicketSchema>;
export type TicketUpdate = z.infer<typeof TicketUpdateSchema>;
export type Area = z.infer<typeof AreaSchema>;
