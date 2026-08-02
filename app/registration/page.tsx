"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { phoneFormSchema, TPhoneFormData } from "@/lib/zodSchema/schema"
import Spinner from "@/components/myComponent/Spinner "
import { useMutation } from "@tanstack/react-query"
import { registration } from "@/lib/queries"

export default function RegistrationForm() {

   const router = useRouter()

   const { mutate, isPending, error } = useMutation({
      mutationKey: ["registration"],
      mutationFn: registration.sendPhoneNumber,
      onSuccess: (_, message) => router.push("/registration/verify?phone=" + message)
   })

   const form = useForm<TPhoneFormData>({
      resolver: zodResolver(phoneFormSchema),
      defaultValues: {
         phone: "",
      },
   })

   async function onSubmit(data: TPhoneFormData) {
      mutate(data.phone)
   }

   return (
      <Card className="w-full sm:max-w-md m-auto mt-50">
         <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
               Please enter your phone number to register.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
               <FieldGroup>
                  <Controller
                     name="phone"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor="form-rhf-demo-phone">
                              Phone Number
                           </FieldLabel>
                           <Input
                              {...field}
                              id="form-rhf-demo-phone"
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your phone number"
                              autoComplete="off"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </FieldGroup>
            </form>
         </CardContent>
         <CardFooter>
            <Field orientation="horizontal">
               <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
               </Button>
               <Button type="submit" form="form-rhf-demo" disabled={isPending}>
                  {isPending ? <div className="flex items-center gap-4"><Spinner /></div> : "verify"}
               </Button>
            </Field>
         </CardFooter>
      </Card>
   )
}
