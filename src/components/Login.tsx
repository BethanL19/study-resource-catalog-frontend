import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../config";

interface User {
    id: number;
    name: string;
    is_faculty: boolean;
}
export function Login(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function getUsers() {
            const response = await axios.get(`${baseURL}/users`);
            console.log(response.data);
            setUsers(response.data);
        }
        getUsers();
    }, []);
    return (
        <>
            <select>
                {users.map((user) => {
                    return <option key={user.id}>{user.name}</option>;
                })}
            </select>
        </>
    );
}
