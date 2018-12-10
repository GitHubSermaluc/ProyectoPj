import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoPJ';
  constructor(private router: Router){
    router.navigate(['/bienvenida']);
  }
}
