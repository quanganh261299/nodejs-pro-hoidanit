import { prisma } from "./client"

const initDatabase = async () => {
    const countUser = await prisma.user.count();

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
    else {
        console.log(">> Already init data ...")
    }
}

export default initDatabase