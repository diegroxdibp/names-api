export interface User {
    id: number;
    username: string;
    password?: string;
    name: string;
    email?: string;
    gravatar_hash: string;
    created_at: Date;
}
