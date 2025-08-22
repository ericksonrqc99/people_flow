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
                <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border">
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{userName}</span>
                        {areaName && (
                            <>
                                <span className="text-gray-400">•</span>
                                <span className="text-sm text-gray-600">{areaName}</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVisible(true)}
                            className="h-6 px-2"
                        >
                            <Eye className="w-3 h-3 mr-1" />
                            <span className="text-xs">Mostrar</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Cerrar sesión"
                        >
                            <LogOut className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
                
                {/* Modal de confirmación de logout */}
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
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 relative">
                <CardContent className="pt-6">
                    {/* Botón para ocultar */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-green-100"
                        title="Ocultar header"
                    >
                        <X className="w-3 h-3" />
                    </Button>

                    <div className="flex items-center justify-between">
                        <div className="space-y-3">
                            {/* Saludo personalizado */}
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                                    <User className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        ¡Hola, {userName}!
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Bienvenido a tu área de trabajo
                                    </p>
                                </div>
                            </div>
                            
                            {/* Información del área */}
                            {areaName && (
                                <div className="flex items-center space-x-2">
                                    <Building2 className="w-4 h-4 text-green-600" />
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        {areaName}
                                    </Badge>
                                </div>
                            )}
                        </div>
                        
                        {/* Información de tiempo y logout */}
                        <div className="text-right space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{currentTime}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                Sistema de gestión de tickets
                            </p>
                            
                            {/* Botón de logout */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="bg-white/70 hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Cerrar sesión
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* Modal de confirmación de logout */}
            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
                userName={userName}
            />
        </>
    );
}