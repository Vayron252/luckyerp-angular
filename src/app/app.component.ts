import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModule } from './Components/Login/login.module';
import { SharedModule } from './Reutilizable/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule,LoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppLuckyERP-MarcoAlarcon-Angular';
}
