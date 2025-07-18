"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Container from "./container";
// import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10),
  postalAddress: z.string().min(1),
  residentialAddress: z.string().min(1),
  sex: z.enum(["Male", "Female"]),
  status: z.enum(["Single", "Married", "Other"]),
  occupation: z.string().min(1),
  monthlyCommitment: z.string().min(1),
  birthday: z.date(),
  reminder: z.enum(["Yes", "No"]),
});

export function PartnerForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalAddress: "",
      residentialAddress: "",
      sex: undefined,
      status: undefined,
      occupation: "",
      monthlyCommitment: "",
      birthday: undefined,
      reminder: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-bg rounded-lg shadow-xl py-16 md:py-28 md:pb-80 mx-auto">
      <Container>
        <h1 className="text-black mb-8 md:mb-12 scroll-m-20 text-center text-4xl lg:text-7xl font-extrabold tracking-tight text-balance">
          Become a Partner
        </h1>
        <div className="w-full bg-white mx-auto py-16 md:py-32 px-4 md:px-16 transition-all duration-500">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <FormField
                control={form.control}
                name="firstName"
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
                control={form.control}
                name="lastName"
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
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold uppercase">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 border-accent3"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
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
                control={form.control}
                name="postalAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold uppercase">
                      Postal Address
                    </FormLabel>
                    <FormControl>
                      <Input className="py-6 border-accent3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residentialAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold uppercase">
                      Residential Address
                    </FormLabel>
                    <FormControl>
                      <Input className="py-6 border-accent3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-6 border-accent3 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-accent3">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-6 border-accent3 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-accent3">
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold uppercase">
                      Occupation
                    </FormLabel>
                    <FormControl>
                      <Input className="py-6 border-accent3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyCommitment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold uppercase">
                      Monthly Financial Commitment (Naira)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 border-accent3"
                        {...field}
                        placeholder="NGN 60000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-black font-semibold uppercase">
                      Birthday
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="py-6 border-accent3 w-full justify-start text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="py-6 border-accent3 ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reminder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-semibold uppercase">
                      Set Reminder?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="w-full p-4 border border-accent3 rounded-md flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="Yes" />
                          </FormControl>
                          <FormLabel>Yes</FormLabel>
                        </FormItem>
                        <FormItem className="w-full p-4 border border-accent3 rounded-md flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="No" />
                          </FormControl>
                          <FormLabel>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-12 col-span-full">
                <Button
                  type="submit"
                  className="bg-accent2 hover:bg-red-700 font-medium text-lg py-6 w-1/2 cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </div>
  );
}
