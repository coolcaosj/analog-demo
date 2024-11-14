import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouterLink } from '@angular/router';

import PostAttributes from '../../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, DatePipe, RouterLink],
  templateUrl: './[slug].page.html',
  styleUrl: './[slug].page.css',
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
