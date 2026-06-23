<?php

namespace App\Http\Actions;

use DateTime;

class CalculateQuotation
{
    private array $ageLookup = [];

    public function __construct()
    {
        foreach (config('age-load') as $row) {
            for ($i = $row['min']; $i <= $row['max']; $i++) {
                $this->ageLookup[$i] = $row['load'];
            }
        }
    }

    public function execute(array $data): float
    {
        $ages = $data['age'];

        $datetime1 = new DateTime($data['startDate']);
        $datetime2 = new DateTime($data['endDate']);
        $interval = $datetime1->diff($datetime2);
        $days = $interval->format('%a');

        $fixedRate = 3;

        return collect($ages)->sum(function ($age) use ($days, $fixedRate) {
            $ageLoad = $this->ageLookup[$age];

            return $fixedRate * $ageLoad * $days;
        });
    }
}
