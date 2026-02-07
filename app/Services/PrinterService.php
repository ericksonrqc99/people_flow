<?php

namespace App\Services;

use Exception;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;

use Mike42\Escpos\PrintConnectors\FilePrintConnector;


class PrinterService
{

    public static function print()
    {

        // Conectar a impresora térmica por IP


        // $connector = new NetworkPrintConnector("192.168.1.100", 9100);

        $ruta = storage_path('app/print_output.escpos'); // o .bin si quieres ver binario
        $connector = new FilePrintConnector($ruta);
        $printer = new Printer($connector);


        // Formatear contenido
        $printer->text("TICKET DE VENTA\n");
        $printer->text("================\n");
        $printer->text('TICKET_CODE');
        $printer->cut();
        $printer->close();

        return response()->json(['success' => true]);
    }
}
