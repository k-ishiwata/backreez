<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IssueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'subject'     => 'required|max:255',
            'body'        => 'string|max:4000',
            'status_id'   => 'nullable|integer',
            'priority_id' => 'nullable|integer',
            'project_key' => 'required|string',
            'due_at'      => 'nullable|date',
        ];
    }
}
