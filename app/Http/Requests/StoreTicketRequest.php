<?php

namespace App\Http\Requests;

use App\Models\Area;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
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
            'area' => 'required|array',
            'area.name' => 'required|string|max:100',
            'area.code' => 'required|string|max:100',
            'area.short_name' => 'required|string|max:100',
            'area.description' => 'nullable|string|max:255',
            'area.is_active' => 'required|boolean',
            'area.parent_id' => 'nullable|integer|exists:areas,id',
            'area.type_id' => ['nullable', 'integer', Rule::exists('types', 'id')->where('model', Area::class)],

            'citizen' => 'required|array',
            'citizen.document_number' => 'required|digits_between:7,10',
            'citizen.names' => 'required|string|max:100',
            'citizen.first_surname' => 'nullable|required|string|max:100',
            'citizen.second_surname' => 'nullable|string|max:100',
            'citizen.departament' => 'nullable|string|max:100',
            'citizen.province' => 'nullable|string|max:100',
            'citizen.district' => 'nullable|string|max:100',
            'citizen.address' => 'nullable|string|max:100',
        ];
    }




    protected function failedValidation(Validator $validator)
    {

        Log::warning('Validation Failed: StoreTicketRequest', [
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
