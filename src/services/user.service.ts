import getConnection from "../config/database"

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    const connection = await getConnection();

    // execute will internally call prepare and query
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

const getAllUsers = async () => {
    const connection = await getConnection();

    try {
        const [results] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { handleCreateUser, getAllUsers }