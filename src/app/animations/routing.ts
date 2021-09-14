import { animate, style, transition, trigger } from '@angular/animations';

export const routingAni = trigger('fade', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateX(100%)' }),
    animate('1000ms', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);
