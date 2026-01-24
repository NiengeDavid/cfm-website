"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ncbiRegistrationSchema,
  type NcbiRegistrationFormData,
} from "@/lib/validations";
import { Loader2 } from "lucide-react";
import Container from "./container";

export default function NcbiRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<NcbiRegistrationFormData>({
    resolver: zodResolver(ncbiRegistrationSchema),
    defaultValues: {
      growthTrack: "No",
    },
  });

  const growthTrackValue = watch("growthTrack");

  const onSubmit = async (data: NcbiRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ncbi-register", {
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

      toast.success("Registration successful!", {
        description: "Your details have been submitted.",
        duration: 5000,
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
    <section className="px-4 py-8 bg-background">
      <Container className="mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card border rounded-xl p-8 md:p-12 space-y-8 shadow-sm"
        >
          {/* Pay To Section - replicates the image text slightly */}
          <div className="text-lg md:text-base text-foreground mb-16">
            <h4 className="font-bold text-foreground">PAY TO:</h4>
            <p>CFM-NEW CREATION BIBLE INSTITUTE</p>
            <p>1229706148</p>
            <p>Zenith Bank</p>
            <br />
            <p>
              Kindly send proof of payment to{" "}
              <span className="font-bold text-foreground">07057028955</span>{" "}
              (WhatsApp)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">TITLE</Label>
              <Select
                onValueChange={(value) => setValue("title", value)}
                defaultValue={watch("title")}
              >
                <SelectTrigger
                  id="title"
                  className="w-full py-6 border-gray-300"
                >
                  <SelectValue placeholder="---None---" />
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
              <Label htmlFor="firstName">FIRST NAME</Label>
              <Input
                id="firstName"
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

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="surName">LAST NAME</Label>
              <Input
                id="surName"
                {...register("surName")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.surName && (
                <p className="text-sm text-red-500">{errors.surName.message}</p>
              )}
            </div>

            {/* Other Name */}
            <div className="space-y-2">
              <Label htmlFor="otherName">OTHER NAME</Label>
              <Input
                id="otherName"
                {...register("otherName")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">EMAIL</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">PHONE NUMBER</Label>
              <Input
                id="phone"
                {...register("phone")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WHATSAPP NUMBER</Label>
              <Input
                id="whatsapp"
                {...register("whatsapp")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.whatsapp && (
                <p className="text-sm text-red-500">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">OCCUPATION</Label>
              <Input
                id="occupation"
                {...register("occupation")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.occupation && (
                <p className="text-sm text-red-500">
                  {errors.occupation.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">GENDER</Label>
              <Select
                onValueChange={(value) => setValue("gender", value as any)}
                defaultValue={watch("gender")}
              >
                <SelectTrigger
                  id="gender"
                  className="w-full py-6 border-gray-300"
                >
                  <SelectValue placeholder="---None---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">MARITAL STATUS</Label>
              <Select
                onValueChange={(value) =>
                  setValue("maritalStatus", value as any)
                }
                defaultValue={watch("maritalStatus")}
              >
                <SelectTrigger
                  id="maritalStatus"
                  className="w-full py-6 border-gray-300"
                >
                  <SelectValue placeholder="---None---" />
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

            {/* Address (Full width) */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="address">ADDRESS</Label>
              <Input
                id="address"
                {...register("address")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* CFC Centre */}
            <div className="space-y-2">
              <Label htmlFor="cfcCentre">CFC CENTRE</Label>
              <Input
                id="cfcCentre"
                {...register("cfcCentre")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
                placeholder="Enter Centre"
              />
              {errors.cfcCentre && (
                <p className="text-sm text-red-500">
                  {errors.cfcCentre.message}
                </p>
              )}
            </div>

            {/* CFC Community Church (C3) */}
            <div className="space-y-2">
              <Label htmlFor="cfcCommunityChurch">
                CFC COMMUNITY CHURCH (C3)
              </Label>
              <Input
                id="cfcCommunityChurch"
                {...register("cfcCommunityChurch")}
                disabled={isSubmitting}
                className="py-6 border-gray-300"
                placeholder="Enter C3 details" // or similar
              />
              {errors.cfcCommunityChurch && (
                <p className="text-sm text-red-500">
                  {errors.cfcCommunityChurch.message}
                </p>
              )}
            </div>

            {/* Service Team */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="serviceTeam">SERVICE TEAM</Label>
              <Select
                onValueChange={(value) => setValue("serviceTeam", value as any)}
                defaultValue={watch("serviceTeam")}
              >
                <SelectTrigger
                  id="serviceTeam"
                  className="w-full py-6 border-gray-300"
                >
                  <SelectValue placeholder="---None---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ushering">Ushering</SelectItem>
                  <SelectItem value="IT and Internet">
                    IT and Internet
                  </SelectItem>
                  <SelectItem value="Sentry">Sentry</SelectItem>
                  <SelectItem value="Protocol">Protocol</SelectItem>
                  <SelectItem value="Host">Host</SelectItem>
                  <SelectItem value="Walfare">Walfare</SelectItem>
                  <SelectItem value="Children Church">
                    Children Church
                  </SelectItem>
                  <SelectItem value="Sound and Technical">Sound and Technical</SelectItem>
                  <SelectItem value="Projection">Projection</SelectItem>
                  <SelectItem value="Livestream and Television">Livestream and Television</SelectItem>
                  <SelectItem value="Arts and Asthetics">Arts and Asthetics</SelectItem>
                  <SelectItem value="Prayer and Counseling">Prayer and Counseling</SelectItem>
                  <SelectItem value="Face to Face">Face to Face</SelectItem>
                  <SelectItem value="Voice of Creation">Voice of Creation</SelectItem>
                  <SelectItem value="Reception">Reception</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceTeam && (
                <p className="text-sm text-red-500">
                  {errors.serviceTeam.message}
                </p>
              )}
            </div>

            {/* Growth Track */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="growthTrack">
                HAVE YOU GONE THROUGH THE GROWTH TRACK?
              </Label>
              <Select
                onValueChange={(value) => setValue("growthTrack", value as any)}
                defaultValue={watch("growthTrack")}
              >
                <SelectTrigger
                  id="growthTrack"
                  className="w-full py-6 border-gray-300"
                >
                  <SelectValue placeholder="---None---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.growthTrack && (
                <p className="text-sm text-red-500">
                  {errors.growthTrack.message}
                </p>
              )}
            </div>

            {/* Growth Track Year */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="growthTrackYear">
                YEAR YOU WENT THROUGH THE GROWTH TRACK
              </Label>
              <Input
                id="growthTrackYear"
                {...register("growthTrackYear")}
                disabled={isSubmitting || growthTrackValue !== "Yes"}
                className="py-6 border-gray-300"
              />
              {errors.growthTrackYear && (
                <p className="text-sm text-red-500">
                  {errors.growthTrackYear.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Container>
    </section>
  );
}
