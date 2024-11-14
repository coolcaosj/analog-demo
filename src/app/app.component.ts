import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
  ) {}
  private readonly store = inject(BlogStore)
  siteName:string = siteConfig.siteName;
  search  = this.store.search;
  showSearch: boolean = false;
  searchResult = this.store.searchResult;

  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '/') {
      this.showSearchModal();
    }
  }

  searchChange(text: string) {
    this.store.setSearch(text);
  }

  showSearchModal() {
    this.showSearch = true;
  }
  closeSearchModal() {
    this.showSearch = false;
  }

  goToPost(slug: string) {
    this.closeSearchModal();
    this.store.setSearch('');
    this.router.navigate(['blog', 'post', slug]);
  }

  clickModal(event: MouseEvent) {
    if (event.target !== event.currentTarget) {
      // 点击的是子元素，不触发事件
      return;
    }
    this.closeSearchModal();
  }
}
