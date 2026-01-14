import { TicketGeneratorFormDataT } from '../types';
import { formatterNameCitizen } from '../../../lib/utils';
type Props = {
    data: TicketGeneratorFormDataT;
};
export default function ConfirmScreen({ data }: Props) {
    return (
        <section className="flex flex-col justify-center items-center gap-4 sm:gap-6 h-full py-4 sm:py-6">
            <div className="w-full max-w-sm px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md border-l-4 border-l-blue-600 p-4 sm:p-6 mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                        Confirmar Datos
                    </h1>
                </div>

                {/* Data Card */}
                <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-green-600 p-4 sm:p-6 md:p-8">
                    <div className="space-y-4 sm:space-y-6">
                        {/* Ciudadano */}
                        <div className="border-b border-gray-200 pb-3 sm:pb-4">
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
                            <div className="bg-blue-50 border-l-4 border-l-blue-600 p-3 sm:p-4 rounded">
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
