<?php

namespace App\Http\Actions;

use DateTime;

class CalculateQuotation
{
    public function execute(array $data): float
    {
        $ages = $data['age'];

        $datetime1 = new DateTime($data['startDate']);
        $datetime2 = new DateTime($data['endDate']);
        $interval = $datetime1->diff($datetime2);
        $days = $interval->format('%a');

        $fixedRate = 3;

        return collect($ages)->sum(function ($age) use ($days, $fixedRate) {
            $ageLoad = $this->getAgeLoad($age);

            return $fixedRate * $ageLoad * $days;
        });
    }

    private function getAgeLoad(int $age): float
    {
        return collect(config('age-load'))
            ->first(function ($row) use ($age) {
                return $age >= $row['min'] && $age <= $row['max'];
            })['load'];
    }
}
