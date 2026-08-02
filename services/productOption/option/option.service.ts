import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { prisma } from "@/lib/prisma";



export async function getAllOption() {

    const user = await getCurrentUser()
    if (!user || user.userRole === "USER") {
        throw new Error("you havent access!")
    }

    const options = await prisma.createdOption.findMany({
        omit: {
            createdAt: true,
            updatedAt: true,
        },
        include: {
            createdOptionValue: {
                omit: {
                    createdAt: true,
                    updatedAt: true,
                }
            },
        }
    })

    return options
}

export async function createOption(value: string) {

    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const option = await prisma.createdOption.create({
        data: {
            name: value
        }
    })

    return option.name
}

export async function editOption(id: string, value: string) {

    const user = await getCurrentUser()
    if (!user || user.userRole !== accessRole) {
        throw new Error("you havent access!")
    }

    const option = await prisma.createdOption.update({
        where: { id },
        data: {
            name: value
        }
    })

    return option.id
}

export async function deleteOption(id: string) {

    const user = await getCurrentUser()
    if (!user || user.userRole !== accessRole) {
        throw new Error("you havent access")
    }

    const option = await prisma.createdOption.findUnique({ where: { id } })

    if (!option) {
        throw new Error("this option dosent exist!")
    }

    const deleteOption = await prisma.createdOption.delete({
        where: { id },
    })

    return deleteOption.id
}

