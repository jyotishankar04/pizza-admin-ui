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

// For creating a user, we don't need id and we need password
export interface CreateUserRequest {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    tanentId?: string; // Use tanentId instead of full tanent object
}