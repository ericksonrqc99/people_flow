<div class="relative">
    <div class="absolute top-0 right-0 z-10 p-4">
        <div class="flex items-center gap-2">
            <label for="year-select" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Año:
            </label>
            <select 
                id="year-select"
                wire:model.live="year"
                class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
                @php
                    $currentYear = (int) now()->year;
                    for ($i = $currentYear - 5; $i <= $currentYear; $i++) {
                        $selected = $i === $this->year ? 'selected' : '';
                        echo "<option value='$i' $selected>$i</option>";
                    }
                @endphp
            </select>
        </div>
    </div>
</div>




