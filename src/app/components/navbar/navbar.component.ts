import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isOpen: Boolean = false;
  isUser: boolean = false;
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.AuthService.user.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.AuthService.userId = user.uid;
      } else {
        this.isUser = false;
        this.AuthService.userId = '';
      }
    });
  }
  toggleNav() {
    this.isOpen = !this.isOpen;
  }
  signOut() {
    this.AuthService.signOut().then(() => console.log('out'));
    this.router.navigate(['login']);
  }
}
