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

        .fi-wi-chart>.fi-section,
        .fi-wi-chart>.fi-card {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
        }

        .fi-wi-chart canvas {
            max-height: none !important;
        }
    </style>
   
    @if (method_exists($this, 'filtersForm'))
    {{ $this->filtersForm }}
    @endif

    <x-filament-widgets::widgets
        :columns="$this->getColumns()"
        :data="[
                ...(property_exists($this, 'filters') ? ['filters' => $this->filters] : []),
                ...$this->getWidgetData(),
            ]"
        :widgets="$this->getVisibleWidgets()" />
    
</x-filament-panels::page>