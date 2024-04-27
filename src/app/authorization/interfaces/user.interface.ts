export type UserAPIResponse = Pick<User, 'access_token' | 'refresh_token'>;

export interface User {
    email: string;
    username: string;
    access_token: string;
    refresh_token: string;
    image: string;
    firstName: string;
    lastName: string;
}
