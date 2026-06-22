import { useForm } from "vee-validate";
import { array, date, number, object, string } from "yup";
import axios from "axios";
import axiosInstance from "../services/axiosInstance.js";

export const validOptions = ["EUR", "GBP", "USD"];
const validationSchema = object({
    age: array()
        .of(
            number()
                .typeError("Age must be a valid number")
                .min(18, "Age must be at least 18")
                .max(70, "Age must be 70 or less"),
        )
        .min(1, "At least one age is required")
        .required("Age is required"),
    currency: string()
        .required("Currency is required")
        .oneOf(validOptions, "Invalid option selected"),
    startDate: date()
        .required("Start Date is required")
        .typeError("Please enter a valid date"),
    endDate: date()
        .required("End Date is required")
        .typeError("Please enter a valid date")
        .test(
            "is-greater",
            "End date must be after start date",
            function (value) {
                const { startDate } = this.parent;
                if (!startDate || !value) return true; // Skip if either is missing
                return new Date(value) > new Date(startDate);
            },
        ),
});

export const useQuotation = () => {
    const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
        validationSchema,
    });

    const onSubmit = handleSubmit(async (values, { setFieldError }) => {
        const data = { ...values, age: values.age.join() };
        try {
            const response = await axiosInstance.post("/quotation", data);
            resetForm();
        } catch (error) {
            setFieldError("age", error.response?.data?.errors?.age);
            setFieldError("currency", error.response?.data?.errors?.currency);
            setFieldError("startDate", error.response?.data?.errors?.startDate);
            setFieldError("endDate", error.response?.data?.errors?.endDate);
        }
    });

    return {
        errors,
        isSubmitting,
        onSubmit,
    };
};
