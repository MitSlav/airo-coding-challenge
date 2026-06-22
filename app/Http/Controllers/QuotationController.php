<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuotationRequest;

class QuotationController extends Controller
{
    /**
     * Provision a new web server.
     */
    public function __invoke(QuotationRequest $request)
    {
        $data = $request->validated();
        // dd($data);
    }
}
