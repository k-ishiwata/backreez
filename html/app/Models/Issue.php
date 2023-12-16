<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Issue extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'subject',
        'body',
        'status_id',
        'priority_id',
        'project_key',
        'due_at',
        'user_id',
    ];

    protected $casts = [
        'due_at' => 'datetime',
    ];

    /**
     * @return BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_key', 'key');
    }

    /**
     * @return HasOne
     */
    public function status(): HasOne
    {
        return $this->hasOne(IssueStatus::class, 'id', 'status_id');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 絞り込み検索
     *
     * @param  Builder  $query
     * @param  Request  $request
     * @return Builder
     */
    public function scopeSearch(Builder $query, Request $request): Builder
    {
        // プロジェクトキーで絞り込む
        if ($request->filled('project_key')) {
            $query->where('project_key', $request->input('project_key'));
        }

        // 件名で絞り込む
        if ($request->filled('subject')) {
            $query->where('subject', 'like', "%{$request->input('subject')}%");
        }

        // 担当で絞り込む
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->integer('user_id'));
        }

        // スタータスで絞り込む
        if ($request->filled('status_id')) {
            $query->where('status_id', $request->integer('status_id'));
        }

        // 優先度で絞り込む
        if ($request->filled('priority_id')) {
            $query->where('priority_id', $request->integer('priority_id'));
        }

        // 登録日で絞り込む
        if ($request->filled('created_at')) {
            $date = $request->date('created_at');
            $query->whereBetween('created_at', [
                $date?->format('Y-m-d 00:00:00'), $date?->format('Y-m-d 23:59:59')
            ]);
        }

        return $query;
    }
}
