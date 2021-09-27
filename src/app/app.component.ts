import { Component } from '@angular/core';
import { routingAni } from './animations/routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [routingAni],
})
export class AppComponent {
  outlet: any;
  title = 'e-commerce';
}
