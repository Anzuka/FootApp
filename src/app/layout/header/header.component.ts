import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  items: MenuItem[] = [];
  isConnected!: Observable<boolean>;
  username!: Observable<string | undefined>;

  constructor(private _authService: AuthService){}

  ngOnInit() {
    this.isConnected = this._authService.isLoggedIn();
    this.username = this._authService.getUsernameObservable();
    
    this.items = [
      {
        label: 'Tournament',
        items: [
          { label: 'My Tournaments', icon: 'pi pi-fw pi-plus', url: '/tournament/organize' },
          { label: 'My Participations', icon: 'pi pi-fw pi-sign-in' },
          { label: 'All Tournaments', icon: 'pi pi-fw pi-search', url: '/tournament/search' }
        ]
      },
      {
        label: 'Team',
        items: [
          { label: 'My Teams'},
          { label: 'All Teams'}
        ]
      },
      {
        label: 'Favorites',
        items: [
          { label: 'My Favorites Matchs' },
          { label: 'My Favorites Teams' },
          { label: 'My Moderates Matchs' }
        ]
      }
    ];
  }

  logout() {
    this._authService.logout();
  }

}
