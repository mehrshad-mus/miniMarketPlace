"use client"

import Image from "next/image"
import { forwardRef, useState } from "react"
import { Button } from "../ui/button"
import Spinner from "./Spinner "
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Sketch from "@uiw/react-color-sketch"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "sonner"
import { dialogProps } from "@/lib/zodSchema/schema"

export type OptionDialogProps = {
    title: string,
    id?: string,
    mutationKey: string[],
    mutateFn: ({ id, value, secoundValue ,file }: dialogProps) => Promise<{ message: string }>,
    invalidations?: string[],
    router?: {
        fn: AppRouterInstance,
        url?: string,
        type: "push" | "refresh"
    },
    placeholder?: string
    secoundInput?: { title: string, placeholder: string },
    toastText?: string,
}

export const OptionDialog = forwardRef<HTMLDialogElement, OptionDialogProps>(
    (props, ref) => {

        const queryClient = useQueryClient();

        const [inputChange, setInputChange] = useState<string>('')
        const [secoundInputChange, setSecoundInputChange] = useState<string>("")

        const { mutate, isPending, error } = useMutation({
            mutationKey: props.mutationKey,
            mutationFn: props.mutateFn,
            onSuccess: async () => {

                await queryClient.invalidateQueries({ queryKey: props.invalidations });

                if (props.router) {

                    if (props.router.type === "push") {
                        console.log(props.router.url)
                        props.router.fn.push(props.router.url ? props.router.url : "/")
                    }
                    if (props.router.type === "refresh") {
                        props.router.fn.refresh()
                    }
                }

                toast.success(props.toastText ? props.toastText : "موفقیت تغییر کرد", {
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
            onError: (error) => console.log(error.message)
        })
        

        //change Status
        const status = props.title === "ACTIVE" ? true : props.title === "INACTIVE" ? false : null
        const statusTextTitle = props.title === "ACTIVE" ? "بلاک کردن کاربر" : props.title === "INACTIVE" ? "آن بلاک کردن کاربر" : null
        const statusTextButton = props.title === "ACTIVE" ? "بلاک " : props.title === "INACTIVE" ? "آن بلاک " : null

        //color
        const colorSpecific = props.title.includes("رنگ") || props.title.includes("color")
        const [rgba, setRgba] = useState({ r: 114, g: 13, b: 90, a: 1 });
        const inlineStyle = {
            backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
        };
        const [disableAlpha, setDisableAlpha] = useState(false);

        //file
        const choseFile = props.title.includes("دسته بندی")

        const [images, setImages] = useState<string[]>()
        const [imageFile , setImageFile] = useState<File[]>()

        function imgHandler(e: React.ChangeEvent<HTMLInputElement>) {

            const files = Array.from(e.target.files ?? []);

            setImageFile(files)
            const urls = files.map((file) =>
                URL.createObjectURL(file)
            );
            
            setImages(urls)
        }

        return (
            <dialog ref={ref} className={`bg-white rounded-2xl ${colorSpecific || choseFile? "top-20" : "top-45 "} left-120 w-120 px-6`}>
                <div className="flex justify-between items-center p-3">
                    <span className="text-[16px] font-bold text-black">{statusTextTitle ? statusTextTitle : props.title}</span>
                    <Button type="button" onClick={() => (ref as React.RefObject<HTMLDialogElement>)?.current?.close()} className="bg-white text-black hover:text-gray-700 cursor-pointer hover:bg-white">X</Button>
                </div>

                {props.title === "حذف" || props.title === "ACTIVE" ?
                    <p className=" mt-3 text-[15px]">{props.placeholder}</p>
                    : colorSpecific ?
                        <div className="w-10 h-10 rounded-full m-3 mb-6 mr-7" style={inlineStyle}></div> :
                        <div className="flex justify-center items-start  gap-2 flex-col mt-3 ">
                            <div className="flex justify-center items-start  gap-2 flex-col mt-3 w-full">
                                <label className="text-[15px] text-black cursor-pointer" htmlFor="mainInput">عنوان:</label>
                                <input onChange={(e) => setInputChange(e.target.value)}
                                    className="placeholder:text-[14px] outline-blue-300 focus:outline-1 w-full h-11 px-2 rounded-xl border-gray-200 border"
                                    type="text"
                                    id="mainInput"
                                    placeholder={props.placeholder} />

                            </div>
                            {props.secoundInput &&
                                <div className="flex justify-center items-start  gap-2 flex-col p-3 w-full">
                                    <label className="text-[15px] text-black cursor-pointer" htmlFor="secoundInput">{props.secoundInput.title}</label>
                                    <input
                                        onChange={(e) => setSecoundInputChange(e.target.value)}
                                        className="placeholder:text-[14px] outline-blue-300 focus:outline-1 w-full h-11 px-2 rounded-xl border-gray-200 border"
                                        type="text"
                                        id="secoundInput"
                                        placeholder={props.secoundInput.placeholder} />
                                </div>
                            }
                        </div>
                }

                {colorSpecific && <div>
                    <div className="flex justify-center items-center flex-col gap-3">
                        <Sketch
                            width={350}
                            style={{ marginLeft: 20 }}
                            disableAlpha={disableAlpha}
                            onChange={(color) => {
                                setRgba(color.rgba);
                            }}
                        />
                        <Button
                            className={`${disableAlpha ? "bg-red-500 text-white hover:bg-red-400" : "bg-green-500 text-white hover:bg-green-400"}`}
                            onClick={() => setDisableAlpha(!disableAlpha)}>
                            {disableAlpha ? "غیرفعال کردن alpha" : "فعال کردن alpha"}
                        </Button>
                    </div>
                </div>}

                {choseFile && <div>
                    <label className="w-20 h-20 rounded-lg border bg-gray-50 mt-7 flex justify-center flex-col items-center cursor-pointer ">
                        <span className="flex justify-center items-center text-3xl font-extralight text-gray-600">+</span>

                        <input className="hidden"  type="file" accept="image/*" onChange={imgHandler} />
                    </label>
                    <span className="text-gray-600 text-xs">برای انتخاب آیکون کلیک کنید</span>
                    {images?.map((img) => {
                        return (
                            <Image key={img} src={img} className="w-20 h-20 object-cover rounded-lg border mt-5" width={80} height={80} alt="this is a photo"></Image>
                        )
                    })}
                </div>

                }

                <div className="flex justify-end items-center mt-8 p-3">
                    {
                        props.title === "حذف" || status ?
                            <Button type="button" onClick={() => mutate({ id: props.id })} className="bg-red-500 text-white hover:bg-red-400 rounded-xl cursor-pointer">
                                {isPending ? <Spinner /> : statusTextButton ? statusTextButton : "حذف"}
                            </Button> : colorSpecific ?
                                <Button onClick={() => mutate({ id: props.id, value: rgba })} className="bg-green-500 text-white hover:bg-green-400 rounded-xl cursor-pointer">
                                    {isPending ? <Spinner /> : "افزودن رنگ"}
                                </Button> :
                                <Button onClick={() => mutate({ id: props.id, value: inputChange, secoundValue: secoundInputChange ,file : imageFile })} className="bg-green-500 text-white hover:bg-green-400 rounded-xl cursor-pointer">
                                    {isPending ? <Spinner /> : statusTextButton ? statusTextButton : "افزودن"}
                                </Button>
                    }
                </div>
            </dialog>
        )
    }
)

OptionDialog.displayName = "OptionDialog"
export default OptionDialog
