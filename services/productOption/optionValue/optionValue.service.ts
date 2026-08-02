import { getCurrentUser } from "@/lib/auth"
import { accessRole } from "@/lib/constant/enums"
import { prisma } from "@/lib/prisma"


export async function createOptionValue(id: string, value: string) {
    const user = await getCurrentUser()
    if (!user || user.userRole !== accessRole) {
        throw new Error("you havent access!")
    }

    const optionValue = await prisma.createdOptionValue.create({
        data: {
            value,
            createdOptionId: id
        }
    })

    return optionValue
}

export async function editOptionValue(id: string, value: string) {

    const user = await getCurrentUser()
    if (!user || user.userRole !== accessRole) {
        throw new Error("you havent access!")
    }

    const optionValue = await prisma.createdOptionValue.update({
        where: { id },
        data: { value }
    })

    return optionValue
}

export async function deleteOptionValue(id: string) {
    const user = await getCurrentUser()
    if (!user || user.userRole !== accessRole) {
        throw new Error("you havent access!")
    }


    const optionValue = await prisma.createdOptionValue.delete({
        where: { id }
    })

    return optionValue.id
}