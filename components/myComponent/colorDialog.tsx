"use client"

import { forwardRef, useState } from "react"
import { Button } from "../ui/button"
import Spinner from "./Spinner "
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Sketch from "@uiw/react-color-sketch"

export type OptionDialogProps = {
    title: string,
    id?: string,
    mutationKey: string[],
    mutateFn: ({ id, value }: { id?: string, value?: string }) => Promise<void>,
    invalidations: string[],
    placeholder: string
}

export const OptionDialog = forwardRef<HTMLDialogElement, OptionDialogProps>(
    (props, ref) => {

        const queryClient = useQueryClient();

        const [inputChange, setInputChange] = useState<string>('')

        const { mutate, isPending, error } = useMutation({
            mutationKey: props.mutationKey,
            mutationFn: props.mutateFn,
            onSuccess: () => { queryClient.invalidateQueries({ queryKey: props.invalidations }); }
        })

        //color
        const colorSpecific = props.title.includes("رنگ") || props.title.includes("color")
        const [rgba, setHsva] = useState({ r: 114, g: 13, b: 90, a: 1 });
        const inlineStyle = {
            backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
        };
        const [disableAlpha, setDisableAlpha] = useState(false);

        return (
            <dialog ref={ref} className={`bg-white-600 rounded-2xl ${colorSpecific ? "top-20" : "top-55 "} left-120 w-120`}>
                <div className="flex justify-between items-center p-3">
                    <span className="text-[16px] font-bold text-black">{props.title}</span>
                    <Button onClick={() => (ref as React.RefObject<HTMLDialogElement>)?.current?.close()} className="bg-white text-black hover:text-gray-700 cursor-pointer hover:bg-white">X</Button>
                </div>

                {props.title === "حذف" ?
                    <p className="p-3 mt-3 text-[15px]">{props.placeholder}</p>
                    : colorSpecific ? <div className="w-10 h-10 rounded-full m-3 mb-6 mr-7" style={inlineStyle}></div> :
                        <div className="flex justify-center items-start gap-2 flex-col p-3 mt-3">
                            <span className="text-[15px] text-black">عنوان:</span>
                            <input onChange={(e) => setInputChange(e.target.value)}
                                className="placeholder:text-[14px] outline-blue-300 focus:outline-1 w-full h-11 px-2 rounded-xl border-gray-200 border"
                                type="text"
                                placeholder={props.placeholder} />
                        </div>
                }

                {colorSpecific && <div>
                    <div className="flex justify-center items-center flex-col gap-3">
                        <Sketch
                            width={350}
                            style={{ marginLeft: 20 }}
                            disableAlpha={disableAlpha}
                            onChange={(color) => {
                                setHsva(color.rgba);
                            }}
                        />
                        <Button
                            className={`${disableAlpha ? "bg-red-500 text-white hover:bg-red-400" : "bg-green-500 text-white hover:bg-green-400"}`}
                            onClick={() => setDisableAlpha(!disableAlpha)}>
                            {disableAlpha ? "غیرفعال کردن alpha" : "فعال کردن alpha"}
                        </Button>
                    </div>
                </div>}

                <div className="flex justify-end items-center mt-8 p-3">
                    {
                        props.title === "حذف" ?
                            <Button onClick={() => mutate({ id: props.id, value: inputChange })} className="bg-red-500 text-white hover:bg-red-400 rounded-xl cursor-pointer">
                                {isPending ? <Spinner /> : "حذف"}
                            </Button> :
                            <Button onClick={() => mutate({ id: props.id, value: inputChange })} className="bg-green-500 text-white hover:bg-green-400 rounded-xl cursor-pointer">
                                {isPending ? <Spinner /> : "افزودن"}
                            </Button>
                    }
                </div>
            </dialog>
        )
    }
)

OptionDialog.displayName = "OptionDialog"
export default OptionDialog
