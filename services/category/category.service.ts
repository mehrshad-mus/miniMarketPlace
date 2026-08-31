import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { prisma } from "@/lib/prisma";
import { processSvg } from "@/lib/processSvg.";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";


export async function getAllCategory() {

    const category = await prisma.category.findMany({
        omit: {
            createdAt: true,
            updatedAt: true,
        }
    })

    return category
}

export async function createCategory(value: string, icon: File) {

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

    const svgText = await icon.text()

    const processedSvg = processSvg(svgText)

    console.log(processedSvg)

    const fileName = `${randomUUID()}.svg`


    const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "categories"
    )

    await mkdir(uploadDir, { recursive: true })

    await writeFile(
        path.join(uploadDir, fileName),
        processedSvg,
        "utf8"
    )

    const iconUrl = `/uploads/categories/${fileName}`


    const newCategory = await prisma.category.create({
        data: {
            name: value,
            iconUrl
        }
    })
}

export async function editCategoryName(value: string, id: string, icon: File) {
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

    if (icon) {
        const svgText = await icon.text()

        const processedSvg = processSvg(svgText)

        console.log(processedSvg)

        const fileName = `${randomUUID()}.svg`


        const uploadDir = path.join(
            process.cwd(),
            "public",
            "uploads",
            "categories"
        )

        await mkdir(uploadDir, { recursive: true })

        await writeFile(
            path.join(uploadDir, fileName),
            processedSvg,
            "utf8"
        )

        const iconUrl = `/uploads/categories/${fileName}`

        const newCategory = await prisma.category.update({
            where: {
                id
            }, data: {
                name: value,
                iconUrl
            }
        })
        
        return newCategory.name
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