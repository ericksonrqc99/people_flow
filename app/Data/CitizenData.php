<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;

class CitizenData extends Data
{
    public function __construct(
        #[Required]
        public int $document_number,
        #[Required]
        public string $names,
        #[Required]
        public string $first_surname,
        #[Required]
        public string $second_surname,
        #[Required]
        public string $departament,
        #[Required]
        public string $province,
        #[Required]
        public string $district,
        #[Required]
        public string $address,
    ) {}
}
