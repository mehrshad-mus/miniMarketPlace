/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { NextResponse } from "next/server"
import { twMerge } from "tailwind-merge"
import { Option } from "./zodSchema/schema"
import { User } from "@/app/generated/prisma/client"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const errorHandler = async (res: Response): Promise<void> => {

    if (!res.ok) {

        let message = "Something went wrong"
        let status = "ERROR"


        const data = await res.json()
        message = data.message ?? message
        status = data.status ?? status


        const error = new Error(message)
        error.name = status

        throw error
    }
}


export type RGBA = { r: number; g: number; b: number; a: number };

export function tryParseRGBA(value: string): RGBA | null {
    if (typeof value !== "string") return null;

    try {
        const parsed = JSON.parse(value);
        if (
            parsed &&
            typeof parsed === "object" &&
            typeof parsed.r === "number" &&
            typeof parsed.g === "number" &&
            typeof parsed.b === "number" &&
            typeof parsed.a === "number"
        ) {
            return parsed as RGBA;
        }
        return null;
    } catch {
        return null;
    }
}

//option combination 
export function generateVariants(options: Option[]) {
    const arrays =
        options.map(option =>
            option.optionValue?.map(v => ({
                optionId: option.optionId,
                optionName: option.name,
                value: v.value
            })) || []
        )

    const cartesian = (arr: any[]): any[] => {
        return arr.reduce(
            (a, b) =>
                a.flatMap((d: any) =>
                    b.map((e: any) => [...d, e])
                ),
            [[]]
        )
    }

    const combinations = cartesian(arrays)

    return combinations.map((combo: any[]) => ({
        id: crypto.randomUUID(),
        values: combo
    }))
}


export type GeneratedValue = {
    optionName: string
    value: string
}
export function generateVariantsForAPI(options: {
    name: string;
    optionId: string;
    optionValue: {
        value: string;
        optionValueId?: string | undefined;
    }[];
}[]) {
    const arrays = options.map((opt) =>
        opt.optionValue.map((v) => ({
            optionName: opt.name,
            value: v.value,
        }))
    )

    return arrays.reduce(
        (acc, current) =>
            acc.flatMap((a) =>
                current.map((c) => [...a, c])
            ),
        [[]] as GeneratedValue[][]
    )
}

//generate columns for productVariant 
export function createColumns(variants: {
    id: string;
    values: {
        optionId: string;
        optionName: string;
        value: string;
    }[];
}[] | undefined) {
    const dynamicColumns = variants?.flatMap((item) =>
        item.values.map((value) => ({
            title: value.optionName,
            key: value.optionId,
            rowWidth: "w-1/12",
        }))
    ) ?? [];

    const uniqueColumns = Array.from(
        new Map(dynamicColumns.map((col) => [col.key, col])).values()
    );

    return uniqueColumns
}


//NavColors
export const navMainColor = ({user} : {user : User | undefined}) => {
    if (user?.role === "ADMIN") {
        return "bg-blue-100"
    }
    if (user?.role === "SELLER") {
        return "bg-purple-100"
    }
    return "bg-red-100"
}
export const navTextColor = ({user} : {user : User | undefined}) => {
    if (user?.role === "ADMIN") {
        return "text-blue-800"
    }
    if (user?.role === "SELLER") {
        return "text-purple-800"
    }
    return "text-red-800"
}