import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus' },
          { label: 'Open', icon: 'pi pi-fw pi-external-link' },
          { label: 'Quit', icon: 'pi pi-fw pi-times' }
        ]
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: 'pi pi-fw pi-undo' },
          { label: 'Redo', icon: 'pi pi-fw pi-repeat' }
        ]
      },
      {
        label: 'Help',
        items: [
          { label: 'Contents' },
          { label: 'Search', icon: 'pi pi-fw pi-search' }
        ]
      },
      {
        label: 'test',
        items: [
          { label: 'test' },
          { label: 'test', icon: 'pi pi-fw pi-search' }
        ]
      },
    ];
  }

}
