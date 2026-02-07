import { TicketGeneratorFormDataT } from '../types';
import { formatterNameCitizen } from '../../../lib/utils';
type Props = {
    data: TicketGeneratorFormDataT;
};
export default function ConfirmScreen({ data }: Props) {
    return (
        <section className="flex flex-col justify-center items-center gap-4 sm:gap-6 h-full py-4 sm:py-6">
            <div className="w-full max-w-2xl px-4">
                {/* Header */}
                <div className="bg-gray-700 text-white border border-gray-800 p-4 sm:p-6 mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                        Confirmar Datos
                    </h1>
                </div>

                {/* Data Card */}
                <div className="bg-white border border-gray-300 border-t-4 border-t-gray-700 p-4 sm:p-6 md:p-8">
                    <div className="space-y-4 sm:space-y-6">
                        {/* Ciudadano */}
                        <div className="border-b border-gray-300 pb-3 sm:pb-4">
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Ciudadano
                            </label>
                            <p className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                                {formatterNameCitizen(data.citizen)}
                            </p>
                        </div>

                        {/* Área */}
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                Área Seleccionada
                            </label>
                            <div className="bg-gray-50 border-l-4 border-l-gray-700 p-3 sm:p-4">
                                <p className="text-base sm:text-lg font-semibold text-gray-900">
                                    {data.area.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
