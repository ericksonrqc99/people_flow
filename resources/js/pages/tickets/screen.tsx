'use client';

import { useEffect, useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import GuestLayout from '@/layouts/guest-layout';
import { Area, Ticket } from '@/schemas/ticket';
import { TicketSchema } from '@/schemas/ticket';
import { useTicketEcho } from '@/hooks/useMultipleEcho';

type Props = {
    areas: Area[];
    area: Area | null;
    activeTicket: Ticket | null;
    waitingTickets: Ticket[];
    calledTickets: Ticket[];
    lastCaller: { name?: string; display_name?: string } | null;
};

const getCitizenName = (ticket: Ticket | null) => {
    if (!ticket?.citizen) return '---';
    const names = [
        ticket.citizen?.names,
        ticket.citizen?.first_surname,
        ticket.citizen?.second_surname,
    ]
        .filter(Boolean)
        .join(' ');
    return names || '---';
};

export default function TicketScreen({
    areas,
    area,
    activeTicket,
    waitingTickets,
    calledTickets,
    lastCaller,
}: Props) {
    const [activeTicketState, setActiveTicketState] = useState<Ticket | null>(
        activeTicket ? TicketSchema.parse(activeTicket) : null,
    );
    const [waitingTicketsState, setWaitingTicketsState] = useState<Ticket[]>(
        waitingTickets.map((ticket) => TicketSchema.parse(ticket)),
    );
    const [calledTicketsState, setCalledTicketsState] = useState<Ticket[]>(
        calledTickets.map((ticket) => TicketSchema.parse(ticket)),
    );
    const [highlightedCalledIds, setHighlightedCalledIds] = useState<number[]>([]);
    useEffect(() => {
        setActiveTicketState(activeTicket ? TicketSchema.parse(activeTicket) : null);
        setWaitingTicketsState(
            waitingTickets.map((ticket) => TicketSchema.parse(ticket)),
        );
        setCalledTicketsState(
            calledTickets.map((ticket) => TicketSchema.parse(ticket)),
        );
    }, [activeTicket, waitingTickets, calledTickets, lastCaller, area?.id]);


    const isCalling = Boolean(activeTicketState);
    const sortedAreas = useMemo(
        () =>
            [...areas].sort((a, b) =>
                a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }),
            ),
        [areas],
    );

    const handleTicketCreated = (e: { ticket: Ticket }) => {
        const ticket = TicketSchema.parse(e.ticket);

        if (ticket.status?.type === 'en espera' && !ticket.called_at) {
            setWaitingTicketsState((prev) => {
                const exists = prev.some((t) => t.id === ticket.id);
                return exists ? prev : [ticket, ...prev];
            });
        }
    };

    const handleTicketUpdated = (e: { ticket: Ticket }) => {
        const ticket = TicketSchema.parse(e.ticket);

        if (ticket.status?.type === 'atendiendo') {
            setActiveTicketState(ticket);
        } else {
            setActiveTicketState((prev) => (prev?.id === ticket.id ? null : prev));
        }

        setWaitingTicketsState((prev) => {
            const filtered = prev.filter((t) => t.id !== ticket.id);
            if (ticket.status?.type === 'en espera' && !ticket.called_at) {
                return [ticket, ...filtered];
            }
            return filtered;
        });

        setCalledTicketsState((prev) => {
            const filtered = prev.filter((t) => t.id !== ticket.id);
            if (ticket.called_at && ['en espera', 'atendiendo'].includes(ticket.status?.type || '')) {
                return [ticket, ...filtered].slice(0, 10);
            }
            return filtered;
        });

        if (ticket.called_at) {
            setHighlightedCalledIds((prev) =>
                prev.includes(ticket.id) ? prev : [ticket.id, ...prev],
            );
            setTimeout(() => {
                setHighlightedCalledIds((prev) => prev.filter((id) => id !== ticket.id));
            }, 6000);
        }
    };

    const handleTicketCalled = (e: { ticket: Ticket }) => {
        const ticket = TicketSchema.parse(e.ticket);

        setWaitingTicketsState((prev) =>
            prev.filter((t) => t.id !== ticket.id),
        );

        setCalledTicketsState((prev) => {
            const filtered = prev.filter((t) => t.id !== ticket.id);
            return [ticket, ...filtered].slice(0, 10);
        });

        setHighlightedCalledIds((prev) =>
            prev.includes(ticket.id) ? prev : [ticket.id, ...prev],
        );
        setTimeout(() => {
            setHighlightedCalledIds((prev) => prev.filter((id) => id !== ticket.id));
        }, 6000);
    };

    const { listen, stopListening } = useTicketEcho(
        area?.id ?? 0,
        handleTicketCreated,
        handleTicketUpdated,
        undefined,
        handleTicketCalled,
    );

    useEffect(() => {
        if (!area?.id) return;
        listen();

        return () => {
            stopListening();
        };
    }, [area?.id]);


    const handleChangeArea = (value: string) => {
        if (!value) {
            router.get(route('tickets.screen'));
            return;
        }
        router.get(route('tickets.screen', { area_id: value }));
    };

    return (
        <GuestLayout className="font-inter">
            <><style>
                {`@keyframes call-arrow-move {0% {opacity: 0; transform: translateX(-6px);} 50% {opacity: 1; transform: translateX(6px);} 100% {opacity: 0; transform: translateX(14px);}}`}
            </style>
                <div className="bg-slate-50 w-full h-screen overflow-hidden p-3 sm:p-4 md:p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img
                                src="/assets/images/escudo-muni.png"
                                alt="Logo"
                                className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12"
                            />
                            <div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                    Pantalla de Atención de Tickets
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Municipalidad de San Miguel - San Román
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-xs font-semibold text-gray-600">
                                Área:
                            </label>
                            <select
                                value={area?.id ?? ''}
                                onChange={(e) => handleChangeArea(e.target.value)}
                                className="border border-gray-300 bg-white text-sm px-3 py-2 focus:outline-none focus:border-blue-700"
                            >
                                <option value="">Selecciona un área</option>
                                {sortedAreas.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                        <div className="flex flex-col gap-4 min-h-0">
                            <div className="bg-white border border-gray-300 shadow flex flex-col">
                                <div className="px-6 py-4 bg-gray-700 border-b border-gray-800">
                                    <h3 className="text-white text-sm sm:text-base font-bold">
                                        Tickets En Espera
                                    </h3>
                                </div>
                                <div className="p-4 flex-1 overflow-auto">
                                    {waitingTicketsState.length === 0 ? (
                                        <div className="text-sm text-gray-500 text-center py-6">
                                            No hay tickets en espera.
                                        </div>
                                    ) : (
                                        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                                            {waitingTicketsState.slice(0, 10).map((ticket) => (
                                                <li
                                                    key={ticket.id}
                                                    className="flex items-center justify-center border border-gray-200 px-3 py-2 bg-gray-50"
                                                >
                                                    <span className="text-3xl font-black text-gray-800">
                                                        {ticket.visible_code}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 shadow flex flex-col lg:min-w-0 min-h-0 overflow-hidden">
                            <div className="px-6 py-4 bg-blue-700 border-b border-blue-800">
                                <h3 className="text-white text-sm sm:text-base font-bold">
                                    Tickets Llamados
                                </h3>
                            </div>
                            <div className="p-4 flex-1 min-h-0 overflow-y-auto">
                                {calledTicketsState.length === 0 ? (
                                    <div className="text-sm text-gray-500 text-center py-6">
                                        No hay tickets llamados.
                                    </div>
                                ) : (
                                    <ul className="space-y-3">
                                        {calledTicketsState.slice(0, 10).map((ticket) => (
                                            <li
                                                key={ticket.id}
                                                className={`border px-3 py-3 flex items-center justify-center transition ${highlightedCalledIds.includes(ticket.id)
                                                    ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300 animate-pulse'
                                                    : 'bg-blue-50 border-blue-200'
                                                    }`}
                                            >
                                                <div className="flex w-full items-center justify-around gap-6">
                                                    <span className="text-3xl font-black text-blue-800">
                                                        {ticket.visible_code}
                                                    </span>
                                                    {highlightedCalledIds.includes(ticket.id) && (
                                                        <span
                                                            className="text-5xl font-black text-yellow-700"
                                                            style={{ animation: 'call-arrow-move 1s ease-in-out infinite' }}
                                                        >
                                                            →
                                                        </span>
                                                    )}
                                                    <span className="px-3 py-1 text-base font-black uppercase bg-yellow-100 text-yellow-900 border border-yellow-200">
                                                        {ticket.called_by?.display_name ?? ticket.called_by?.name ?? '---'}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div></>
        </GuestLayout>
    );
}
