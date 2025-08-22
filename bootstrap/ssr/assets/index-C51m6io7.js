import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { T as TicketSchema, u as useTicketEcho, a as useTicketActions } from "./useTicketActions-BIIM3HGa.js";
import TicketPageHeader from "./TicketPageHeader-DI2LChoi.js";
import ActiveTicketBanner from "./ActiveTicketBanner-VTq1EO4u.js";
import TicketFocusedView from "./TicketFocusedView-o0OeJw_X.js";
import ActiveTicketMessage from "./ActiveTicketMessage-h-PcXQqy.js";
import Searcher from "./searcher-v9xdTPPM.js";
import CategoryTabs from "./CategoryTabs-EsPFOV0i.js";
import TicketModals from "./TicketModals-CjhEkLQ2.js";
import "@laravel/echo-react";
import "axios";
import "../ssr.js";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
import "zod";
import "./card-Cm8ppzCC.js";
import "./utils-BMo_LHkK.js";
import "clsx";
import "tailwind-merge";
import "./badge-44jshGyU.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./button-BmnVj2kL.js";
import "lucide-react";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
function TicketsPage({ ...props }) {
  var _a;
  const {
    auth: { user },
    tickets,
    ticketTypes,
    userHasActiveTicket = false,
    activeTicket = null
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
  const [closeForm, setCloseForm] = useState({
    estado: "",
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
  const {
    listen: listenToTicketChannels,
    stopListening: stopListeningToTicketChannels
  } = useTicketEcho(user.area.id, handleTicketCreated, handleTicketUpdated);
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
        setCloseForm({ estado: "", comentario: "" });
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
        onEdit: () => setShowEditModal(true),
        onClose: () => setShowCloseModal(true),
        onRelease: () => setShowReleaseModal(true)
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
        setShowDeleteModal
      }
    )
  ] });
}
export {
  TicketsPage as default
};
