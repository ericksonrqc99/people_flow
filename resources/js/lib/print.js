import { pdf } from '@react-pdf/renderer';
import qz from 'qz-tray';

export const PrintPDF = (element) => {
    const print = async () => {
        try {
            // 1. Generar el PDF en blob
            const blob = await pdf(element).toBlob();
            const reader = new FileReader();

            reader.onload = async () => {
                const base64 = reader.result.split(',')[1]; // quitar encabezado
                // 2. Conectar con QZ
                if (!qz.websocket.isActive()) {
                    await qz.websocket.connect();
                }

                // 3. Obtener impresoras disponibles (opcional)
                const printers = await qz.printers.find();
                console.log('Impresoras disponibles:', printers);

                // 4. Configurar la impresora (puedes usar una específica o la predeterminada)
                const config = qz.configs.create(
                    'Kyocera-ECOSYS-M2640idw-oti',
                    {
                        copies: 1,
                        duplex: false,
                        colorType: 'blackwhite',
                        // 🔇 Esta línea es clave para que no muestre diálogos
                        rasterize: false,
                        altPrinting: false,
                    },
                ); // null = predeterminada

                // 5. Crear el objeto de impresión
                const data = [
                    {
                        type: 'pdf',
                        format: 'base64',
                        data: base64,
                    },
                ];
                // 6. Imprimir
                await qz.print(config, data);

                alert('Impresión enviada');
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error al imprimir:', error);
        }
    };

    print();
};
