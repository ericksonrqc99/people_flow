<x-filament-panels::page class="fi-dashboard-page">
    <style>
        .fi-widgets {
            align-items: stretch;
        }

        .fi-wi-chart {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .fi-wi-chart > .fi-section,
        .fi-wi-chart > .fi-card {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
        }

        .fi-wi-chart canvas {
            max-height: none !important;
        }
    </style>
    @if (! ($isSuperAdmin ?? false))
        <div class="flex justify-center py-10">
            <a
                href="{{ $homeUrl ?? url('/') }}"
                class="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-500"
            >
                Ir a inicio
            </a>
        </div>
    @else
        @if (method_exists($this, 'filtersForm'))
            {{ $this->filtersForm }}
        @endif

        <x-filament-widgets::widgets
            :columns="$this->getColumns()"
            :data="[
                ...(property_exists($this, 'filters') ? ['filters' => $this->filters] : []),
                ...$this->getWidgetData(),
            ]"
            :widgets="$this->getVisibleWidgets()"
        />
    @endif
</x-filament-panels::page>
