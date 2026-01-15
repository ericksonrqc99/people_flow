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
                <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-300 shadow">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-700 text-white text-xs font-bold">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-gray-800">{userName}</span>
                        {areaName && (
                            <>
                                <span className="text-gray-300">|</span>
                                <span className="text-xs text-gray-600">{areaName}</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsVisible(true)}
                            className="h-7 px-2 text-blue-700 hover:bg-blue-50 text-xs font-semibold transition-colors border border-blue-700"
                        >
                            <Eye className="w-3 h-3 mr-1 inline" />
                            Mostrar
                        </button>
                        <button
                            onClick={handleLogout}
                            className="h-7 px-2 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors border border-red-700"
                            title="Cerrar sesión"
                        >
                            <LogOut className="w-3 h-3" />
                        </button>
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
            <div className="bg-white border border-gray-300 border-b-4 border-b-blue-600 shadow">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <div className="flex items-center space-x-4">
                            {/* User Info */}
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white text-xs font-bold">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800">
                                        {userName}
                                    </h2>
                                    <p className="text-xs text-gray-600">
                                        Panel de Gestión
                                    </p>
                                </div>
                            </div>

                            {/* Area Badge */}
                            {areaName && (
                                <div className="flex items-center space-x-2 pl-3 border-l border-gray-300">
                                    <Building2 className="w-4 h-4 text-gray-700" />
                                    <div>
                                        <p className="text-xs text-gray-600">Área</p>
                                        <p className="text-xs font-semibold text-gray-800">
                                            {areaName}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-3">
                            {/* Time Info */}
                            <div className="flex items-center space-x-2 text-right pl-3 border-l border-gray-300">
                                <Clock className="w-4 h-4 text-gray-700" />
                                <div>
                                    <p className="text-xs text-gray-600">Hora</p>
                                    <p className="text-xs font-semibold text-gray-800">
                                        {currentTime}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 pl-3 border-l border-gray-300">
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="h-7 w-7 p-0 text-gray-600 hover:bg-gray-100 transition-colors text-xs flex items-center justify-center"
                                    title="Ocultar header"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="h-7 px-2 text-red-700 hover:bg-red-50 font-semibold text-xs transition-colors border border-red-700"
                                >
                                    <LogOut className="w-3 h-3 mr-1 inline" />
                                    Cerrar Sesión
                                </button>
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