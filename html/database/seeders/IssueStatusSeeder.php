<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'color' => 'gray',
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'name' => '進行中',
                'color' => 'blue',
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'name' => '処理済み',
                'color' => 'grape',
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'name' => '完了',
                'color' => 'green',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
