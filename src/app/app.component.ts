import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { siteConfig } from './site.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  siteName:string = siteConfig.siteName;
}
