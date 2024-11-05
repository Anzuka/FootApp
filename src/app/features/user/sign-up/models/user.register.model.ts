export interface UserRegisterModel {
    username: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    email: string,
    birthdate?: Date,
    phoneNumber?: string,
    street?: string,
    city?: string,
    zip: string,
    state?: string,
    country?: string
}
