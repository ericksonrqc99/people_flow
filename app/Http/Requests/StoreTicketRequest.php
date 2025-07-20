<?php

namespace App\Http\Requests;

use App\Models\Area;
use Illuminate\Foundation\Http\FormRequest;
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
            'citizen.document_number' => 'required|integer|min:7|max:9',
            'citizen.names' => 'required|string|max:100',
            'citizen.first_surname' => 'required|string|max:100',
            'citizen.second_surname' => 'string|max:100',
            'citizen.departament' => 'required|string|max:100',
            'citizen.province' => 'required|string|max:100',
            'citizen.district' => 'required|string|max:100',
            'citizen.address' => 'required|string|max:100',
            'citizen.is_active' => 'required|boolean'
        ];
    }
}
