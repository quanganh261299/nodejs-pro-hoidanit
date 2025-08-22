import { hashPassword } from "services/user.service";
import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser === 0) {
        const defaultPassword = await hashPassword('123456');
        await prisma.user.createMany({
            data: [
                {
                    fullName: 'hoidanit',
                    username: "hoiddanit@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
                {
                    fullName: 'hoidanit',

                    username: "admin@gmail.com",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM
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