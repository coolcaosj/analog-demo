import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, DatePipe],
  templateUrl: './[slug].page.html',
  styleUrl: './[slug].page.css',
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
