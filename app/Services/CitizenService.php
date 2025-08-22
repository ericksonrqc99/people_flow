<?php

namespace App\Services;

use App\Data\CitizenData;
use App\Models\Citizen;

class CitizenService
{
    public static function  storeCitizen(array $citizen)
    {

        $newCitizen = Citizen::create((new CitizenData(
            $document_number = $citizen['document_number'],
            $names = $citizen['names'],
            $first_surname = $citizen['first_surname'],
            $second_surname = $citizen['second_surname'],
            $departament = $citizen['departament'],
            $province = $citizen['province'],
            $district = $citizen['district'],
            $address = $citizen['address'],
        ))->toArray());

        return $newCitizen;
    }

    public function verifyExistsCitizenByDni(int $dni): bool
    {
        return Citizen::where('document_number', $dni)->exists();
    }

    public function getCitizenByDni(int $dni): Citizen | null
    {
        return Citizen::where('document_number', '=', $dni)->first();
    }
}
