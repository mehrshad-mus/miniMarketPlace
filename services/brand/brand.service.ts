import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { prisma } from "@/lib/prisma";
import { dialogProps } from "@/lib/zodSchema/schema";

export async function getAllBrand() {
    const user = await getCurrentUser()
    if (!user || user.userRole === "USER") throw new Error("you havnt accses")

    const brands = await prisma.brand.findMany({
        omit: {
            createdAt: true,
            updatedAt: true
        }
    })

    return brands
}

export async function createBrand(value: string, secoundValue: string) {
    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const isExist = await prisma.brand.findFirst({
        where: {
            name: value
        }
    })

    if (isExist) {
        throw new Error("قبلا ثبت شده است")
    }

    const newBrand = await prisma.brand.create({
        data: {
            name: value,
            url: secoundValue
        }
    })

    return newBrand
}

export async function editBrand(id: string, value: string, secoundValue: string) {
    const user = await getCurrentUser()
    if (!user || user.userRole === accessRole) {
        throw new Error("you havnt access!")
    }

    const isExist = await prisma.brand.findUnique({ where: { id } })

    if (!isExist) {
        throw new Error("چنین برندی ای وجود ندارد")
    }

    const newBrand = await prisma.brand.update({
        where: { id },
        data: {
            name: value,
            url: secoundValue
        }
    });


    return newBrand
}

export async function deleteBrand(id: string) {
    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const isExist = await prisma.brand.findUnique({
        where: { id }
    })

    if (!isExist) {
        throw new Error("قبلا ثبت شده نشده است")
    }


    const newBrand = await prisma.brand.delete({
        where: { id }
    })

    return newBrand.name
}