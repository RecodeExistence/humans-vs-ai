<?php

use Illuminate\Database\Seeder;

class StoreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('store')->insert([
            'Name' => 'Medkit',
            'Cost' => '50',
            'Description' => 'Increases your health by 10',
            'Method' => '#'
        ]);

        DB::table('store')->insert([
            'Name' => 'Coffee',
            'Cost' => '50',
            'Description' => 'Increases your energy by 10',
            'Method' => '#'
        ]);
    }
}
