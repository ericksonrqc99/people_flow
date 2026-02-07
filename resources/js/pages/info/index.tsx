import GuestLayout from '@/layouts/guest-layout';

export default function Info({ message }: { message: string }) {
    return (
        <GuestLayout className="font-inter">
            <div className="bg-slate-50 w-full h-screen p-3 sm:p-4 md:p-6 flex flex-col">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <img
                        src="/assets/images/escudo-muni.png"
                        alt="Logo"
                        className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12"
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                        Sistema de Gestión de Tickets
                    </h2>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-xl bg-white border border-gray-300 shadow">
                        <div className="px-6 py-4 bg-gray-700 border-b border-gray-800">
                            <h3 className="text-white text-sm sm:text-base font-bold">
                                Aviso del Sistema
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded bg-yellow-500/20 text-yellow-700 flex items-center justify-center font-bold">
                                    !
                                </div>
                                <div>
                                    <p className="text-gray-800 font-semibold text-base sm:text-lg">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
