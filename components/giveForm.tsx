"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Container from "./container";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Enter a valid email" }),
  phone: z.string().min(7, { message: "Enter a valid phone number" }),
  purpose: z.enum(["offering", "tithe", "firstfruit", "special", "general"]),
  currency: z.enum(["NGN", "USD", "GBP"]),
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than zero" }),
});

type GiveFormValues = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  purpose: "offering" | "tithe" | "firstfruit" | "special" | "general";
  currency: "NGN" | "USD" | "GBP";
  amount: number;
};

const Visa = "/assets/visa.png";
const MasterCard = "/assets/mastercard.png";

export default function GiveForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      purpose: "offering",
      currency: "NGN",
      amount: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const onSubmit = async (values: GiveFormValues) => {
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsFlipped(true);
      toast.success("Thank you for your generosity!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsFlipped(false);
    form.reset();
  };

  return (
    <div className="bg-bg rounded-lg shadow-xl py-28 px-2 mx-auto">
      <Container>
        <div className={`relative ${isFlipped ? "h-full" : "h-auto"}`}>
          {/* Front Side - Form */}
          <div
            className={`bg-white mx-auto py-16 md:py-32 px-4 md:px-16 transition-all duration-500 ${isFlipped ? "absolute opacity-0 rotate-y-180" : "opacity-100"}`}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold uppercase">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input className="py-6 border-accent3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold uppercase">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input className="py-6 border-accent3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold uppercase">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="py-6 border-accent3"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold uppercase">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input className="py-6 border-accent3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="purpose"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold uppercase">
                          Purpose
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="py-6 border-accent3 w-full">
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-accent3">
                            <SelectItem value="offering">Offering</SelectItem>
                            <SelectItem value="tithe">Tithe</SelectItem>
                            <SelectItem value="firstfruit">
                              Firstfruit
                            </SelectItem>
                            <SelectItem value="special">
                              Special Seed
                            </SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="currency"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold uppercase">
                          Currency
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="py-6 border-accent3 w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-accent3">
                            <SelectItem value="NGN">NGN</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-semibold uppercase">
                        Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 border-accent3"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row items-center justify-between gap-4 mx-auto">
                  <Button
                    type="submit"
                    className="bg-accent2 hover:bg-red-700 font-semibold text-lg py-6 w-48 md:w-62 cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Give"}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Image
                      src={Visa}
                      alt="Visa"
                      className="w-full h-full"
                      width={57}
                      height={44}
                    />
                    <Image
                      src={MasterCard}
                      alt="MasterCard"
                      className="w-full h-full"
                      width={57}
                      height={44}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Back Side - Thank You & Account Details */}
          <div
            className={`bg-white mx-auto py-16 md:py-32 px-4 md:px-16 transition-all duration-500 ${isFlipped ? "opacity-100" : "absolute opacity-0 rotate-y-180"}`}
          >
            <div className="flex flex-col md:flex-row gap-8 h-full">
              {/* Thank You Message - Left Side */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-accent2 mb-4">
                  Thank You!
                </h2>
                <p className="text-lg mb-6">
                  We appreciate your generosity and support. Your contribution
                  helps us continue our mission.
                </p>
                <p className="text-lg">
                  A receipt has been sent to your email address. If you have any
                  questions, please contact us at giving@church.org.
                </p>
                <Button
                  onClick={resetForm}
                  className="mt-8 z-50 bg-accent2 hover:bg-red-700 font-semibold text-lg py-6 w-48 cursor-pointer"
                >
                  Give Again
                </Button>
              </div>

              {/* Account Details - Right Side */}
              <div className="flex-1 border-l-0 md:border-l-2 border-accent3 pl-0 md:pl-8">
                <h3 className="text-xl font-bold mb-4">
                  Bank Transfer Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">NGN Account</h4>
                    <p>Bank: Access Bank</p>
                    <p>Account Name: Church Giving</p>
                    <p>Account Number: 1234567890</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">USD Account</h4>
                    <p>Bank: Access Bank</p>
                    <p>Account Name: Church Giving</p>
                    <p>Account Number: 0987654321</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">GBP Account</h4>
                    <p>Bank: Access Bank</p>
                    <p>Account Name: Church Giving</p>
                    <p>Account Number: 5678901234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
