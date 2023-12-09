<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class IssueStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('issue_statuses')->insert([
            [
                'name' => '未対応',
                'color' => 'rgb(134,142,150)',
                'created_at' => now(),
                'updated_at' => now()
            ], [
                'name' => '進行中',
                'color' => 'rgb(51,155,240)',
                'created_at' => now(),
                'updated_at' => now()
            ], [
                'name' => '処理済み',
                'color' => 'rgb(132,94,247)',
                'created_at' => now(),
                'updated_at' => now()
            ], [
                'name' => '完了',
                'color' => 'rgb(18,184,134)',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
