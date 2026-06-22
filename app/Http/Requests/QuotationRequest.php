<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuotationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('age')) {
            // Trim whitespace and explode the string into an array
            $ageArray = array_map('trim', explode(',', $this->input('age')));

            // Remove empty values caused by trailing or duplicate commas
            $ageArray = array_filter($ageArray);

            // Merge back into the request payload
            $this->merge([
                'age' => $ageArray,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'age' => ['required', 'array', 'min:1'],
            'age.*' => ['numeric', 'min:18', 'max:70'],
            'currency' => ['required', 'in:EUR,GBP,USD'],
            'startDate' => ['required', 'date'],
            'endDate' => ['required', 'date', 'after:startDate'],
        ];
    }

    public function messages(): array
    {
        return [
            'age.required' => 'Age is required',
            'age.array' => 'Age must be an array',
            'age.min' => 'At least one age is required',
            'age.*.numeric' => 'Each age must be a valid number',
            'age.*.min' => 'Age must be at least 18',
            'age.*.max' => 'Age must be 70 or less',
            'currency.required' => 'Currency is required',
            'currency.in' => 'Invalid currency selected',
            'startDate.required' => 'Start Date is required',
            'startDate.date' => 'Please enter a valid start date',
            'endDate.required' => 'End Date is required',
            'endDate.date' => 'Please enter a valid end date',
            'endDate.after' => 'End Date must be after Start Date',
        ];
    }
}
