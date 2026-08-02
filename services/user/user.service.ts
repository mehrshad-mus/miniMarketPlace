import { getCurrentUser } from "@/lib/auth"
import { accessRole } from "@/lib/constant/enums"
import { prisma } from "@/lib/prisma"
import { ProfileFields } from "@/lib/zodSchema/schema"
import { toGregorian } from "jalaali-js"

type getUsersParams = {
    currentPage: string | null,
    objectFilter: string | null,
    searchPhone: string | null,
}

export async function getUsers({ currentPage, objectFilter, searchPhone }: getUsersParams) {

    const user = await getCurrentUser()
    if (!user || user.userRole !== accessRole) {
        throw new Error("you havent access!")
    }

    const pageNumber = Number(currentPage)
    const skipPages = 5 * (pageNumber - 1)

    // if phone was entered 
    if (searchPhone) {

        // if phone and filter was enterd
        if (objectFilter) {
            const filter = JSON.parse(objectFilter)

            const totalCount = await prisma.user.count({
                where: {
                    status: filter.status,
                    role: filter.role,
                    phone: { startsWith: searchPhone }
                }
            })

            const users = await prisma.user.findMany({
                skip: skipPages,
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    status: filter.status,
                    role: filter.role,
                    phone: { startsWith: searchPhone }
                }
            });

            return {
                users,
                totalCount: Math.ceil(totalCount / 5),
            };
        }

        const totalCount = await prisma.user.count({
            where: { phone: { startsWith: searchPhone } }
        })

        const users = await prisma.user.findMany({
            skip: skipPages,
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            where: { phone: { startsWith: searchPhone } }
        })

        console.log(`from searchPhone ${totalCount} ${users}`)

        return {
            users,
            totalCount: Math.ceil(totalCount / 5),
        };
    }

    if (objectFilter) {
        const filter = JSON.parse(objectFilter)

        const totalCount = await prisma.user.count({
            where: {
                status: filter.status,
                role: filter.role
            }
        })

        const users = await prisma.user.findMany({
            skip: skipPages,
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                status: filter.status,
                role: filter.role
            }
        });

        return {
            users,
            totalCount: Math.ceil(totalCount / 5),
        };
    }

    const totalCount = await prisma.user.count()

    const users = await prisma.user.findMany({
        skip: skipPages,
        take: 5,
        orderBy: {
            createdAt: 'desc'
        },
    });

    return {
        users,
        totalCount: Math.ceil(totalCount / 5),
    }
}

export async function editProfile(data: ProfileFields) {



    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error("user dosent exist...!")

    const currentUserData = await prisma.user.findUnique({ where: { id: currentUser.userId } })

    const {
        gender,
        phone,
        userName,
        avatar,
        biography,
        birthday,
        facebook,
        instagram,
        name,
        nationalCode,
        telegram,
        role,
        id,
        twitter } = data



    const user = await prisma.user.findUnique({ where: { id } })

    if(!user){
        throw new Error("user dosent exist!")
    }

    if(user?.id !== currentUserData?.id){
        if(currentUser.userRole !== accessRole){
            throw new Error("you havent accsees ...!")
        }
    }

    if (user?.phone !== phone) {
        const existUserByPhone = await prisma.user.findUnique({ where: { phone } })
        if (existUserByPhone) throw new Error("phone is already exist!")
    }

    if (user?.nationalCode !== nationalCode) {
        const existUserByNationalCode = await prisma.user.findUnique({ where: { nationalCode } })
        if (existUserByNationalCode) throw new Error("nationalCode is already exist!")
    }

    if (user?.name !== name) {
        const existUserByName = await prisma.user.findFirst({ where: { name } })
        if (existUserByName) throw new Error("name is already exist!")
    }

    if (user?.userName !== userName) {
        const existUserByUserName = await prisma.user.findFirst({ where: { userName } })
        if (existUserByUserName) throw new Error("userName is already exist!")
    }

    //role specifics
    const changedRole = role.id === "USER" ? "USER" : role.id === "SELLER" ? "SELLER" : role.id === "ADMIN" ? "ADMIN" : undefined

    const validBirthday = birthday ? birthday : null

    const updateUser = await prisma.user.update(
        {
            where: { id },
            data: {
                avatar,
                birthday: validBirthday,
                biography,
                gender: gender.name === "آقا" ? "MALE" : "FEMALE",
                inestagram: instagram,
                name,
                userName,
                nationalCode,
                telegram,
                phone,
                role : changedRole && changedRole
            }
        }
    )


    return updateUser
}
