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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar acción</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres tomar este ticket?
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="space-y-2">
                            <p><strong>Código:</strong> {selectedTicket.visible_code}</p>
                            <p><strong>Ciudadano:</strong> {[
                                selectedTicket.citizen?.names,
                                selectedTicket.citizen?.first_surname,
                                selectedTicket.citizen?.second_surname
                            ].filter(Boolean).join(' ')}</p>
                            <p><strong>DNI:</strong> {selectedTicket.citizen?.document_number}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowTakeModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={onTakeTicket}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Ticket Modal */}
            <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detalles del Ticket</DialogTitle>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Código</Label>
                                    <p className="text-sm">{selectedTicket.visible_code}</p>
                                </div>
                                <div>
                                    <Label>Estado</Label>
                                    <p className="text-sm">{selectedTicket.status?.type}</p>
                                </div>
                                <div>
                                    <Label>Ciudadano</Label>
                                    <p className="text-sm">
                                        {[
                                            selectedTicket.citizen?.names,
                                            selectedTicket.citizen?.first_surname,
                                            selectedTicket.citizen?.second_surname
                                        ].filter(Boolean).join(' ')}
                                    </p>
                                </div>
                                <div>
                                    <Label>DNI</Label>
                                    <p className="text-sm">{selectedTicket.citizen?.document_number}</p>
                                </div>
                                <div>
                                    <Label>Área</Label>
                                    <p className="text-sm">{selectedTicket.area?.name}</p>
                                </div>
                                <div>
                                    <Label>Fecha de creación</Label>
                                    <p className="text-sm">
                                        {new Date(selectedTicket.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            {selectedTicket.observations && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                                    <Label className="text-base font-semibold text-gray-900 mb-3 block">
                                        Observaciones
                                    </Label>
                                    <div className="bg-white p-4 rounded-md border border-gray-200 min-h-[80px] max-h-[200px] overflow-y-auto">
                                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap break-words">
                                            {selectedTicket.observations}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setShowViewModal(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Close Ticket Modal */}
            <Dialog open={showCloseModal} onOpenChange={setShowCloseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cerrar Ticket</DialogTitle>
                        <DialogDescription>
                            Selecciona el estado final del ticket y añade observaciones.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Estado final</Label>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center space-x-2">
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
                                    <Label htmlFor="cerrado">Cerrado (Completado)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
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
                                    <Label htmlFor="cancelado">Cancelado</Label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="comentario">Observaciones finales</Label>
                            <textarea
                                id="comentario"
                                value={closeForm.comentario}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                                    setCloseForm({ ...closeForm, comentario: e.target.value })
                                }
                                placeholder="Escribe observaciones sobre la atención..."
                                className="mt-1 w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCloseModal(false)}>
                            Cancelar
                        </Button>
                        <Button 
                            onClick={onCloseTicket}
                        >
                            Cerrar Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Release Ticket Modal */}
            <Dialog open={showReleaseModal} onOpenChange={setShowReleaseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Liberar Ticket</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres liberar este ticket? Volverá al estado pendiente.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReleaseModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={onReleaseTicket}>
                            Liberar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal - Placeholder */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Ticket</DialogTitle>
                        <DialogDescription>
                            Funcionalidad de edición en desarrollo.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowEditModal(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Derive Modal */}
            <Dialog open={showDeriveModal} onOpenChange={setShowDeriveModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Derivar Ticket</DialogTitle>
                        <DialogDescription>
                            Selecciona el área a la que deseas derivar este ticket y proporciona una razón.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="area" className="text-right">
                                Área destino
                            </Label>
                            <select
                                id="area"
                                value={deriveForm.toAreaId}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setDeriveForm({ ...deriveForm, toAreaId: e.target.value })
                                }
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Selecciona un área</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id.toString()}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">
                                Razón
                            </Label>
                            <div className="col-span-3">
                                <textarea
                                    id="reason"
                                    value={deriveForm.reason}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                        setDeriveForm({ ...deriveForm, reason: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows={3}
                                    placeholder="Explica por qué derivar este ticket..."
                                />
                                <p className={`text-xs mt-1 ${
                                    deriveForm.reason.trim().length < 10 
                                        ? 'text-red-500' 
                                        : 'text-green-600'
                                }`}>
                                    {deriveForm.reason.trim().length}/10 caracteres mínimos
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowDeriveModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={onDeriveTicket}
                            disabled={!deriveForm.toAreaId || !deriveForm.reason.trim() || deriveForm.reason.trim().length < 10}
                        >
                            Derivar Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Modal - Placeholder */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminar Ticket</DialogTitle>
                        <DialogDescription>
                            Funcionalidad de eliminación en desarrollo.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowDeleteModal(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
