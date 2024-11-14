import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { siteConfig } from './site.config';
import { BlogStore } from './store/blog.store';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
  ) { }

  private readonly search$ = new Subject<string>();


  private readonly store = inject(BlogStore)
  siteName: string = siteConfig.siteName;
  search = this.store.search;
  showSearch: boolean = false;
  searchResult = this.store.searchResult;

  ngOnInit(): void {
    this.search$.pipe(debounceTime(500)).subscribe((text) => {
      this.store.setSearch(text);
    });
  }
  ngOnDestroy(): void {
    this.search$.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '/') {
      this.showSearchModal();
    }
  }

  searchChange(text: string) {
    this.search$.next(text);
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
