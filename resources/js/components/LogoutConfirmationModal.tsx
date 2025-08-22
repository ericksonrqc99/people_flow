import { AlertTriangle, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-md mx-4 shadow-2xl border-2">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-900">
                                Confirmar cierre de sesión
                            </CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-gray-700">
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
                    
                    <div className="flex space-x-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="flex-1 hover:bg-gray-50"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Cerrar sesión
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
