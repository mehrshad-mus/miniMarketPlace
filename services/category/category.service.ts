import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { prisma } from "@/lib/prisma";


export async function getAllCategory() {
    const user = await getCurrentUser()

    if (!user || user.userRole === "USER") {
        throw new Error("you havnt access!")
    }

    const category = await prisma.category.findMany({
        omit: {
            createdAt: true,
            updatedAt: true,
        }
    })

    return category
}

export async function createCategory(value: string) {
    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const isExist = await prisma.category.findFirst({
        where: {
            name: value
        }
    })

    if (isExist) {
        throw new Error("قبلا ثبت شده است")
    }

    const newCategory = await prisma.category.create({
        data: {
            name: value
        }
    })
    return newCategory.name
}

export async function editCategoryName({value , id}: {value: string ,id : string}) {
    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const isExist = await prisma.category.findUnique({
        where: {id}
    })

    if (!isExist) {
        throw new Error("قبلا ثبت شده نشده است")
    }


    const newCategory = await prisma.category.update({
        where: {
            id
        }, data: {
            name: value
        }
    })

    return newCategory.name
}

export async function deletCategory(id: string) {
    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const isExist = await prisma.category.findUnique({
        where: { id }
    })

    if (!isExist) {
        throw new Error("قبلا ثبت شده نشده است")
    }


    const newCategory = await prisma.category.delete({
        where: { id }
    })

    return newCategory.name
}