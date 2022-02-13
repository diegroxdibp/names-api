import { Roles } from './roles';

export interface User {
    user_id: number;
    email: string;
    password: string;
    role: Roles,
}
