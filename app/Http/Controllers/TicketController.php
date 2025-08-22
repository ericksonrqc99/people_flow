<?php

namespace App\Http\Controllers;

use App\Data\CitizenData;
use App\Events\TicketCreated;
use App\Events\TicketDerived;
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
use Doctrine\DBAL\Platforms\DB2Platform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TicketController extends Controller
{
    public string $thMessage;

    public function __construct(
        public CitizenService $citizenService,
        public TicketCorrelativeService $ticketCorrelativeService,
        public AreaService $areaService,
        public TicketService $ticketService,
        public TypeService $typeService,
        public UserService $userService
    ) {
        $this->thMessage = __('Ocurrió un problema, por favor intente nuevamente más tarde.');
    }

    public function ticketGenerator()
    {
        try {
            $areas = $this->areaService->getActiveAreas();
            return Inertia::render('ticket-generator/index', ['areas' => $areas]);
        } catch (\Throwable $th) {
            Log::error('Error in TicketController@ticketGenerator', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);
            return Inertia::render('info/index', ['message' => $this->thMessage]);
        }
    }

    public function ticketPanel()
    {
        try {
            //checks if the current user has an assigned area
            if (Auth::user()->area_id) {
                $currentUserId = Auth::id();

                // Check if user has an active ticket assigned (status "atendiendo")
                $userActiveTicket = $this->ticketService->getUserActiveTicket($currentUserId);

                if ($userActiveTicket) {
                    // User has an active ticket, show only that ticket
                    $ticketsFind = [$userActiveTicket];
                    $userHasActiveTicket = true;
                } else {
                    // User doesn't have active tickets, show all area tickets
                    $ticketsFind = $this->ticketService->getTicketsTodayByArea($this->areaService->getAreaById(Auth::user()->area_id));
                    $userHasActiveTicket = false;
                }

                //get types all ticket types
                $ticketTypes = $this->typeService->getAllTypesForModel(Ticket::class);

                // get all active areas for derivation
                $areas = $this->areaService->getActiveAreas();

                // return the tickets to the view
                return Inertia::render('tickets/index', [
                    'tickets' => $ticketsFind,
                    'ticketTypes' => $ticketTypes,
                    'userHasActiveTicket' => $userHasActiveTicket,
                    'activeTicket' => $userActiveTicket,
                    'areas' => $areas
                ]);
            }
            return Inertia::render('info/index', ['message' => __('No tienes un área asignada, comunícate con el administrador del sistema.')]);
        } catch (\Throwable $th) {
            Log::error('Error in TicketController@ticketPanel', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);
            return Inertia::render('info/index', ['message' => $this->thMessage]);
        }
    }

    // return view
    public function store(StoreTicketRequest $request)
    {
        try {
            // Use database transaction to ensure data consistency
            $ticket = DB::transaction(function () use ($request) {
                // Authenticated user ID
                $authUserId = Auth::id();
                if (!$authUserId) {
                    throw new \Exception('User not authenticated');
                }

                // Get validated area and citizen data from the request
                $reqArea = $request->input('area');
                $reqCitizen = $request->input('citizen');

                // Find area
                $area = $this->areaService->getAreaById($reqArea['id']);
                if (!$area) {
                    throw new \Exception('Failed area not found or deleted');
                }
                // Find or create citizen within transaction
                $citizen = $this->citizenService->getCitizenByDni($reqCitizen['document_number']);

                if (!$citizen) {
                    $citizen = $this->citizenService->storeCitizen($reqCitizen);
                    if (!$citizen) {
                        throw new \Exception('Failed to create citizen record');
                    }
                }
                // Generate ticket code
                $ticketCode = $this->ticketCorrelativeService->generateTicketCode($area);

                if (!$ticketCode) {
                    throw new \Exception('Failed to generate ticket code');
                }
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
                return $ticketWithRelations;
            });

            // Get all active areas
            $areas = $this->areaService->getActiveAreas();
            // Dispatch event after successful transaction
            TicketCreated::dispatch($ticket);
            // Return view
            return Inertia::render('ticket-generator/index', [
                'ticketGenerated' => [
                    'area' => $ticket->area,
                    'visible_code' => $ticket->visible_code,
                    'created_at' => $ticket->created_at
                        ->timezone(config('app.timezone'))
                        ->format('d-M-y H:i:s'),
                ],
                'areas' => $areas
            ]);
        } catch (\Exception $e) {

            // Log the error with detailed information
            if ($e->getMessage() === 'Failed area not found or deleted') {
                Log::error('Failed area not found or deleted', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                    'request_data' => $request->all()
                ]);
                return Inertia::render('info/index', ['message' => __('No se pudo encontrar el área seleccionada, por favor intente nuevamente.')]);
            }
            if ($e->getMessage() === 'Failed to generate ticket code') {
                Log::error('Generate ticket code creation failed', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                    'request_data' => $request->all()
                ]);
                return Inertia::render('info/index', ['message' => __('No se pudo generar el código de ticket, por favor intente nuevamente.')]);
            }
            if ($e->getMessage() === 'Failed to create citizen record') {
                Log::error('Failed to create citizen record', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                    'request_data' => $request->all()
                ]);
                return Inertia::render('info/index', ['message' => __('No se pudo crear el ciudadano, por favor intente nuevamente.')]);
            }
            throw $e; // Re-throw other exceptions to be caught by the general catch
        } catch (\Throwable $th) {
            dd($th);
            Log::error('Error in TicketController@store', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return Inertia::render('info/index', ['message' => $this->thMessage]);
        }
    }


    // return json response
    public function update(UpdateTicketRequest $request)
    {

        try {
            $validatedData = $request->validated();
            $ticket = DB::transaction(function () use ($validatedData) {
                // get ticket
                $ticket = $this->ticketService->getTicketForId($validatedData['ticket']['id']);

                // Check if the ticket exists
                if (!$ticket) {
                    throw new \Exception('Ticket not found or deleted');
                }

                // Optimistic locking: Check if ticket was modified by another user
                $sentUpdatedAt = new \Carbon\Carbon($validatedData['ticket']['updated_at']);
                if (!$ticket->updated_at->equalTo($sentUpdatedAt)) {
                    throw new \Exception('Ticket was modified by another user');
                }

                // update ticket (only database operations inside transaction)
                $ticket->update($validatedData['ticket']);
                $ticket->save();
                return $ticket;
            });

            // Dispatch event AFTER successful transaction
            UpdatedTicket::dispatch($ticket);

            // Return response AFTER successful transaction
            return response()->json([
                'ok' => true,
                'ticket' => $ticket,
                'message' => __('Ticket actualizado con éxito')
            ], 200);
        } catch (\Exception $e) {
            if ($e->getMessage() === 'Ticket not found or deleted') {
                Log::error('Ticket not found or deleted', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                    'request_data' => $request->all()
                ]);
                return response()->json(['ok' => false, 'message' => __('El ticket no fue encontrado, por favor intente nuevamente')], 404);
            }
            if ($e->getMessage() === 'Ticket was modified by another user') {
                Log::warning('Optimistic locking conflict', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'request_data' => $request->all()
                ]);
                return response()->json(['ok' => false, 'message' => __('Este ticket ya fue tomado por otro usuario')], 409);
            }
            throw $e; // Re-throw other exceptions to be caught by the general catch
        } catch (\Throwable $e) {
            // Log the error with detailed information
            Log::error('Error in TicketController@update', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return response()->json(['ok' => false, 'message' => $this->thMessage], 500);
        }
    }

    /**
     * Get server current time for client synchronization
     */
    public function getServerTime()
    {
        return response()->json([
            'server_time' => now()->format('Y-m-d H:i:s'),
            'server_time_iso' => now()->toISOString(),
            'timezone' => config('app.timezone'),
            'timestamp' => now()->timestamp
        ]);
    }

    /**
     * Derive ticket to another area
     */
    public function derive(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'ticket_id' => 'required|integer|exists:tickets,id',
                'to_area_id' => 'required|integer|exists:areas,id',
                'reason' => 'required|string|min:10|max:500',
            ]);

            $currentUserId = Auth::id();
            if (!$currentUserId) {
                throw new \Exception('User not authenticated');
            }

            $ticket = DB::transaction(function () use ($validatedData, $currentUserId) {
                // Get ticket with current area
                $ticket = $this->ticketService->getTicketForId($validatedData['ticket_id']);

                if (!$ticket) {
                    throw new \Exception('Ticket not found or deleted');
                }

                // Validate that ticket is currently being attended
                if ($ticket->status->type !== 'atendiendo') {
                    throw new \Exception('Only tickets being attended can be derived');
                }

                // Validate that current user is attending this ticket
                if ($ticket->attended_by_id !== $currentUserId) {
                    throw new \Exception('You can only derive tickets you are attending');
                }

                // Get destination area
                $toArea = $this->areaService->getAreaById($validatedData['to_area_id']);
                if (!$toArea) {
                    throw new \Exception('Destination area not found');
                }

                // Don't allow derivation to same area
                if ($ticket->area_id === $validatedData['to_area_id']) {
                    throw new \Exception('Cannot derive ticket to the same area');
                }

                // Store original area for event
                $fromAreaId = $ticket->area_id;

                // Find "en espera" status
                $enEsperaStatus = $this->typeService->getAllTypesForModel(Ticket::class)
                    ->where('type', 'en espera')
                    ->first();

                if (!$enEsperaStatus) {
                    throw new \Exception('Status "en espera" not found');
                }

                // Get current user for observations
                $currentUser = Auth::user();

                // Update ticket: change area, reset attended_by, change status to "en espera"
                $ticket->update([
                    'area_id' => $validatedData['to_area_id'],
                    'attended_by_id' => null,
                    'status_id' => $enEsperaStatus->id,
                    'time_admission' => null,
                    'observations' => $ticket->observations
                        ? $ticket->observations . "\n\n[Derivado desde área: " . $ticket->area->name . " por: " . $currentUser->name . "] " . $validatedData['reason']
                        : "[Derivado desde área: " . $ticket->area->name . " por: " . $currentUser->name . "] " . $validatedData['reason']
                ]);

                $ticket->save();

                // Load fresh relations for event
                $ticket->load(['area', 'citizen', 'status', 'attendedBy']);

                // Dispatch derivation event
                TicketDerived::dispatch($ticket, $fromAreaId, $validatedData['reason'], $currentUserId);

                // Also dispatch updated ticket for area that lost the ticket
                UpdatedTicket::dispatch($ticket);

                return $ticket;
            });

            return response()->json([
                'ok' => true,
                'ticket' => $ticket,
                'message' => __('Ticket derivado exitosamente')
            ], 200);
        } catch (\Exception $e) {
            if (in_array($e->getMessage(), [
                'Ticket not found or deleted',
                'Only tickets being attended can be derived',
                'You can only derive tickets you are attending',
                'Destination area not found',
                'Cannot derive ticket to the same area',
                'Status "en espera" not found'
            ])) {
                Log::warning('Derive ticket validation error', [
                    'message' => $e->getMessage(),
                    'user_id' => Auth::id(),
                    'request_data' => $request->all()
                ]);
                return response()->json(['ok' => false, 'message' => __($e->getMessage())], 400);
            }
            if ($e->getMessage() === 'User not authenticated') {
                return response()->json(['ok' => false, 'message' => __('Usuario no autenticado')], 401);
            }
            throw $e;
        } catch (\Throwable $e) {
            Log::error('Error in TicketController@derive', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return response()->json(['ok' => false, 'message' => $this->thMessage], 500);
        }
    }
}
