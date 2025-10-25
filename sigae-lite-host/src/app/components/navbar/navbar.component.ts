import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'sigae-lite-navbar',
  standalone: true,
  imports: [
    Dialog,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
