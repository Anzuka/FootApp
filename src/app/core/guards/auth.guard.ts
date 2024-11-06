import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { map, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
// These interfaces enable the guard to control access to routes and child routes.
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authState: AuthService, private _router: Router) {}

    // Determines if the main route can be activated.
    // Calls the checkLoginStatus method, which returns an Observable<boolean>.
    canActivate(): Observable<boolean> {
      return this.checkLoginStatus();
    }

    // Determines if child routes can be activated.
    // Also calls checkLoginStatus, ensuring consistent checks for both main and child routes.
    canActivateChild(): Observable<boolean> {
      return this.checkLoginStatus();
    }

    // Private method to check the user's login status by subscribing to the isLoggedIn() Observable.
    // This method returns true if the user is logged in and false otherwise.
    private checkLoginStatus(): Observable<boolean> {
      return this.authState.isLoggedIn().pipe(
         map(connected => {
            // If the user is not connected, redirect to the login page and deny route access.
            if (!connected) {
               this._router.navigateByUrl('/user/login');
               return false;
            }
            // If the user is connected, allow access to the route.
            return true;
         })
      );
    }
}
