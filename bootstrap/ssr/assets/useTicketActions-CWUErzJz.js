import { useRef } from "react";
import axios from "axios";
import { T } from "../ssr.js";
import { z } from "zod";
const useMultipleEchoPublic = (channels) => {
  const listenersRef = useRef([]);
  const listen = () => {
    if (!window.Echo) {
      console.error("Echo is not initialized");
      return;
    }
    channels.forEach(({ channel, event, callback }) => {
      console.log(`Listening to channel: ${channel}, event: ${event}`);
      const listener = window.Echo.channel(channel).listen(event, callback);
      listenersRef.current.push({ channel, event, listener });
    });
  };
  const stopListening = () => {
    if (!window.Echo) {
      console.error("Echo is not initialized");
      return;
    }
    listenersRef.current.forEach(({ channel }) => {
      console.log(`Stopping listener on channel: ${channel}`);
      window.Echo.leaveChannel(channel);
    });
    listenersRef.current = [];
  };
  return {
    listen,
    stopListening
  };
};
const useTicketEcho = (userId, onTicketCreated, onTicketUpdated, onTicketDerived) => {
  const channels = [
    {
      channel: `ticket-created.${userId}`,
      event: "TicketCreated",
      callback: onTicketCreated
    },
    {
      channel: `ticket-updated.${userId}`,
      event: "UpdatedTicket",
      callback: onTicketUpdated
    }
  ];
  if (onTicketDerived) {
    channels.push({
      channel: `ticket-derived.${userId}`,
      event: "TicketDerived",
      callback: onTicketDerived
    });
  }
  return useMultipleEchoPublic(channels);
};
const TicketSchema = z.object({
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
  observations: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  // Relaciones (opcionales si vienen pobladas)
  area: z.any().optional(),
  citizen: z.any().optional(),
  status: z.any().optional(),
  registered_by: z.any().optional(),
  attended_by: z.any().optional().nullable()
});
z.object({
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
    updated_at: z.string()
    // Para optimistic locking
  })
});
z.object({
  id: z.coerce.number(),
  name: z.string(),
  description: z.string(),
  short_name: z.string(),
  parent_id: z.coerce.number().nullable(),
  children: z.array(z.any()).default([]),
  code: z.string(),
  type_id: z.coerce.number(),
  is_active: z.coerce.number()
});
const normalizeTicket = (data) => TicketSchema.parse(data);
const useTicketActions = ({
  user,
  ticketTypes,
  setTicketsData,
  setFocusedTicket,
  setHasActiveTicket,
  setCurrentActiveTicket
}) => {
  const findTicketTypeForType = (typeName) => {
    return ticketTypes.find((type) => type.type === typeName);
  };
  const handleTakeTicket = async (selectedTicket) => {
    var _a;
    const ticketType = findTicketTypeForType("atendiendo");
    if (!ticketType) {
      console.error("Ticket type not found for: atendiendo");
      return { success: false, error: "Ticket type not found" };
    }
    const resRaw = await fetch(T("clock.server-time"));
    const response = await resRaw.json();
    if (selectedTicket) {
      const ticket = {
        ...selectedTicket,
        attended_by_id: user == null ? void 0 : user.id,
        status: ticketType,
        status_id: ticketType.id,
        time_admission: response.server_time
      };
      try {
        const res = await axios.put(
          T("tickets.update"),
          {
            ticket: normalizeTicket(ticket)
          }
        );
        setTicketsData(
          (prev) => prev.map(
            (t) => t.id === selectedTicket.id ? res.data.ticket : t
          )
        );
        setFocusedTicket(res.data.ticket);
        setHasActiveTicket(true);
        setCurrentActiveTicket(res.data.ticket);
        console.log({ "response/tickets.update": res });
        return { success: true };
      } catch (error) {
        if (((_a = error.response) == null ? void 0 : _a.status) === 409) {
          alert("Este ticket ya fue tomado por otro usuario. La página se actualizará.");
          window.location.reload();
        } else {
          console.log({ error });
          alert("Error al tomar el ticket. Por favor intente nuevamente.");
        }
        return { success: false, error };
      }
    }
    return { success: false };
  };
  const handleCloseTicket = async (focusedTicket, closeForm) => {
    if (!focusedTicket) return;
    const ticketType = findTicketTypeForType(closeForm.estado);
    if (!ticketType) {
      console.error("Ticket type not found for:", closeForm.estado);
      return;
    }
    const resRaw = await fetch(T("clock.server-time"));
    const response = await resRaw.json();
    try {
      const ticket = {
        ...focusedTicket,
        status: ticketType,
        status_id: ticketType.id,
        time_departure: response.server_time,
        observations: closeForm.comentario
      };
      const res = await axios.put(T("tickets.update"), {
        ticket: normalizeTicket(ticket)
      });
      setTicketsData(
        (prev) => prev.map(
          (ticket2) => ticket2.id === focusedTicket.id ? res.data.ticket : ticket2
        )
      );
      setFocusedTicket(null);
      setHasActiveTicket(false);
      setCurrentActiveTicket(null);
      return { success: true };
    } catch (error) {
      console.error("Error closing ticket:", error);
      return { success: false, error };
    }
  };
  const handleReleaseTicket = async (focusedTicket, currentActiveTicket) => {
    if (!focusedTicket) return;
    const ticketType = findTicketTypeForType("en espera");
    if (!ticketType) {
      console.error("Ticket type not found for: en espera");
      return;
    }
    try {
      const ticket = {
        ...focusedTicket,
        attended_by_id: null,
        status: ticketType,
        status_id: ticketType.id,
        time_admission: null
      };
      const res = await axios.put(T("tickets.update"), {
        ticket: normalizeTicket(ticket)
      });
      setTicketsData(
        (prev) => prev.map(
          (ticket2) => ticket2.id === focusedTicket.id ? res.data.ticket : ticket2
        )
      );
      setFocusedTicket(null);
      if ((currentActiveTicket == null ? void 0 : currentActiveTicket.id) === focusedTicket.id) {
        setHasActiveTicket(false);
        setCurrentActiveTicket(null);
        window.location.reload();
      }
      console.log({ "response/tickets.release": res });
      return { success: true };
    } catch (error) {
      console.error("Error releasing ticket:", error);
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
export {
  TicketSchema as T,
  useTicketActions as a,
  useTicketEcho as u
};
