import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Ticket } from '@/types/general';
import { ChangeEvent } from 'react';

interface TicketModalsProps {
    // Take Modal
    showTakeModal: boolean;
    setShowTakeModal: (show: boolean) => void;
    selectedTicket: Ticket | null;
    onTakeTicket: () => void;
    
    // View Modal
    showViewModal: boolean;
    setShowViewModal: (show: boolean) => void;
    
    // Close Modal
    showCloseModal: boolean;
    setShowCloseModal: (show: boolean) => void;
    closeForm: {
        estado: 'cerrado' | 'cancelado';
        comentario: string;
    };
    setCloseForm: (form: { estado: 'cerrado' | 'cancelado'; comentario: string }) => void;
    onCloseTicket: () => void;
    
    // Release Modal
    showReleaseModal: boolean;
    setShowReleaseModal: (show: boolean) => void;
    onReleaseTicket: () => void;
    
    // Derive Modal
    showDeriveModal: boolean;
    setShowDeriveModal: (show: boolean) => void;
    deriveForm: {
        toAreaId: string;
        reason: string;
    };
    setDeriveForm: (form: { toAreaId: string; reason: string }) => void;
    onDeriveTicket: () => void;
    areas: any[];
    
    // Edit Modal
    showEditModal: boolean;
    setShowEditModal: (show: boolean) => void;
    editForm: {
        codigo: string;
        area: string;
        ciudadano: string;
        estado: string;
        fecha: string;
        comentario: string;
    };
    setEditForm: (form: any) => void;
    focusedTicket: Ticket | null;
    setFocusedTicket: (ticket: Ticket | null) => void;
    
    // Delete Modal
    showDeleteModal: boolean;
    setShowDeleteModal: (show: boolean) => void;
}

// Modal Header Component - AdminLTE Style
const ModalHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="bg-gray-700 text-white px-4 py-3">
        <h2 className="text-sm font-bold text-white">{title}</h2>
        {description && <p className="text-sm text-gray-300 mt-1">{description}</p>}
    </div>
);

// Modal Footer Component - AdminLTE Style
const ModalFooter = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-2 justify-end px-4 py-3 border-t border-gray-300">
        {children}
    </div>
);

