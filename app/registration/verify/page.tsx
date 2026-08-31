"use client"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "@/components/ui/input-otp"
import { RefreshCwIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import Spinner from "@/components/myComponent/Spinner "
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { registration } from "@/lib/queries"

export default function InputOTPForm() {

   const [otp, setOtp] = useState("")

   const { mutate, isPending, error } = useMutation({
      mutationKey: ["verifyOtp"],
      mutationFn: registration.verifyPhoneNumber,
   })

   const searchParams = useSearchParams()
   const phone = searchParams.get("phone")

   const router = useRouter()

   function verifyOtp() {

      mutate({ otp, phone }, {
         onSuccess: ({ role }) => router.push(`/${role.toLowerCase()}/dashboard`)
      })
   }

   return (
      <Card className="mx-auto max-w-md m-auto mt-40 w-full sm:max-w-md h-auto shadow-[0_0_20px_#fecaca]">

         <CardHeader className="flex flex-col justify-center items-center gap-8">
            <CardTitle className="text-center">تایید هویت شما</CardTitle>
            <CardDescription>
               کد تاییدی که به شماره شما ارسال شده را وارد کنید:{" "}
               <span className="font-medium">{phone}</span>.
            </CardDescription>
         </CardHeader>

         <CardContent>
            <Field className="justify-center items-center flex flex-col gap-5">

               <div className="flex items-center justify-end mb-4">
                  <Button variant="outline" size="xs">
                     <RefreshCwIcon />
                     ارسال مجدد
                  </Button>
               </div>

               <InputOTP maxLength={6} id="otp-verification" onChange={(e) => { setOtp(e) }} required >
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl ml-10">
                     <InputOTPSlot index={0} />
                     <InputOTPSlot index={1} />
                     <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2" />
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                     <InputOTPSlot index={3} />
                     <InputOTPSlot index={4} />
                     <InputOTPSlot index={5} />
                  </InputOTPGroup>
               </InputOTP>

               <FieldDescription className="flex items-center justify-end">
                  <Link href="/registration" className="hover:text-red-600">تغییر شماره</Link>
               </FieldDescription>
            </Field>
         </CardContent>

         <CardFooter>

            <Field>
               <Button onClick={verifyOtp} type="button" className="w-full bg-red-600 hover:bg-red-500 text-white" disabled={isPending}>
                  {isPending ? <div className="flex items-center gap-4 "><Spinner /></div> : "verify"}
               </Button>

               <div className="text-muted-foreground text-sm flex items-center justify-end mt-6">
                  <a
                     href="#"
                     className="hover:text-red-600 underline underline-offset-4 transition-colors"
                  >
                     Contact support
                  </a>
                  <span className="pl-2">
                     در ورود به حساب مشکا دارید؟{" "}
                  </span>
               </div>
            </Field>
         </CardFooter>
      </Card>
   )
}


