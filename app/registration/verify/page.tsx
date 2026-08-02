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
      <Card className="mx-auto max-w-md m-auto mt-50">
         <CardHeader>
            <CardTitle>Verify your phoneNumber</CardTitle>
            <CardDescription>
               Enter the verification code we sent to your phone:{" "}
               <span className="font-medium">{phone}</span>.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Field>
               <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="otp-verification">
                     Verification code
                  </FieldLabel>
                  <Button variant="outline" size="xs">
                     <RefreshCwIcon />
                     Resend Code
                  </Button>
               </div>
               <InputOTP maxLength={6} id="otp-verification" onChange={(e) => { setOtp(e) }} required>
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
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
               <FieldDescription>
                  <Link href="/registration">wrong Number? Try again</Link>
               </FieldDescription>
            </Field>
         </CardContent>
         <CardFooter>
            <Field>
               <Button onClick={verifyOtp} type="button" className="w-full" disabled={isPending}>
                  {isPending ? <div className="flex items-center gap-4"><Spinner /></div> : "verify"}
               </Button>
               <div className="text-muted-foreground text-sm">
                  Having trouble signing in?{" "}
                  <a
                     href="#"
                     className="hover:text-primary underline underline-offset-4 transition-colors"
                  >
                     Contact support
                  </a>
               </div>
            </Field>
         </CardFooter>
      </Card>
   )
}


