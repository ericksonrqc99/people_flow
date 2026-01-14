import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Building2, Clock, X, Eye, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import LogoutConfirmationModal from '@/components/LogoutConfirmationModal';

interface TicketPageHeaderProps {
    userName: string;
    areaName?: string;
}

export default function TicketPageHeader({ userName, areaName }: TicketPageHeaderProps) {
    // Inicializar desde localStorage o true por defecto
    const [isVisible, setIsVisible] = useState(() => {
        const saved = localStorage.getItem('ticketHeaderVisible');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Guardar en localStorage cuando cambie el estado
    useEffect(() => {
        localStorage.setItem('ticketHeaderVisible', JSON.stringify(isVisible));
    }, [isVisible]);
    
    const performLogout = () => {
        // Deshabilitar navegación hacia atrás temporalmente
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, '', window.location.href);
        });
        
        // Obtener token CSRF
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        if (csrfToken) {
            // Si hay token CSRF, hacer POST logout apropiadamente
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/logout';
            
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
            
            document.body.appendChild(form);
            form.submit();
        } else {
            // Respaldo: redirección completa de la página hacia el login
            window.location.replace('/admin/login');
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        performLogout();
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };
    
    const currentTime = new Date().toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Si está oculto, mostrar solo una barra compacta con botón para mostrar
    if (!isVisible) {
        return (
            <>
                <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                            <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">{userName}</span>
                        {areaName && (
                            <>
                                <span className="text-gray-300">|</span>
                                <span className="text-sm text-gray-600">{areaName}</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVisible(true)}
                            className="h-8 px-3 text-blue-600 hover:bg-blue-50"
                        >
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="text-xs">Mostrar</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="h-8 px-3 text-red-600 hover:bg-red-50"
                            title="Cerrar sesión"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                
                <LogoutConfirmationModal
                    isOpen={showLogoutModal}
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                    userName={userName}
                />
            </>
        );
    }

    return (
        <>
            {/* AdminLTE Style Header */}
            <div className="bg-white border-b-2 border-blue-600 shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <div className="flex items-center space-x-6">
                            {/* User Info */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg font-bold">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {userName}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Panel de Gestión de Tickets
                                    </p>
                                </div>
                            </div>

                            {/* Area Badge */}
                            {areaName && (
                                <div className="flex items-center space-x-2 pl-4 border-l border-gray-300">
                                    <Building2 className="w-4 h-4 text-blue-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Área Asignada</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {areaName}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-6">
                            {/* Time Info */}
                            <div className="flex items-center space-x-2 text-right pl-6 border-l border-gray-300">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <div>
                                    <p className="text-xs text-gray-600">Hora Actual</p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {currentTime}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 pl-6 border-l border-gray-300">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsVisible(false)}
                                    className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100"
                                    title="Ocultar header"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="h-8 px-3 text-red-600 hover:bg-red-50 font-medium"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Salir
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
                userName={userName}
            />
        </>
    );
}