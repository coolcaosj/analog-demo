import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { siteConfig } from './site.config';
import { BlogStore } from './store/blog.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly store = inject(BlogStore)
  siteName:string = siteConfig.siteName;
  search  = this.store.search;

  searchChange(text: string) {
    this.store.setSearch(text);
  }
}
