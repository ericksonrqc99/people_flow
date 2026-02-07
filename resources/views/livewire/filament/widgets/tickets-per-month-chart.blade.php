@php
    $currentYear = (int) now()->year;
@endphp

<div class="flex items-center justify-between mb-4 px-6 pt-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Tickets por Mes - Año {{ $this->year }}
    </h3>
    
    <select 
        wire:model.live="year"
        class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
    >
        @for ($i = $currentYear - 5; $i <= $currentYear; $i++)
            <option value="{{ $i }}" @selected($i === $this->year)>
                {{ $i }}
            </option>
        @endfor
    </select>
</div>

