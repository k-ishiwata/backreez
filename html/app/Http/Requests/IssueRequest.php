<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class IssueRequest extends FormRequest
{
    private Project|null $project;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        if ($this->isNotFilled('project_id')) {
            return false;
        }

        // アサインされていないプロジェクトへは登録不可
        $this->project = Project::find($this->input('project_id'));
        if (is_null($this->project)) {
            return false;
        }

        if (! $this->project->isAssign(Auth::id())) {
            return false;
        }

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
            'project_id'  => 'required|integer',
            'due_at'      => 'nullable|date',
            'user_id'     => [
                'nullable',
                'integer',
                function ($attribute, $value, $fail) {
                    if (! $this->project->isAssign($value)) {
                        $fail('指定したユーザーはこのプロジェクトにアサインされてません。');
                    }
                },
            ],
        ];
    }
}
