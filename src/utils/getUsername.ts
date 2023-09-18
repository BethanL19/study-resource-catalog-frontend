import { User } from "../components/Login";

export default function getUsername(users: User[], userId: number) {
    const currentUser = users.find((user) => user.id === userId) as User;
    return currentUser.name;
}
