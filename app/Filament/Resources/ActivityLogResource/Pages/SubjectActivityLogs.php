<?php

namespace App\Filament\Resources\ActivityLogResource\Pages;

use App\Filament\Resources\ActivityLogResource;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class SubjectActivityLogs extends ListRecords
{
    protected static string $resource = ActivityLogResource::class;

    protected function getTableQuery(): Builder
    {
        $subjectId = (int) request()->route('subjectId');

        return parent::getTableQuery()
            ->where('subject_id', $subjectId);
    }

    public function getTitle(): string
    {
        $subjectId = (int) request()->route('subjectId');

        return "Historial de actividad - ID {$subjectId}";
    }

    protected function getHeaderActions(): array
    {
        return [];
    }
}
