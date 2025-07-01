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

  const onSubmit = async (values: GiveFormValues) => {
    setLoading(true);
  };

  return (
    <div className="bg-bg rounded-lg shadow-xl py-28 px-2 mx-auto">
      <Container className="bg-white mx-auto py-16 md:py-32 px-4 md:px-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <SelectItem value="firstfruit">Firstfruit</SelectItem>
                        <SelectItem value="special">Special Seed</SelectItem>
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
      </Container>
    </div>
  );
}
