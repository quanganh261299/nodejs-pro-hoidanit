import { prisma } from "./client"

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "hoiddanit@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                },
                {
                    username: "admin@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                }
            ]
        })
    }
    else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    }
    else {
        console.log(">> Already init data ...")
    }
}

export default initDatabase