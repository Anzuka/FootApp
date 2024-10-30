export interface UserRegisterModel {
    firstname: string,
    lastname: string,
    email: string,
    birthdate?: Date,
    phoneNumber?: string,
    street?: string,
    city?: string,
    zip: string,
    state?: string,
    country?: string,
    username: string,
    password: string,
    confirmPassword: string
}
