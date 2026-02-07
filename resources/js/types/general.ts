// Import Zod types
export type { Ticket, Area } from '../schemas/ticket';

export type AreaT = {
    id: number;
    name: string;
    description: string;
    short_name: string;
    parent_id: number | null;
    children: AreaT[];
    code: string;
    type_id: 0 | 1 | 2 | 3 | 4;
    is_active: 1 | 0;
};

export type TicketGeneratorT = {
    areas: AreaT[];
};

export type CitizenT = {
    ok: boolean;
    names: string;
    departamet: string;
    province: string;
    district: string;
    address: string;
    first_surname: string;
    second_surname: string;
    document_number: string;
    message: string;
};

export type CitizenResponseT = {
    ok: boolean;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCompleto: string;
    numeroDocumento: string;
};
export type User = {
    id: number;
    name?: string;
    display_name?: string;
    email?: string;
    area_id?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
};

export type TicketStatusTypeT = {
    id: number;
    type: AvaibleTicketTypesT;
    description: string;
    model: string;
};

export type AvaibleTicketTypesT =
    | 'atendiendo'
    | 'cerrado'
    | 'cancelado'
    | 'en espera';

export type CitizenResponseErrorT = {
    ok: false;
    message: string;
};
