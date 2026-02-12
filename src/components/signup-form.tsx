import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import signUpImage from "/undraw_online-profile_v9c1.svg";
import { createEmployer } from "@/service/employer.service";

// ✅ Zod validation schema (matches CreateEmployer interface)
const signupSchema = z
    .object({
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string(),

        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        phone_number: z.string().min(10, "Phone number is required"),
        location: z.string().min(1, "Location is required"),
        tribe: z.string().min(1, "Tribe is required"),
        religion: z.string().min(1, "Religion is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    // ✅ Call createEmployer service
    const onSubmit = async (data: SignupFormData) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                location: data.location,
                tribe: data.tribe,
                religion: data.religion,
                role: "employer" as const,
            };

            console.log("Submitting employer:", payload);

            await createEmployer(payload);

            navigate("/employer/dashboard");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Create your account
                                </h1>
                            </div>

                            {/* Names */}
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>First Name</FieldLabel>
                                    <Input {...register("first_name")} />
                                    {errors.first_name && (
                                        <FieldDescription className="text-red-500">
                                            {errors.first_name.message}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel>Last Name</FieldLabel>
                                    <Input {...register("last_name")} />
                                    {errors.last_name && (
                                        <FieldDescription className="text-red-500">
                                            {errors.last_name.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </Field>

                            {/* Email */}
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <FieldDescription className="text-red-500">
                                        {errors.email.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* Phone */}
                            <Field>
                                <FieldLabel>Phone Number</FieldLabel>
                                <Input {...register("phone_number")} />
                                {errors.phone_number && (
                                    <FieldDescription className="text-red-500">
                                        {errors.phone_number.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* Location */}
                            <Field>
                                <FieldLabel>Location</FieldLabel>
                                <Input {...register("location")} />
                                {errors.location && (
                                    <FieldDescription className="text-red-500">
                                        {errors.location.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* Tribe + Religion */}
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>Tribe</FieldLabel>
                                    <Input {...register("tribe")} />
                                    {errors.tribe && (
                                        <FieldDescription className="text-red-500">
                                            {errors.tribe.message}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel>Religion</FieldLabel>
                                    <Input {...register("religion")} />
                                    {errors.religion && (
                                        <FieldDescription className="text-red-500">
                                            {errors.religion.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </Field>

                            {/* Passwords */}
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...register("password")}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <FieldDescription className="text-red-500">
                                            {errors.password.message}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel>Confirm Password</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...register("confirmPassword")}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <FieldDescription className="text-red-500">
                                            {errors.confirmPassword.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </Field>

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? "Creating account..."
                                    : "Create Account"}
                            </Button>

                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <NavLink to="/">Login</NavLink>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="bg-muted relative hidden md:block">
                        <img
                            src={signUpImage}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
