@php
    $currentYear = (int) now()->year;
@endphp

<div class="space-y-4">
    {{-- Header con Selector --}}
    <div class="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            Tickets por creador por mes
        </h3>
        
        <div class="flex items-center gap-2">
            <label for="year-selector" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Año:
            </label>
            <select 
                id="year-selector"
                wire:model.live="year"
                class="h-9 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
                @for ($i = $currentYear - 5; $i <= $currentYear; $i++)
                    <option value="{{ $i }}" @selected($i === $this->year)>
                        {{ $i }}
                    </option>
                @endfor
            </select>
        </div>
    </div>

    {{-- Chart renderizado por parent --}}
    <div class="overflow-hidden">
        @parent
    </div>
</div>

