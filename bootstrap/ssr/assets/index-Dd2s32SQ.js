import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { T } from "../ssr.js";
import { T as TicketSchema, u as useTicketEcho, a as useTicketActions } from "./useTicketActions-CWUErzJz.js";
import TicketPageHeader from "./TicketPageHeader-D8Dg8EUm.js";
import ActiveTicketBanner from "./ActiveTicketBanner-3OdNfL6J.js";
import TicketFocusedView from "./TicketFocusedView-LZzDuA2r.js";
import ActiveTicketMessage from "./ActiveTicketMessage-DJ2zU4rD.js";
import Searcher from "./searcher-B_B68Vae.js";
import CategoryTabs from "./CategoryTabs-CleJoA69.js";
import TicketModals from "./TicketModals-BynnO-P7.js";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
import "zod";
import "./card-o23MGwpj.js";
import "./utils-CPq9aNLN.js";
import "clsx";
import "tailwind-merge";
import "./badge-eMoabTnV.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./button-DYBWqrh5.js";
import "lucide-react";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
function TicketsPage({ ...props }) {
  var _a;
  const {
    auth: { user },
    tickets,
    ticketTypes,
    userHasActiveTicket = false,
    activeTicket = null,
    areas = []
  } = props;
  const [ticketsData, setTicketsData] = useState(() => {
    return tickets.map((ticket) => TicketSchema.parse(ticket));
  });
  const [hasActiveTicket, setHasActiveTicket] = useState(userHasActiveTicket);
  const [currentActiveTicket, setCurrentActiveTicket] = useState(() => {
    return activeTicket ? TicketSchema.parse(activeTicket) : null;
  });
  const [focusedTicket, setFocusedTicket] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("en espera");
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeriveModal, setShowDeriveModal] = useState(false);
  const [closeForm, setCloseForm] = useState({
    estado: "cerrado",
    comentario: ""
  });
  const [editForm, setEditForm] = useState({
    codigo: "",
    area: "",
    ciudadano: "",
    estado: "",
    fecha: "",
    comentario: ""
  });
  const [deriveForm, setDeriveForm] = useState({
    toAreaId: "",
    reason: ""
  });
  const notificationSound = useRef(null);
  const { handleTakeTicket, handleCloseTicket, handleReleaseTicket } = useTicketActions({
    user,
    ticketTypes,
    setTicketsData,
    setFocusedTicket,
    setHasActiveTicket,
    setCurrentActiveTicket
  });
  const handleTicketCreated = (e) => {
    console.log("llego handleTicketCreated");
    const normalizedTicket = TicketSchema.parse(e.ticket);
    setTicketsData((prevTickets) => [normalizedTicket, ...prevTickets]);
    if (notificationSound.current) {
      notificationSound.current.play().catch((error) => {
        console.error("No se pudo reproducir el sonido:", error);
      });
    }
  };
  const handleTicketUpdated = (e) => {
    const normalizedTicket = TicketSchema.parse(e.ticket);
    setTicketsData(
      (prevTickets) => prevTickets.map((prevTicket) => {
        return prevTicket.id === normalizedTicket.id ? normalizedTicket : prevTicket;
      })
    );
  };
  const handleTicketDerived = (e) => {
    const normalizedTicket = TicketSchema.parse(e.ticket);
    setTicketsData((prevTickets) => [normalizedTicket, ...prevTickets]);
    if (notificationSound.current) {
      notificationSound.current.play().catch(console.error);
    }
    console.log("Ticket derivado recibido:", {
      ticket: normalizedTicket,
      fromAreaId: e.fromAreaId,
      reason: e.reason
    });
  };
  const {
    listen: listenToTicketChannels,
    stopListening: stopListeningToTicketChannels
  } = useTicketEcho(user.area.id, handleTicketCreated, handleTicketUpdated, handleTicketDerived);
  useEffect(() => {
    listenToTicketChannels();
    return () => {
      stopListeningToTicketChannels();
    };
  }, []);
  useEffect(() => {
    if (hasActiveTicket && currentActiveTicket && !focusedTicket) {
      setFocusedTicket(currentActiveTicket);
    }
  }, [hasActiveTicket, currentActiveTicket, focusedTicket]);
  const getFilteredTickets = () => {
    return ticketsData.filter((ticket) => {
      var _a2, _b, _c, _d, _e, _f;
      const fullName = [
        (_a2 = ticket.citizen) == null ? void 0 : _a2.names,
        (_b = ticket.citizen) == null ? void 0 : _b.first_surname,
        (_c = ticket.citizen) == null ? void 0 : _c.second_surname
      ].filter(Boolean).join(" ").toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = fullName.includes(searchLower) || String(((_d = ticket.citizen) == null ? void 0 : _d.document_number) || "").includes(searchTerm) || ((_e = ticket.visible_code) == null ? void 0 : _e.toLowerCase().includes(searchLower));
      let matchesEstado = true;
      if (activeTab !== "todos") {
        matchesEstado = ((_f = ticket.status) == null ? void 0 : _f.type) === activeTab;
      }
      return matchesSearch && matchesEstado;
    });
  };
  const openTakeModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowTakeModal(true);
  };
  const openViewModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };
  const onTakeTicket = async () => {
    if (selectedTicket) {
      const result = await handleTakeTicket(selectedTicket);
      if (result == null ? void 0 : result.success) {
        setShowTakeModal(false);
        setSelectedTicket(null);
      }
    }
  };
  const onCloseTicket = async () => {
    if (focusedTicket) {
      const result = await handleCloseTicket(focusedTicket, closeForm);
      if (result == null ? void 0 : result.success) {
        setShowCloseModal(false);
        setCloseForm({ estado: "cerrado", comentario: "" });
      }
    }
  };
  const onReleaseTicket = async () => {
    if (focusedTicket) {
      const result = await handleReleaseTicket(focusedTicket, currentActiveTicket);
      if (result == null ? void 0 : result.success) {
        setShowReleaseModal(false);
      }
    }
  };
  const onDeriveTicket = async () => {
    if (focusedTicket && deriveForm.toAreaId && deriveForm.reason.trim()) {
      try {
        const response = await axios.post(T("tickets.derive"), {
          ticket_id: focusedTicket.id,
          to_area_id: parseInt(deriveForm.toAreaId),
          reason: deriveForm.reason
        });
        const result = response.data;
        if (result.ok) {
          setShowDeriveModal(false);
          setDeriveForm({ toAreaId: "", reason: "" });
          setTicketsData(
            (prevTickets) => prevTickets.filter((ticket) => ticket.id !== focusedTicket.id)
          );
          setFocusedTicket(null);
          setHasActiveTicket(false);
          setCurrentActiveTicket(null);
          console.log("Ticket derivado exitosamente");
        } else {
          alert(result.message || "Error al derivar el ticket");
        }
      } catch (error) {
        console.error("Error derivando ticket:", error);
        alert("Error al derivar el ticket. Por favor intente nuevamente.");
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
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6 space-y-6", children: [
    /* @__PURE__ */ jsx(
      "audio",
      {
        ref: notificationSound,
        src: "/assets/sounds/notification-new-ticket.mp3",
        preload: "auto"
      }
    ),
    /* @__PURE__ */ jsx(
      TicketPageHeader,
      {
        userName: user.name,
        areaName: (_a = user.area) == null ? void 0 : _a.name
      }
    ),
    hasActiveTicket && currentActiveTicket && !focusedTicket && /* @__PURE__ */ jsx(
      ActiveTicketBanner,
      {
        currentActiveTicket,
        onViewTicket: onViewActiveTicket
      }
    ),
    focusedTicket ? /* @__PURE__ */ jsx(
      TicketFocusedView,
      {
        ticket: focusedTicket,
        onClose: () => setShowCloseModal(true),
        onRelease: () => setShowReleaseModal(true),
        onDerive: () => setShowDeriveModal(true)
      }
    ) : hasActiveTicket && !focusedTicket ? /* @__PURE__ */ jsx(ActiveTicketMessage, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Searcher,
        {
          searchTerm,
          setSearchTerm
        }
      ),
      /* @__PURE__ */ jsx(
        CategoryTabs,
        {
          activeTab,
          setActiveTab,
          ticketsData,
          getFilteredTickets,
          openTakeModal,
          openViewModal
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      TicketModals,
      {
        showTakeModal,
        setShowTakeModal,
        selectedTicket,
        onTakeTicket,
        showViewModal,
        setShowViewModal,
        showCloseModal,
        setShowCloseModal,
        closeForm,
        setCloseForm,
        onCloseTicket,
        showReleaseModal,
        setShowReleaseModal,
        onReleaseTicket,
        showEditModal,
        setShowEditModal,
        editForm,
        setEditForm,
        focusedTicket,
        setFocusedTicket,
        showDeleteModal,
        setShowDeleteModal,
        showDeriveModal,
        setShowDeriveModal,
        deriveForm,
        setDeriveForm,
        onDeriveTicket,
        areas
      }
    )
  ] });
}
export {
  TicketsPage as default
};
