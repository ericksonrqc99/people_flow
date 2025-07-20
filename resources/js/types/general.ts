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
    dni: string;
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

export type CitizenResponseErrorT = {
    ok: false;
    message: string;
};
