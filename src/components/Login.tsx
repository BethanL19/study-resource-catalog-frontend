import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../config";

interface User {
    id: number;
    name: string;
    is_faculty: boolean;
}

interface LoginProps {
    userId: number;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Login(props: LoginProps): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState(0);
    useEffect(() => {
        async function getUsers() {
            const response = await axios.get(`${baseURL}/users`);
            setUsers(response.data);
        }
        getUsers();
    }, []);

    const handleLogin = () => {
        props.setUserId(selectedUserId);
    };
    const handleLogout = () => {
        props.setUserId(0);
        setSelectedUserId(0);
        props.setShowResourcesPage(true);
    };

    return (
        <>
            {props.userId === 0 ? (
                <div>
                    <select
                        value={selectedUserId}
                        onChange={(event) =>
                            setSelectedUserId(parseInt(event.target.value))
                        }
                    >
                        <option value=""></option>
                        {users.map((user) => {
                            return (
                                <option value={user.id} key={user.id}>
                                    {user.name}
                                </option>
                            );
                        })}
                    </select>
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </>
    );
}
