import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../config";
import showToast from "../utils/showToast";
import { Button, Select } from "@chakra-ui/react";
import getUsername from "../utils/getUsername";

export interface User {
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
        const username = getUsername(users, selectedUserId);
        showToast(
            `👋 Welcome, ${username}!`,
            "You've been logged in.",
            "success"
        );
    };
    const handleLogout = () => {
        props.setUserId(0);
        setSelectedUserId(0);
        props.setShowResourcesPage(true);

        const username = getUsername(users, selectedUserId);
        showToast(`👋 Bye, ${username}!`, "You've been logged out.", "success");
    };

    return (
        <div className="login-surround">
            {props.userId === 0 ? (
                <div className="login">
                    <Select
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
                    </Select>
                    <Button onClick={handleLogin}>Login</Button>
                </div>
            ) : (
                <div className="login">
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )}
        </div>
    );
}
