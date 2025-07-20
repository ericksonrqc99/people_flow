import { TicketGeneratorFormDataT } from '../types';
import { formatterNameCitizen } from '../../../lib/utils';
type Props = {
    data: TicketGeneratorFormDataT;
};
export default function ConfirmScreen({ data }: Props) {
    return (
        <section className="flex flex-col justify-center items-center gap-y-6 h-full ">
            <h1 className="text-center text-custom-foreground text-4xl font-semibold">
                Confirmar Datos
            </h1>
            <div className="bg-custom-muted border-4 border-dashed  border-custom-foreground flex flex-col p-6 rounded-md gap-y-4 text-2xl min-w-1/2 shadow-lg">
                <span className="font-bold">Nombre:</span>
                <p className="">{formatterNameCitizen(data.citizen)} </p>
                <span className="font-bold">Area:</span>
                <p>{data.area.name}</p>
            </div>
        </section>
    );
}
