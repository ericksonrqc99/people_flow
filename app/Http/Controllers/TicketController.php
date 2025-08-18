<?php

namespace App\Http\Controllers;

use App\Data\CitizenData;
use App\Events\TicketCreated;
use App\Events\UpdatedTicket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Area;
use App\Models\Citizen;
use App\Models\Ticket;
use App\Models\User;
use App\Services\AreaService;
use App\Services\CitizenService;
use App\Services\TicketCorrelativeService;
use App\Services\TicketService;
use App\Services\TypeService;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function __construct(
        public CitizenService $citizenService,
        public TicketCorrelativeService $ticketCorrelativeService,
        public AreaService $areaService,
        public TicketService $ticketService,
        public TypeService $typeService,
        public UserService $userService
    ) {}

    public function ticketGenerator()
    {
        try {
            $areas = $this->areaService->getActiveAreas();
            return Inertia::render('ticket-generator/index', ['areas' => $areas]);
        } catch (\Throwable $th) {
            Log::error('An error occurred in the ticketGenerator method inside the ticketcontroller controller.', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);
            return Inertia::render('info/index', ['message' => 'Ocurrió un problema, vuelva a intentarlo más tarde']);
        }
    }

    public function ticketPanel()
    {
        try {
            //checks if the current user has an assigned area
            if (Auth::user()->area_id) {
                // get tickets for the area of the current user
                $ticketsFind = $this->ticketService->getTicketsTodayByArea($this->areaService->getAreaById(Auth::user()->area_id));
                //get types all ticket types
                $ticketTypes = $this->typeService->getAllTypesForModel(Ticket::class);

                // return the tickets to the view

                return Inertia::render('tickets/index', ['tickets' => $ticketsFind, 'ticketTypes' => $ticketTypes]);
            }
            return Inertia::render('info/index', ['message' => 'El usuario no tiene un área asignada']);
        } catch (\Throwable $th) {
            Log::error('An error occurred in the ticketPanel method inside the ticketcontroller controller.', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);
            return Inertia::render('info/index', ['message' => 'Ocurrió un problema interno, intentalo de nuevo más tarde.']);
        }
    }

    // return view

    public function store(StoreTicketRequest $request)
    {
        try {
            // Use database transaction to ensure data consistency
            return DB::transaction(function () use ($request) {
                // Get all active areas
                $areas = $this->areaService->getActiveAreas();

                // Authenticated user ID
                $authUserId = Auth::id();

                // Get validated area and citizen data from the request
                $reqArea = $request->input('area');
                $reqCitizen = $request->input('citizen');

                // Find area
                $area = $this->areaService->getAreaById($reqArea['id']);
                if (!$area) {
                    Log::error("Area not found or deleted", ['area' => $reqArea]);
                    return Inertia::render('info/index', ['message' => 'Selected area does not exist.']);
                }

                // Find or create citizen within transaction
                $citizen = $this->citizenService->getCitizenByDni($reqCitizen['document_number']);
                if (!$citizen) {
                    $citizen = $this->citizenService->storeCitizen($reqCitizen);
                    if (!$citizen) {
                        Log::error("Failed not found or deleted", ['citizen_data' => $reqCitizen]);
                        throw new \Exception('Failed to create citizen record');
                    }
                }

                // Generate ticket code
                $ticketCode = $this->ticketCorrelativeService->generateTicketCode($area);

                // Create ticket
                $ticket = Ticket::create([
                    'code' => $ticketCode['area_code'] . '-' . $ticketCode['date'] . '-' . $ticketCode['correlative_count'],
                    'visible_code' => $ticketCode['area_code'] . '-' . $ticketCode['correlative_count'],
                    'area_id' => $area->id,
                    'citizen_id' => $citizen->id,
                    'registered_by_id' => $authUserId
                ]);

                // Load relations
                $ticketWithRelations = $ticket->load(['area', 'citizen']);

                // Dispatch event after successful transaction
                TicketCreated::dispatch($ticketWithRelations);

                // Return view
                return Inertia::render('ticket-generator/index', [
                    'ticketGenerated' => [
                        'area' => $ticketWithRelations->area,
                        'visible_code' => $ticketWithRelations->visible_code,
                        'created_at' => $ticketWithRelations->created_at
                            ->timezone(config('app.timezone'))
                            ->format('d-M-y H:i:s'),
                    ],
                    'areas' => $areas
                ]);
            });
        } catch (\Throwable $th) {
            Log::error('Error in TicketController@store', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return Inertia::render('info/index', ['message' => __('Ocurrió un error, por favor intente nuevamente más tarde.')]);
        }
    }


    // return json response
    public function update(UpdateTicketRequest $request)
    {
        try {
            $validatedData = $request->validated();
            // get ticket 
            $ticket = $this->ticketService->getTicketForId($validatedData['ticket']['id']);

            // Check if the ticket exists
            // If the ticket does not exist, log an error and return a response
            // If the ticket is deleted, log an error and return a response
            // If the ticket is not found, log an error and return a response

            if (!$ticket) {
                Log::error("Ticket not found or deleted", ['ticket_id' => $validatedData['ticket']['id']]);
                return response()->json(['ok' => false, 'message' => 'Ticket not found'], 404);
            }

            // update ticket
            $ticket->update($validatedData['ticket']);

            $ticket->save();

            UpdatedTicket::dispatch($ticket);

            return response()->json(['ok' => true, 'ticket' => $ticket, 'message' => 'Ticket actualizado con éxito'], 200);
        } catch (\Throwable $th) {
            // Log the error with detailed information
            Log::error('Error in TicketController@update', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return response()->json(['ok' => false, 'message' => __('Ocurrió un error, por favor intente nuevamente más tarde.')], 500);
        }
    }
}
