<?php

namespace App\Http\Controllers;

use App\Data\CitizenData;
use App\Http\Requests\StoreTicketRequest;
use App\Models\Area;
use App\Models\Citizen;
use App\Models\Ticket;
use App\Services\AreaService;
use App\Services\CitizenService;
use App\Services\TicketCorrelativeService;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function __construct(
        public CitizenService $citizenService,
        public TicketCorrelativeService $ticketCorrelativeService,
        public AreaService $areaService
    ) {}

    public function generator()
    {
        $areas = $this->areaService->getActiveAreas();
        return Inertia::render('ticket-generator/index', ['areas' => $areas]);
    }

    public function store(Request $request)
    {
        $areas = $this->areaService->getActiveAreas();

        //the currently authenticated user will be registered in the registered_by field.
        $authUserId  = Auth::user()->id;
        $reqArea = $request->input('area');
        $reqCitizen = $request->input('citizen');
        $area = Area::find($reqArea['id']);

        if (!$area) {
            Log::error("The area does not exist: $reqArea");
            throw new \Exception("The user does not exist: $reqArea");
        }
        $existsCitizen = $this->citizenService->verifyExistsCitizenByDni($reqCitizen['dni']);

        $ticketCode =  $this->ticketCorrelativeService->generateTicketCode($area);

        if (!$existsCitizen) {
            $citizen = ($this->citizenService->storeCitizen($reqCitizen))->toArray();
        } else {
            $citizen = $this->citizenService->getCitizenByDni($reqCitizen['dni'])->toArray();
        }

        $ticket = Ticket::create([
            'code' => $ticketCode['area_code'] . '-' . $ticketCode['date'] . '-' . $ticketCode['correlative_count'],
            'visible_code' => $ticketCode['area_code'] . '-' . $ticketCode['correlative_count'],
            'area_id' => $reqArea['id'],
            'citizen_id' => $citizen['id'],
            'registered_by' => $authUserId
        ]);

        $ticketWithRelations = $ticket->load(['area', 'citizen']);

        return Inertia::render(
            'ticket-generator/index',
            [
                'ticketGenerated'
                => [
                    'area' => $ticketWithRelations['area'],
                    'visible_code' => $ticketWithRelations['visible_code'],
                    'created_at' => $ticketWithRelations['created_at']
                        ->timezone(config('app.timezone'))
                        ->format('d-M-y H:i:s'),
                ],
                'areas' => $areas
            ]
        );
    }
}
