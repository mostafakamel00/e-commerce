import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { user } from '../interfaces/user.interface';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  errorMsg = '';
  isUser: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    $('#signUp').particleground();
    this.authService.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }
  signUp(form: any) {
    let data: user = form.value;
    this.authService
      .signUp(data.email, data.password)
      .then((res) => {
        this.errorMsg = '';
        this.userService
          .addNewUser(res.user?.uid, data.name, data.address)
          .then(() => {
            this.router.navigate(['login']);
          })
          .catch((err) => console.log('err then', err));
      })
      .catch((err) => {
        console.log('err catch in', err);
        this.errorMsg = err.message;
      });
  }
}
