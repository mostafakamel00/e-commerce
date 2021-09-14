import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  isUser: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    $('#signIn').particleground();
    this.authService.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }
  signIn(form: any) {
    let data = form.value;
    this.authService
      .signIn(data.email, data.password)
      .then((res) => {
        this.errorMsg = '';
        console.log('res', res);
      })
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log('err', err);
        this.errorMsg = err.message;
      });
  }
}
