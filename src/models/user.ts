export enum Roles {
    'user',
    'admin'
}

export const roles = {
	USER: 'user',
	ADMIN: 'admin'
};

export interface User {
    user_id: number;
    email: string;
    password: string;
    role: Roles,
}
