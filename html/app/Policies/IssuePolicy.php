<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Issue;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class IssuePolicy
{
    use HandlesAuthorization;

    /**
     * プロジェクトに割り当てられていないユーザーは閲覧不可
     *
     * @param  User  $user
     * @param  Issue  $issue
     * @return Response
     */
    public function isAssign(User $user, Issue $issue): Response
    {
        return $issue->project->isAssign($user->id)
            ? Response::allow()
            : Response::deny();
    }
}