// Modal Button Component
const ModalButton = ({ 
    onClick, 
    variant = 'primary', 
    disabled = false,
    children 
}: { 
    onClick?: () => void; 
    variant?: 'primary' | 'secondary' | 'danger' | 'success'; 
    disabled?: boolean;
    children: React.ReactNode;
}) => {
    const baseStyle = 'px-3 py-2 text-sm font-semibold transition-colors';
    const variants = {
        primary: 'bg-blue-700 text-white border border-blue-800 hover:bg-blue-800 disabled:bg-gray-400 disabled:border-gray-500',
        secondary: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200',
        danger: 'bg-red-700 text-white border border-red-800 hover:bg-red-800',
        success: 'bg-green-700 text-white border border-green-800 hover:bg-green-800'
    };
    
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${disabled ? 'cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
};

export default function TicketModals({
    // Take Modal
    showTakeModal,
    setShowTakeModal,
    selectedTicket,
    onTakeTicket,
    
    // View Modal
    showViewModal,
    setShowViewModal,
    
    // Close Modal
    showCloseModal,
    setShowCloseModal,
    closeForm,
    setCloseForm,
    onCloseTicket,
    
    // Release Modal
    showReleaseModal,
    setShowReleaseModal,
    onReleaseTicket,
    
    // Derive Modal
    showDeriveModal,
    setShowDeriveModal,
    deriveForm,
    setDeriveForm,
    onDeriveTicket,
    areas,
    
    // Edit Modal
    showEditModal,
    setShowEditModal,
    editForm,
    setEditForm,
    focusedTicket,
    setFocusedTicket,
    
    // Delete Modal
    showDeleteModal,
    setShowDeleteModal,
}: TicketModalsProps) {
    
    return (
        <>
            {/* Take Ticket Modal */}
            <Dialog open={showTakeModal} onOpenChange={setShowTakeModal}>
                <DialogContent className="border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Confirmar acción" description="¿Estás seguro de que quieres tomar este ticket?" />
                    <div className="px-4 py-3">
                        {selectedTicket && (
                            <div className="space-y-2 text-sm">
                                <p><strong>Código:</strong> {selectedTicket.visible_code}</p>
                                <p><strong>Ciudadano:</strong> {[
                                    selectedTicket.citizen?.names,
                                    selectedTicket.citizen?.first_surname,
                                    selectedTicket.citizen?.second_surname
                                ].filter(Boolean).join(' ')}</p>
                                <p><strong>DNI:</strong> {selectedTicket.citizen?.document_number}</p>
                            </div>
                        )}
                    </div>
                    <ModalFooter>
                        <ModalButton variant="secondary" onClick={() => setShowTakeModal(false)}>
                            Cancelar
                        </ModalButton>
                        <ModalButton variant="primary" onClick={onTakeTicket}>
                            Confirmar
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>

            {/* View Ticket Modal */}
            <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
                <DialogContent className="max-w-2xl border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Detalles del Ticket" />
                    <div className="px-4 py-3">
                        {selectedTicket && (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Código</p>
                                        <p className="text-sm text-gray-900">{selectedTicket.visible_code}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Estado</p>
                                        <p className="text-sm text-gray-900">{selectedTicket.status?.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Ciudadano</p>
                                        <p className="text-sm text-gray-900">
                                            {[
                                                selectedTicket.citizen?.names,
                                                selectedTicket.citizen?.first_surname,
                                                selectedTicket.citizen?.second_surname
                                            ].filter(Boolean).join(' ')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">DNI</p>
                                        <p className="text-sm text-gray-900">{selectedTicket.citizen?.document_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Área</p>
                                        <p className="text-sm text-gray-900">{selectedTicket.area?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Fecha de creación</p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(selectedTicket.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {selectedTicket.observations && (
                                    <div className="mt-2 p-2 bg-gray-50 border border-gray-300">
                                        <p className="text-sm font-semibold text-gray-900 mb-1">
                                            Observaciones
                                        </p>
                                        <div className="bg-white p-2 border border-gray-300 min-h-[60px] max-h-[150px] overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap break-words">
                                            {selectedTicket.observations}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <ModalFooter>
                        <ModalButton variant="primary" onClick={() => setShowViewModal(false)}>
                            Cerrar
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>

            {/* Close Ticket Modal */}
            <Dialog open={showCloseModal} onOpenChange={setShowCloseModal}>
                <DialogContent className="border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Cerrar Ticket" description="Selecciona el estado final del ticket y añade observaciones." />
                    <div className="px-4 py-3 space-y-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">Estado final</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="cerrado"
                                        name="estado"
                                        value="cerrado"
                                        checked={closeForm.estado === 'cerrado'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                            setCloseForm({ ...closeForm, estado: e.target.value as 'cerrado' | 'cancelado' })
                                        }
                                    />
                                    <label htmlFor="cerrado" className="text-sm text-gray-700 cursor-pointer">Cerrado (Completado)</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="cancelado"
                                        name="estado"
                                        value="cancelado"
                                        checked={closeForm.estado === 'cancelado'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                            setCloseForm({ ...closeForm, estado: e.target.value as 'cerrado' | 'cancelado' })
                                        }
                                    />
                                    <label htmlFor="cancelado" className="text-sm text-gray-700 cursor-pointer">Cancelado</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="comentario" className="text-sm font-semibold text-gray-700 block mb-2">Observaciones finales</label>
                            <textarea
                                id="comentario"
                                value={closeForm.comentario}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                                    setCloseForm({ ...closeForm, comentario: e.target.value })
                                }
                                placeholder="Escribe observaciones sobre la atención..."
                                className="w-full min-h-[80px] p-2 border border-gray-300 text-sm"
                            />
                        </div>
                    </div>
                    <ModalFooter>
                        <ModalButton variant="secondary" onClick={() => setShowCloseModal(false)}>
                            Cancelar
                        </ModalButton>
                        <ModalButton variant="success" onClick={onCloseTicket}>
                            Cerrar Ticket
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>

            {/* Release Ticket Modal */}
            <Dialog open={showReleaseModal} onOpenChange={setShowReleaseModal}>
                <DialogContent className="border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Liberar Ticket" description="¿Estás seguro de que quieres liberar este ticket? Volverá al estado pendiente." />
                    <ModalFooter>
                        <ModalButton variant="secondary" onClick={() => setShowReleaseModal(false)}>
                            Cancelar
                        </ModalButton>
                        <ModalButton variant="danger" onClick={onReleaseTicket}>
                            Liberar
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal - Placeholder */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent className="border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Editar Ticket" description="Funcionalidad de edición en desarrollo." />
                    <ModalFooter>
                        <ModalButton variant="primary" onClick={() => setShowEditModal(false)}>
                            Cerrar
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>

            {/* Derive Modal */}
            <Dialog open={showDeriveModal} onOpenChange={setShowDeriveModal}>
                <DialogContent className="border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Derivar Ticket" description="Selecciona el área a la que deseas derivar este ticket y proporciona una razón." />
                    <div className="px-4 py-3 space-y-3">
                        <div>
                            <label htmlFor="area" className="text-sm font-semibold text-gray-700 block mb-2">
                                Área destino
                            </label>
                            <select
                                id="area"
                                value={deriveForm.toAreaId}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setDeriveForm({ ...deriveForm, toAreaId: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 text-sm"
                            >
                                <option value="">Selecciona un área</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id.toString()}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="reason" className="text-sm font-semibold text-gray-700 block mb-2">
                                Razón
                            </label>
                            <div>
                                <textarea
                                    id="reason"
                                    value={deriveForm.reason}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                        setDeriveForm({ ...deriveForm, reason: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 text-sm"
                                    rows={3}
                                    placeholder="Explica por qué derivar este ticket..."
                                />
                                <p className={`text-sm mt-1 ${
                                    deriveForm.reason.trim().length < 10 
                                        ? 'text-red-600' 
                                        : 'text-green-700'
                                }`}>
                                    {deriveForm.reason.trim().length}/10 caracteres mínimos
                                </p>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <ModalButton 
                            variant="secondary" 
                            onClick={() => setShowDeriveModal(false)}
                        >
                            Cancelar
                        </ModalButton>
                        <ModalButton 
                            variant="primary"
                            onClick={onDeriveTicket}
                            disabled={!deriveForm.toAreaId || !deriveForm.reason.trim() || deriveForm.reason.trim().length < 10}
                        >
                            Derivar
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Modal - Placeholder */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent className="border border-gray-300 rounded-none shadow-none p-0">
                    <ModalHeader title="Eliminar Ticket" description="Funcionalidad de eliminación en desarrollo." />
                    <ModalFooter>
                        <ModalButton variant="primary" onClick={() => setShowDeleteModal(false)}>
                            Cerrar
                        </ModalButton>
                    </ModalFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
