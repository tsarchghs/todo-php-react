<?php

use Illuminate\Database\Seeder;
use App\Task;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Task::truncate();

        $faker = \Faker\Factory::create("de_DE");

        for ($i=0; $i <50; $i++){
        	Task::create([
                "user_id" => $faker->randomDigitNot(0),
        		"title" => $faker->sentence,
        		"description" => $faker->paragraph
        	]);
        }
    }
}
