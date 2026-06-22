<?php

namespace App\Http\Controllers;

use App\Http\Actions\CalculateQuotation;
use App\Http\Requests\QuotationRequest;

class QuotationController extends Controller
{
    public function __invoke(QuotationRequest $request, CalculateQuotation $action)
    {
        $data = $request->validated();

        $total = $action->execute($data);

        return response()->json([
            'total' => number_format($total, 2, '.', ''),
        ]);
    }
}
