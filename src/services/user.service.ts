import getConnection from "config/database"
import { PrismaClient } from "@prisma/client";
import { prisma } from "config/client";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    await prisma.user.create({
        data: {
            fullName,
            username: email,
            address,
            password: '',
            accountType: ''
        }
    })
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({ where: { id: +id } })
}

const handleGetUserById = async (id: string) => {
    const user = prisma.user.findUnique({
        where: { id: +id }
    })

    return user
}

const updateUserById = async (id: string, email: string, address: string, fullName: string) => {
    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName,
            username: email,
            address,
            password: '',
            accountType: ''
        }
    })

    return updatedUser
}

export { handleCreateUser, handleDeleteUser, getAllUsers, handleGetUserById, updateUserById }