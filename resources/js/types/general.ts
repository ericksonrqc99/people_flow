export type AreaT = {
    id: string;
    name: string;
    description: string;
    short_name: string;
    parent_id: string | null;
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
export type Ticket = {
    id: number | string;
    code: string;
    visible_code: string;
    area: AreaT;
    citizen: CitizenT;
    status: TicketStatusTypeT;
    status_id: number;
    registered_by: User;
    attended_by?: User;
    attended_by_id?: string;
    time_admision: string;
    time_departure: string;
    observations: string;
    created_at: string;
    updated_at: string;
};
export type User = {
    id: number;
    name?: string;
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
