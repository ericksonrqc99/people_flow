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

        public ?string $second_surname  = null,

        public ?string $departament  = null,

        public ?string $province  = null,

        public ?string $district  = null,

        public ?string $address  = null,
    ) {}
}
