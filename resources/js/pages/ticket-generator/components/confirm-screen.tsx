import { TicketGeneratorFormDataT } from '../types';
import { formatterNameCitizen } from '../../../lib/utils';
type Props = {
    data: TicketGeneratorFormDataT;
};
export default function ConfirmScreen({ data }: Props) {
    return (
        <section className="flex flex-col justify-center items-center gap-y-8 min-h-full py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md border-l-4 border-l-blue-600 p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        Confirmar Datos
                    </h1>
                </div>

                {/* Data Card */}
                <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-green-600 p-8">
                    <div className="space-y-6">
                        {/* Ciudadano */}
                        <div className="border-b border-gray-200 pb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Ciudadano
                            </label>
                            <p className="text-lg font-semibold text-gray-900">
                                {formatterNameCitizen(data.citizen)}
                            </p>
                        </div>

                        {/* Área */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Área Seleccionada
                            </label>
                            <div className="bg-blue-50 border-l-4 border-l-blue-600 p-4 rounded">
                                <p className="text-lg font-semibold text-gray-900">
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
