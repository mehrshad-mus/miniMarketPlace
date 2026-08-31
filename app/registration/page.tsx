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
      <Card className="w-150 sm:max-w-md m-auto mt-50w-full mt-40 pt-10 px-3 h-110 shadow-[0_0_20px_#fca5a5] rounded-full">

         <CardHeader className="flex justify-center flex-col items-center gap-15">

            <CardTitle className="flex justify-center items-center gap-2">
               <span className="text-red-600 text-3xl font-bold">پارس</span>
               <span className="text-3xl font-bold">فروشگاه</span>
            </CardTitle>

            <CardDescription className="flex justify-center items-center gap-1 font-bold text-black">
               <span>ورود به حساب</span>
               <span className="text-red-600">/</span>
               <span>ثبت نام</span>
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
                           <Input
                              {...field}
                              id="form-rhf-demo-phone"
                              aria-invalid={fieldState.invalid}
                              placeholder="شماره خود را وارد کنید"
                              autoComplete="off"
                              className="placeholder:text-center flex justify-center items-center h-10"
                           />
                           {fieldState.invalid && (
                              <FieldError className="flex justify-center items-center" errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </FieldGroup>
            </form>
         </CardContent>

         <CardFooter className="mt-10">
            <Field orientation="horizontal" className="flex justify-end items-center pr-5">
               <Button type="submit" form="form-rhf-demo" disabled={isPending} className="bg-red-600 hover:bg-red-500 text-white">
                  {isPending ? <div className="flex items-center gap-4"><Spinner /></div> : "ادامه"}
               </Button>
               <Button type="button" variant="outline" onClick={() => form.reset()}>
                  پاک کردن
               </Button>
            </Field>
         </CardFooter>
      </Card>
   )
}
