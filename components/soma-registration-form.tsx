"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  somaRegistrationSchema,
  type SomaRegistrationFormData,
} from "@/lib/validations";
import { Loader2 } from "lucide-react";

export default function SomaRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SomaRegistrationFormData>({
    resolver: zodResolver(somaRegistrationSchema),
    defaultValues: {
      attendWithSpouse: "No",
    },
  });

  const attendWithSpouseValue = watch("attendWithSpouse");

  const onSubmit = async (data: SomaRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // Step 1: Register user and save to Google Sheets
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Registration failed", {
          description: result.message || "Please try again.",
        });
        return;
      }

      console.log(data);

      toast.success("Registration successful!", {
        description: "Your details have been recorded.",
      });

      reset();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            SOMA 2025 Registration
          </h2>
          <p className="text-muted-foreground text-lg">
            Please fill in your details below to register for the State Of the
            Ministry Awards.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card border rounded-xl p-8 md:p-12 space-y-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Select
                onValueChange={(value) => setValue("title", value)}
                defaultValue={watch("title")}
              >
                <SelectTrigger id="title" className="w-full py-6 border-gray-300">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Miss">Miss</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                  <SelectItem value="Pst">Pst</SelectItem>
                  <SelectItem value="Rev">Rev</SelectItem>
                  <SelectItem value="Bishop">Bishop</SelectItem>
                  <SelectItem value="Apostle">Apostle</SelectItem>
                  <SelectItem value="Prophet">Prophet</SelectItem>
                </SelectContent>
              </Select>
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Surname */}
            <div className="space-y-2">
              <Label htmlFor="surName">Surname *</Label>
              <Input
                id="surName"
                placeholder="Enter your surname"
                {...register("surName")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.surName && (
                <p className="text-sm text-red-500">{errors.surName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (WhatsApp) *</Label>
              <Input
                id="phone"
                placeholder="+234..."
                {...register("phone")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Centre */}
            <div className="space-y-2">
              <Label htmlFor="centre">Centre *</Label>
              <Input
                id="centre"
                placeholder="Enter your centre"
                {...register("centre")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.centre && (
                <p className="text-sm text-red-500">{errors.centre.message}</p>
              )}
            </div>
          </div>

          {/* Marital Status */}
          <div className="space-y-3">
            <Label>Marital Status *</Label>
            <Select
              onValueChange={(value) => setValue("maritalStatus", value as any)}
              defaultValue={watch("maritalStatus")}
            >
              <SelectTrigger className="w-full py-6 border-gray-300">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Engaged">Engaged</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced/Separated">
                  Divorced/Separated
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.maritalStatus && (
              <p className="text-sm text-red-500">
                {errors.maritalStatus.message}
              </p>
            )}
          </div>

          {/* Attend with Spouse */}
          <div className="space-y-3">
            <Label>Will you attend SOMA 2025 with your spouse? *</Label>
            <RadioGroup
              value={attendWithSpouseValue}
              onValueChange={(value) =>
                setValue("attendWithSpouse", value as "Yes" | "No")
              }
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="spouse-yes" />
                <Label
                  htmlFor="spouse-yes"
                  className="font-normal cursor-pointer"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="spouse-no" />
                <Label
                  htmlFor="spouse-no"
                  className="font-normal cursor-pointer"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
            {errors.attendWithSpouse && (
              <p className="text-sm text-red-500">
                {errors.attendWithSpouse.message}
              </p>
            )}
          </div>

          {/* Spouse Name */}
          {attendWithSpouseValue === "Yes" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
              <Label htmlFor="spouseName">Spouse Name *</Label>
              <Input
                id="spouseName"
                placeholder="Enter spouse's full name"
                {...register("spouseName")}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Please ensure he or she registers too.
              </p>
              {errors.spouseName && (
                <p className="text-sm text-red-500">
                  {errors.spouseName.message}
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Registering...
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
