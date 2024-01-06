<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * プロジェクトに割り当てられていないユーザーは閲覧不可
     *
     * @param  User  $user
     * @param  Project  $project
     * @return Response
     */
    public function isAssign(User $user, Project $project): Response
    {
        return $project->isAssign($user->id)
            ? Response::allow()
            : Response::deny();
    }
}
