export type Credentials = {
    email: string;
    password: string;
};

export interface Tanent {
    id: string;
    name: string;
    address: string;
    updatedAt: string;
    createdAt: string;
}


export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    tanent?: Tanent
}