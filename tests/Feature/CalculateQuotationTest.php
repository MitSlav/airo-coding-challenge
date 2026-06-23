<?php

use App\Http\Actions\CalculateQuotation;

it('calculates the correct quotation total from age bands and date range', function () {
    $action = new CalculateQuotation();

    $total = $action->execute([
        'age' => [18, 31, 45],
        'startDate' => '2026-07-01',
        'endDate' => '2026-07-11',
    ]);

    expect($total)->toBe(3.0 * 0.6 * 10 + 3.0 * 0.7 * 10 + 3.0 * 0.8 * 10);
});
