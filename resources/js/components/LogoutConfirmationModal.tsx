import { AlertTriangle, LogOut, X } from 'lucide-react';

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    userName?: string;
}

export default function LogoutConfirmationModal({
    isOpen,
    onConfirm,
    onCancel,
    userName
}: LogoutConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md mx-4 border border-gray-300 rounded-none shadow bg-white">
                <div className="bg-gray-700 text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-none">
                            <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-sm font-bold text-white">
                            Confirmar cierre de sesión
                        </h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="h-7 w-7 p-0 text-white hover:bg-gray-600 transition-colors text-xs flex items-center justify-center"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="px-4 py-4 space-y-4 border-b border-gray-300">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                            {userName ? (
                                <>¿Estás seguro de que deseas cerrar la sesión, <strong>{userName}</strong>?</>
                            ) : (
                                <>¿Estás seguro de que deseas cerrar la sesión?</>
                            )}
                        </p>
                        <p className="text-sm text-gray-500">
                            Tendrás que volver a iniciar sesión para acceder al sistema de tickets.
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-2 px-4 py-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 font-semibold text-sm transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-3 py-2 bg-red-700 text-white border border-red-800 hover:bg-red-800 font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
