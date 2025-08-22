<?php

namespace App\Http\Requests;

use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ticket' => 'required|array',
            'ticket.id' => 'required|integer|max:100',
            'ticket.code' => 'required|string|max:100',
            'ticket.visible_code' => 'required|string|max:100',
            'ticket.area_id' => 'required|integer|exists:areas,id',
            'ticket.citizen_id' => 'required|integer|exists:citizens,id',
            'ticket.registered_by_id' => 'required|integer|exists:users,id',
            'ticket.attended_by_id' => 'nullable|integer|exists:users,id',
            'ticket.status_id' => ['required', 'integer', Rule::exists('types', 'id')->where('model', Ticket::class)],
            'ticket.time_admission' => 'nullable|date',
            'ticket.time_departure' => 'nullable|date',
            'ticket.observations' => 'nullable|string|max:255',
            'ticket.updated_at' => 'required|date', // Para optimistic locking
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        Log::warning('Validation Failed: UpdateTicketRequest', [
            // User context
            'user_id' => Auth::id(),
            'user_email' => Auth::user()?->email,

            // Request context  
            'ip' => $this->ip(),
            'user_agent' => $this->userAgent(),
            'url' => $this->fullUrl(),
            'method' => $this->method(),

            // Validation context
            'errors' => $validator->errors()->toArray(),
            'failed_fields' => array_keys($validator->errors()->toArray()),
            'request_data' => $this->except(['password', 'password_confirmation']),

            // Timing context
            'timestamp' => now()->toISOString(),
            'route' => $this->route()?->getName(),

            // Additional context
            'session_id' => session()->getId(),
            'referer' => $this->header('referer'),
        ]);

        // Call parent to maintain default behavior
        parent::failedValidation($validator);
    }
}
