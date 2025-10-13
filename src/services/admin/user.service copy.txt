import getConnection from "config/database"

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

const handleDeleteUser = async (id: string) => {
    const connection = await getConnection();

    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result
    } catch (err) {
        console.log(err);
        return []
    }
}

const handleGetUserById = async (id: string) => {
    const connection = await getConnection();

    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];

        const [results] = await connection.query(sql, values);
        return results[0];
    } catch (err) {
        console.log(err);
        return [];
    }
}

const updateUserById = async (id: string, email: string, address: string, fullName: string) => {
    const connection = await getConnection();

    try {
        const sql = 'UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?';
        const values = [fullName, email, address, id];

        const [results] = await connection.query(sql, values);
        console.log(results, 'results')
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { handleCreateUser, handleDeleteUser, getAllUsers, handleGetUserById, updateUserById }