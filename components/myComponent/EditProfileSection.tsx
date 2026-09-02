"use client"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useRef } from "react"
import Spinner from "@/components/myComponent/Spinner "
import { FormInput } from "@/components/myComponent/FormInput"
import { ScrollInput } from "@/components/myComponent/ScrollInput"
import Image from "next/image"
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ProfileFields, ProfileSchema } from "@/lib/zodSchema/schema"
import { avatarSVG } from "@/lib/constant/enums"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { editProfile, users } from "@/lib/queries"
import { User } from "@/app/generated/prisma/client"
import { toast } from "sonner"
import OptionDialog from "./optionDialog"
import { useRouter } from "next/navigation"

export const EditProfileSection = ({ data, userFlag }: { data: User, userFlag: boolean }) => {

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, errors },
    } = useForm<ProfileFields>({
        defaultValues: {
            gender: { id: "male", name: "آقا" },
            avatar: data.avatar ?? undefined,
            biography: data.biography ?? undefined,
            birthday: data.birthday?.toISOString() ?? "",
            instagram: data.inestagram ?? undefined,
            phone: data.phone,
            name: data.name ?? undefined,
            nationalCode: data.nationalCode ?? undefined,
            telegram: data.telegram ?? undefined,
            userName: data.userName ?? undefined,
            id: data.id,
            role: {
                id: data.role,
                name: data.role === "ADMIN" ? "ادمین" : data.role === "SELLER" ? "فروشنده" : "کاربر"
            },
        },
        resolver: zodResolver(ProfileSchema),

    })

    const router = useRouter()

    const { mutate, isPending, error } = useMutation({
        mutationKey: ["editProfile"],
        mutationFn: editProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            toast.success(" پروفایل با موفقیت تغییر کرد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        },
        onError: (error) => { console.log(error) }
    })

    const svgUrl = watch("avatar")
    const currentGender = watch("gender")
    const birthDay = watch("birthday")
    const currentRole = watch("role")

    const avatarDialog = useRef<HTMLDialogElement>(null)
    const statusDialog = useRef<HTMLDialogElement>(null)

    const onSubmit: SubmitHandler<ProfileFields> = async (data) => {
        mutate(data)
    }

    return (
        <div className="bg-gray-100 p-6 pt-5 mb-3">
            <div className="font-bold text-2xl mb-6">تغییر پرفایل</div>

            <div className="bg-white rounded-xl mt-0 p-8">

                {
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-xl">اطلاعات اصلی</p>
                        {!userFlag &&
                            <Button
                                onClick={
                                    () => statusDialog.current?.showModal()
                                }
                                className={`${data.status === "ACTIVE" ?
                                    "bg-green-500 hover:bg-green-600" :
                                    "bg-red-500 hover:bg-red-600"} text-white`}>{data.status === "ACTIVE" ? "فعال" : "غیر فعال"}
                            </Button>
                        }
                    </div>

                }
                {!userFlag &&
                    <OptionDialog
                        ref={statusDialog}
                        id={data.id}
                        placeholder="آیا از تغییر اطمینان دارید؟"
                        title={data.status}
                        invalidations={["users"]}
                        router={{fn:router,type:"refresh"}}
                        mutationKey={["changeUserRole"]} 
                        mutateFn={users.changeUserStatus} />}



                <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col " style={{ "gap": "50px" }}>

                    <div className="flex items-center justify-start gap-7 mb-4">
                        <div className="flex items-center justify-center rounded-full">
                            <Image src={svgUrl ?? "/next.svg"} alt="avatar-icon" width={100} height={100} />
                        </div>
                        <div className="flex items-start justify-center gap-3 h-30 flex-col mt-5">
                            <Button type="button" className="w-25 h-8 text-gray-500" onClick={() => { avatarDialog.current?.showModal() }}>
                                تغییر پروفایل
                            </Button>
                            <span className="text-gray-400 text-[14px]">(تصویر پروفایل باید یکی از کاراکتر ها باشد)</span>
                        </div>
                    </div>

                    <dialog ref={avatarDialog} className={`bg-white-600 rounded-2xl top-45 left-120 w-120 `}>
                        <Button type="button" onClick={() => avatarDialog?.current?.close()} className="bg-white text-black hover:text-gray-700 cursor-pointer hover:bg-white">X</Button>

                        <div className="flex justify-center items-center flex-col gap-6 w-full">
                            <span className="text-gray-400 text-[14px] pl-2">لطفا یکی از آواتار ها را انتخاب کنید</span>

                            <div className="flex justify-center items-center border gap-5 p-4 flex-wrap w-full ">
                                {avatarSVG.map((svg) => {
                                    return (
                                        <Image
                                            onClick={() => {
                                                setValue("avatar", svg)
                                                avatarDialog.current?.close()
                                            }}
                                           
                                            key={svg}
                                            className="avatar-image"
                                            src={svg}
                                            alt="avatarImage" width={65} height={65} />
                                    )
                                })}
                            </div>
                        </div>
                    </dialog>

                    <div className="flex justify-between gap-5 w-full">
                        <FormInput register={register("name")} label="نام اصلی" id="name" error={errors.name?.message} />
                        <FormInput register={register("userName")} label="نام کاربری" id="userName" error={errors.userName?.message} />
                        {!userFlag && <FormInput register={register("id")} label="شناسه کاربری" id="id" error={errors.id?.message} />}
                    </div>

                    <div className="flex justify-between gap-5 w-full">
                        <FormInput register={register("phone")} label="شماره تلفن" id="phone" error={errors.phone?.message} />
                        <FormInput register={register("nationalCode")} label="کد ملی" id="nationalCode" error={errors.nationalCode?.message} />
                        <ScrollInput
                            title="نقش/رول"
                            scrollItems={[{ id: "USER", name: "کاربر" }, { id: "SELLER", name: "فروشنده" }, { id: "ADMIN", name: "ادمین" }]}
                            currentState={currentRole}
                            profileSetValue={{
                                setterFn: setValue,
                                field: "role"
                            }}
                        />
                    </div>

                    <p className="text-[16px] border-t border-blue-400 py-4 font-bold">سایر اطلاعات ...</p>

                    <div className="flex justify-between gap-10 w-full">

                        <div className="flex flex-col w-1/3">
                            <label
                                htmlFor="birthday"
                                className="text-gray-800 text-base pb-2 pr-2 flex justify-start items-center gap-0.5"
                            >
                                تاریخ تولد
                            </label>

                            <DatePicker
                                value={birthDay}
                                digits={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                                onChange={(date) => {
                                    setValue("birthday", date?.toDate().toISOString() ?? "")
                                }
                                }
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                inputClass="w-full h-11 border rounded-xl px-3 text-right text-[#607B8F] outline-none transition-all duration-200 hover:border-blue-500 focus:border-blue-500"
                                containerClassName="w-full"
                            />
                        </div>
                        <ScrollInput
                            title="جنسیت"
                            scrollItems={[{ id: "female", name: "خانم" }, { id: "male", name: "آقا" }]}
                            currentState={currentGender}
                            profileSetValue={{
                                setterFn: setValue,
                                field: "gender"
                            }}
                        />
                        <FormInput register={register("telegram")} label="تلگرام" id="telegram" error={errors.telegram?.message} />
                    </div>

                    <div className="flex justify-between gap-10 w-full">
                        <FormInput register={register("instagram")} label="اینستاگرام" id="instagram" error={errors.instagram?.message} />
                        <FormInput register={register("twitter")} label="ایکس(توییتر)" id="twitter" error={errors.twitter?.message} />
                    </div>

                    <div className="flex justify-between gap-5 w-full">
                        <FormInput register={register("biography")} className="w-full" label="بیوگرافی" id="biography" textarea error={errors.biography?.message} />
                    </div>


                    <div className="mt-10 flex justify-start items-center gap-3">
                        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-400">{isPending ? <Spinner /> : "ذخیر تغییرات"}</Button>
                        <Button>لغو</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}