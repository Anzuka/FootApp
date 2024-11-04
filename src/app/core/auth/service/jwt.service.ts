import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JwtService{
    AUTH_TOKEN: string = 'authToken';

    getToken(): string | null{
        return localStorage.getItem(this.AUTH_TOKEN);
    }
    
    saveToken(token: string): void {
        localStorage.setItem(this.AUTH_TOKEN, token);
    }

    destroyToken(): void {
        localStorage.removeItem(this.AUTH_TOKEN);
    }
}