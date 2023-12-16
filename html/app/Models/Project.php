<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'key', 'name', 'description'
    ];

    /**
     * @return HasMany
     */
    public function issues(): HasMany
    {
        return $this->hasMany(Issue::class, 'project_key', 'key');
    }
}
