<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $areas = [
            // GERENCIAS (sin parent_id)
            ['id' => 1, 'name' => 'Gerencia municipal', 'code' => 'GM', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'municipal'],
            ['id' => 2, 'name' => 'Gerencia de comunicaciones y atención al usuario', 'code' => 'GCAU', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'comunicaciones y atención al usuario'],
            ['id' => 3, 'name' => 'Gerencia de administración y finanzas', 'code' => 'GAF', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'administración y finanzas'],
            ['id' => 4, 'name' => 'Gerencia de planeamiento, presupuesto e inversiones', 'code' => 'GPPI', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'planeamiento, presupuesto e inversiones'],
            ['id' => 5, 'name' => 'Oficina de asesoría jurídica', 'code' => 'OAJ', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Oficina de asesoría jurídica'],
            ['id' => 6, 'name' => 'Gerencia de desarrollo ambiental y servicios públicos', 'code' => 'GDSP', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo ambiental y servicios públicos'],
            ['id' => 7, 'name' => 'Gerencia de desarrollo urbano', 'code' => 'GDU', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo urbano'],
            ['id' => 8, 'name' => 'Gerencia de infraestructura', 'code' => 'GI', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'infraestructura'],
            ['id' => 9, 'name' => 'Gerencia de desarrollo social', 'code' => 'GDS', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo social'],
            ['id' => 10, 'name' => 'Gerencia de desarrollo económico local', 'code' => 'GDEL', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo económico local'],
            ['id' => 11, 'name' => 'Gerencia de administración tributaria', 'code' => 'GAT', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'administración tributaria'],

            // SUBGERENCIAS (con parent_id de su gerencia respectiva)
            ['id' => 12, 'name' => 'Subgerencia de atención al usuario y trámite documentario', 'code' => 'SAUT', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'atención al usuario y trámite documentario'],
            ['id' => 13, 'name' => 'Subgerencia de comunicaciones y relaciones públicas', 'code' => 'SCRP', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'comunicaciones y relaciones públicas'],
            ['id' => 14, 'name' => 'Subgerencia de tecnologías de información e informática', 'code' => 'STII', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'tecnologías de la información e informática'],
            ['id' => 15, 'name' => 'Subgerencia de registro civil y archivos', 'code' => 'SRCA', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'registro civil y archivos'],

            ['id' => 16, 'name' => 'Sub gerencia de recursos humanos', 'code' => 'SRH', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'recursos humanos'],
            ['id' => 17, 'name' => 'Sub gerencia de logística, abastecimiento y patrimonio', 'code' => 'SLAP', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'logística, abastecimiento y patrimonio'],
            ['id' => 18, 'name' => 'Sub gerencia de contabilidad', 'code' => 'SGC', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'contabilidad'],
            ['id' => 19, 'name' => 'Sub gerencia de tesorería', 'code' => 'SGT', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'tesorería'],
            ['id' => 20, 'name' => 'Sub gerencia de programación y mantenimiento de equipo mecánico', 'code' => 'SPME', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'programación y mantenimiento de equipo mecánico'],

            ['id' => 21, 'name' => 'Sub gerencia de planeamiento institucional y programación de multianual de inversiones', 'code' => 'SPIP', 'description' => '', 'is_active' => 1, 'parent_id' => 4, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'planeamiento institucional y programación de multianual de inversiones'],
            ['id' => 22, 'name' => 'Sub gerencia de formulación de proyectos y cooperación técnica', 'code' => 'SFPC', 'description' => '', 'is_active' => 1, 'parent_id' => 4, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'formulación de proyectos y cooperación técnica'],
            ['id' => 23, 'name' => 'Sub gerencia de presupuesto y racionalización', 'code' => 'SPR', 'description' => '', 'is_active' => 1, 'parent_id' => 4, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'presupuesto y racionalización'],

            ['id' => 24, 'name' => 'Sub gerencia de gestión y salud publica', 'code' => 'SGSP', 'description' => '', 'is_active' => 1, 'parent_id' => 6, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'gestión y salud publica'],
            ['id' => 25, 'name' => 'Sub gerencia de seguridad ciudadana', 'code' => 'SGSC', 'description' => '', 'is_active' => 1, 'parent_id' => 6, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'seguridad ciudadana'],
            ['id' => 26, 'name' => 'Sub gerencia de limpieza, parques y segregación de residuos solidos', 'code' => 'SLPS', 'description' => '', 'is_active' => 1, 'parent_id' => 6, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'limpieza, parques y segregación de residuos solidos'],

            ['id' => 27, 'name' => 'Sub gerencia de planeamiento y control urbano', 'code' => 'SPCU', 'description' => '', 'is_active' => 1, 'parent_id' => 7, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'planeamiento y control urbano'],
            ['id' => 28, 'name' => 'Sub gerencia de catastro y autorizaciones urbanas', 'code' => 'SCAU', 'description' => '', 'is_active' => 1, 'parent_id' => 7, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'catastro y autorizaciones urbanas'],
            ['id' => 29, 'name' => 'Sub gerencia de transportes', 'code' => 'SGTR', 'description' => '', 'is_active' => 1, 'parent_id' => 7, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'transportes'],

            ['id' => 30, 'name' => 'Sub gerencia de estudios definitivos', 'code' => 'SGED', 'description' => '', 'is_active' => 1, 'parent_id' => 8, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'estudios definitivos'],
            ['id' => 31, 'name' => 'Sub gerencia de ingeniería y obras públicas', 'code' => 'SIOP', 'description' => '', 'is_active' => 1, 'parent_id' => 8, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'ingeniería y obras públicas'],
            ['id' => 32, 'name' => 'Sub gerencia de mantenimiento de infraestructura', 'code' => 'SGMI', 'description' => '', 'is_active' => 1, 'parent_id' => 8, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'mantenimiento de infraestructura'],

            ['id' => 33, 'name' => 'Sub gerencia de gestión de programas sociales', 'code' => 'SGPS', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'gestión de programas sociales'],
            ['id' => 34, 'name' => 'Sub gerencia de desarrollo cultural y deportes', 'code' => 'SDCD', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo cultural y deportes'],
            ['id' => 35, 'name' => 'Sub gerencia de defensa y asistencia a poblaciones vulnerables', 'code' => 'SDAP', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'defensa y asistencia a poblaciones vulnerables'],
            ['id' => 36, 'name' => 'Sub gerencia de participación ciudadana', 'code' => 'SGPC', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'participación ciudadana'],

            ['id' => 37, 'name' => 'Sub gerencia de fomento de la inversión de empleo y desarrollo agropecuario', 'code' => 'SFIE', 'description' => '', 'is_active' => 1, 'parent_id' => 10, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'fomento de la inversión de empleo y desarrollo agropecuario'],
            ['id' => 38, 'name' => 'Sub gerencia de administración de mercados y comercio', 'code' => 'SAMC', 'description' => '', 'is_active' => 1, 'parent_id' => 10, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'administración de mercados y comercio'],
            ['id' => 39, 'name' => 'Sub gerencia de fiscalización y control', 'code' => 'SFC', 'description' => '', 'is_active' => 1, 'parent_id' => 10, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'fiscalización y control'],

            ['id' => 40, 'name' => 'Sub gerencia de operaciones y socialización tributaria', 'code' => 'SOST', 'description' => '', 'is_active' => 1, 'parent_id' => 11, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'operaciones y socialización tributaria'],
            ['id' => 41, 'name' => 'Sub gerencia de fiscalización tributaria', 'code' => 'SFT', 'description' => '', 'is_active' => 1, 'parent_id' => 11, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'fiscalización tributaria'],

            // OFICINAS
            ['id' => 42, 'name' => 'Secretaría General', 'code' => 'SG', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Secretaría General'],
            ['id' => 43, 'name' => 'Ejecución Coactiva', 'code' => 'EC', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Ejecución Coactiva'],
            ['id' => 44, 'name' => 'Gestión de Riesgos de Desastres y Defensa Civil', 'code' => 'GRDD', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Gestión de Riesgos de Desastres y Defensa Civil'],
            ['id' => 45, 'name' => 'Supervisión y Liquidación de Inversiones', 'code' => 'SLI', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Supervisión y Liquidación de Inversiones'],

            // UNIDADES
            ['id' => 46, 'name' => 'Unidad de Limpieza Pública', 'code' => 'ULP', 'description' => '', 'is_active' => 1, 'parent_id' => 26, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Limpieza Pública'],
            ['id' => 47, 'name' => 'Unidad de Parques y Jardines', 'code' => 'UPJ', 'description' => '', 'is_active' => 1, 'parent_id' => 26, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Parques y Jardines'],
            ['id' => 48, 'name' => 'Unidad de Segregación', 'code' => 'US', 'description' => '', 'is_active' => 1, 'parent_id' => 26, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Segregación'],

            ['id' => 49, 'name' => 'Unidad Local de Empadronamiento', 'code' => 'ULE', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Local de Empadronamiento'],
            ['id' => 50, 'name' => 'Unidad del Programa Vaso de Leche', 'code' => 'UPVL', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Programa de Vaso de Leche'],
            ['id' => 51, 'name' => 'Unidad del Padrón Nominal', 'code' => 'UPN', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Padrón Nominal'],
            ['id' => 52, 'name' => 'Unidad del Programa Pensión 65', 'code' => 'UPP', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Programa Pensión 65'],

            ['id' => 53, 'name' => 'Unidad del CIAM', 'code' => 'CIAM', 'description' => 'Centro Integral de Atención al Adulto Mayor', 'is_active' => 1, 'parent_id' => 35, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'CIAM'],
            ['id' => 54, 'name' => 'Unidad de OMAPED', 'code' => 'OMAP', 'description' => 'Oficina Municipal de Atención a las Personas con Discapacidad', 'is_active' => 1, 'parent_id' => 35, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'OMAPED'],
            ['id' => 55, 'name' => 'Unidad de DEMUNA', 'code' => 'DEMU', 'description' => 'Defensoría Municipal del Niño y Adolescente', 'is_active' => 1, 'parent_id' => 35, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'DEMUNA'],

            ['id' => 56, 'name' => 'Unidad de Desarrollo Agropecuario', 'code' => 'UDA', 'description' => '', 'is_active' => 1, 'parent_id' => 37, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Desarrollo Agropecuario'],

            ['id' => 57, 'name' => 'Unidad de Operaciones y Fiscalización', 'code' => 'UOF', 'description' => '', 'is_active' => 1, 'parent_id' => 39, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Operaciones y Fiscalización'],
            ['id' => 58, 'name' => 'Unidad de Difusión, Investigaciones y Sanciones', 'code' => 'UDIS', 'description' => '', 'is_active' => 1, 'parent_id' => 39, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Difusión, Investigaciones y Sanciones'],
        ];

        // $areas = [
        //     // GERENCIAS (sin parent_id)
        //     ['id' => 1, 'name' => 'Gerencia municipal', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'municipal'],
        //     ['id' => 2, 'name' => 'Gerencia de comunicaciones y atención al usuario', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'comunicaciones y atención al usuario'],
        //     ['id' => 3, 'name' => 'Gerencia de administración y finanzas', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'administración y finanzas'],
        //     ['id' => 4, 'name' => 'Gerencia de planeamiento, presupuesto e inversiones', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'planeamiento, presupuesto e inversiones'],
        //     ['id' => 5, 'name' => 'Oficina de asesoría jurídica', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Oficina de asesoría jurídica'],
        //     ['id' => 6, 'name' => 'Gerencia de desarrollo ambiental y servicios públicos', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo ambiental y servicios públicos'],
        //     ['id' => 7, 'name' => 'Gerencia de desarrollo urbano', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo urbano'],
        //     ['id' => 8, 'name' => 'Gerencia de infraestructura', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'infraestructura'],
        //     ['id' => 9, 'name' => 'Gerencia de desarrollo social', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo social'],
        //     ['id' => 10, 'name' => 'Gerencia de desarrollo económico local', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo económico local'],
        //     ['id' => 11, 'name' => 'Gerencia de administración tributaria', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 1, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'administración tributaria'],

        //     // SUBGERENCIAS (con parent_id de su gerencia respectiva)
        //     ['id' => 12, 'name' => 'Subgerencia de atención al usuario y trámite documentario', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'atención al usuario y trámite documentario'],
        //     ['id' => 13, 'name' => 'Subgerencia de comunicaciones y relaciones públicas', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'comunicaciones y relaciones públicas'],
        //     ['id' => 14, 'name' => 'Subgerencia de tecnologías de información e informática', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'tecnologías de la información e informática'],
        //     ['id' => 15, 'name' => 'Subgerencia de registro civil y archivos', 'description' => '', 'is_active' => 1, 'parent_id' => 2, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'registro civil y archivos'],

        //     ['id' => 16, 'name' => 'Sub gerencia de recursos humanos', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'recursos humanos'],
        //     ['id' => 17, 'name' => 'Sub gerencia de logística, abastecimiento y patrimonio', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'logística, abastecimiento y patrimonio'],
        //     ['id' => 18, 'name' => 'Sub gerencia de contabilidad', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'contabilidad'],
        //     ['id' => 19, 'name' => 'Sub gerencia de tesorería', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'tesorería'],
        //     ['id' => 20, 'name' => 'Sub gerencia de programación y mantenimiento de equipo mecánico', 'description' => '', 'is_active' => 1, 'parent_id' => 3, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'programación y mantenimiento de equipo mecánico'],

        //     ['id' => 21, 'name' => 'Sub gerencia de planeamiento institucional y programación de multianual de inversiones', 'description' => '', 'is_active' => 1, 'parent_id' => 4, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'planeamiento institucional y programación de multianual de inversiones'],
        //     ['id' => 22, 'name' => 'Sub gerencia de formulación de proyectos y cooperación técnica', 'description' => '', 'is_active' => 1, 'parent_id' => 4, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'formulación de proyectos y cooperación técnica'],
        //     ['id' => 23, 'name' => 'Sub gerencia de presupuesto y racionalización', 'description' => '', 'is_active' => 1, 'parent_id' => 4, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'presupuesto y racionalización'],

        //     ['id' => 24, 'name' => 'Sub gerencia de gestión y salud publica', 'description' => '', 'is_active' => 1, 'parent_id' => 6, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'gestión y salud publica'],
        //     ['id' => 25, 'name' => 'Sub gerencia de seguridad ciudadana', 'description' => '', 'is_active' => 1, 'parent_id' => 6, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'seguridad ciudadana'],
        //     ['id' => 26, 'name' => 'Sub gerencia de limpieza, parques y segregación de residuos solidos', 'description' => '', 'is_active' => 1, 'parent_id' => 6, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'limpieza, parques y segregación de residuos solidos'],

        //     ['id' => 27, 'name' => 'Sub gerencia de planeamiento y control urbano', 'description' => '', 'is_active' => 1, 'parent_id' => 7, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'planeamiento y control urbano'],
        //     ['id' => 28, 'name' => 'Sub gerencia de catastro y autorizaciones urbanas', 'description' => '', 'is_active' => 1, 'parent_id' => 7, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'catastro y autorizaciones urbanas'],
        //     ['id' => 29, 'name' => 'Sub gerencia de transportes', 'description' => '', 'is_active' => 1, 'parent_id' => 7, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'transportes'],

        //     ['id' => 30, 'name' => 'Sub gerencia de estudios definitivos', 'description' => '', 'is_active' => 1, 'parent_id' => 8, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'estudios definitivos'],
        //     ['id' => 31, 'name' => 'Sub gerencia de ingeniería y obras públicas', 'description' => '', 'is_active' => 1, 'parent_id' => 8, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'ingeniería y obras públicas'],
        //     ['id' => 32, 'name' => 'Sub gerencia de mantenimiento de infraestructura', 'description' => '', 'is_active' => 1, 'parent_id' => 8, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'mantenimiento de infraestructura'],

        //     ['id' => 33, 'name' => 'Sub gerencia de gestión de programas sociales', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'gestión de programas sociales'],
        //     ['id' => 34, 'name' => 'Sub gerencia de desarrollo cultural y deportes', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'desarrollo cultural y deportes'],
        //     ['id' => 35, 'name' => 'Sub gerencia de defensa y asistencia a poblaciones vulnerables', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'defensa y asistencia a poblaciones vulnerables'],
        //     ['id' => 36, 'name' => 'Sub gerencia de participación ciudadana', 'description' => '', 'is_active' => 1, 'parent_id' => 9, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'participación ciudadana'],

        //     ['id' => 37, 'name' => 'Sub gerencia de fomento de la inversión de empleo y desarrollo agropecuario', 'description' => '', 'is_active' => 1, 'parent_id' => 10, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'fomento de la inversión de empleo y desarrollo agropecuario'],
        //     ['id' => 38, 'name' => 'Sub gerencia de administración de mercados y comercio', 'description' => '', 'is_active' => 1, 'parent_id' => 10, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'administración de mercados y comercio'],
        //     ['id' => 39, 'name' => 'Sub gerencia de fiscalización y control', 'description' => '', 'is_active' => 1, 'parent_id' => 10, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'fiscalización y control'],

        //     ['id' => 40, 'name' => 'Sub gerencia de operaciones y socialización tributaria', 'description' => '', 'is_active' => 1, 'parent_id' => 11, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'operaciones y socialización tributaria'],
        //     ['id' => 41, 'name' => 'Sub gerencia de fiscalización tributaria', 'description' => '', 'is_active' => 1, 'parent_id' => 11, 'type_id' => 2, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'fiscalización tributaria'],

        //     // OFICINAS
        //     ['id' => 42, 'name' => 'Secretaría General', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Secretaría General'],
        //     ['id' => 43, 'name' => 'Ejecución Coactiva', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Ejecución Coactiva'],
        //     ['id' => 44, 'name' => 'Gestión de Riesgos de Desastres y Defensa Civil', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Gestión de Riesgos de Desastres y Defensa Civil'],
        //     ['id' => 45, 'name' => 'Supervisión y Liquidación de Inversiones', 'description' => '', 'is_active' => 1, 'parent_id' => null, 'type_id' => 4, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Supervisión y Liquidación de Inversiones'],

        //     // UNIDADES
        //     ['id' => 46, 'name' => 'Unidad de Limpieza Pública', 'description' => '', 'is_active' => 1, 'parent_id' => 26, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Limpieza Pública'],
        //     ['id' => 47, 'name' => 'Unidad de Parques y Jardines', 'description' => '', 'is_active' => 1, 'parent_id' => 26, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Parques y Jardines'],
        //     ['id' => 48, 'name' => 'Unidad de Segregación', 'description' => '', 'is_active' => 1, 'parent_id' => 26, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Segregación'],

        //     ['id' => 49, 'name' => 'Unidad Local de Empadronamiento', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Local de Empadronamiento'],
        //     ['id' => 50, 'name' => 'Unidad del Programa Vaso de Leche', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Programa de Vaso de Leche'],
        //     ['id' => 51, 'name' => 'Unidad del Padrón Nominal', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Padrón Nominal'],
        //     ['id' => 52, 'name' => 'Unidad del Programa Pensión 65', 'description' => '', 'is_active' => 1, 'parent_id' => 33, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Programa Pensión 65'],

        //     ['id' => 53, 'name' => 'Unidad del CIAM', 'description' => 'Centro Integral de Atención al Adulto Mayor', 'is_active' => 1, 'parent_id' => 35, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'CIAM'],
        //     ['id' => 54, 'name' => 'Unidad de OMAPED', 'description' => 'Oficina Municipal de Atención a las Personas con Discapacidad', 'is_active' => 1, 'parent_id' => 35, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'OMAPED'],
        //     ['id' => 55, 'name' => 'Unidad de DEMUNA', 'description' => 'Defensoría Municipal del Niño y Adolescente', 'is_active' => 1, 'parent_id' => 35, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'DEMUNA'],

        //     ['id' => 56, 'name' => 'Unidad de Desarrollo Agropecuario', 'description' => '', 'is_active' => 1, 'parent_id' => 37, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Desarrollo Agropecuario'],

        //     ['id' => 57, 'name' => 'Unidad de Operaciones y Fiscalización', 'description' => '', 'is_active' => 1, 'parent_id' => 39, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Operaciones y Fiscalización'],
        //     ['id' => 58, 'name' => 'Unidad de Difusión, Investigaciones y Sanciones', 'description' => '', 'is_active' => 1, 'parent_id' => 39, 'type_id' => 3, 'created_at' => now(), 'updated_at' => now(), 'short_name' => 'Difusión, Investigaciones y Sanciones'],
        // ];




        DB::table('areas')->insert($areas);
    }
}
