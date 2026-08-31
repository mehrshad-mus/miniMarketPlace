"use client"
import { Address } from "@/app/generated/prisma/client"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { cart } from "@/lib/queries"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export function SwitchChoiceCard({defaultLocation , cartLocation} : {defaultLocation : Address , cartLocation: string | null}) {

    const router = useRouter()
    const {mutate , isPending , isError} = useMutation({
        mutationKey: ["cartLocation"],
        mutationFn: cart.updateCart,
        onSuccess : () => {
            router.refresh()
        }
    })

    function handleSwitch(checked: boolean){
        if(checked){
            mutate({location : {
                latitude : defaultLocation.latitude,
                longitude : defaultLocation.longitude,
                formatted_address : defaultLocation.address
            }})
        }else{
            mutate({
                location: {
                    latitude : null,
                    longitude : null,
                    formatted_address : null
                }
            })
        }
    }

    return (
        <div className="w-full">
            <FieldGroup className="w-full max-w-sm">
                <FieldLabel htmlFor="switch-share">
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>موقعیت مکانی پیش فرض</FieldTitle>
                            <FieldDescription>
                                {defaultLocation.address}
                            </FieldDescription>
                        </FieldContent>
                        <Switch id="switch-share" onCheckedChange={handleSwitch} checked ={defaultLocation.address === cartLocation}/>
                    </Field>
                </FieldLabel>
            </FieldGroup>
        </div>
    )
}

export default SwitchChoiceCard