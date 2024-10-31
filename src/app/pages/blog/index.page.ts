import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class BlogComponent implements OnInit {
  readonly posts = injectContentFiles<PostAttributes>();
  readonly tags = this.posts.reduce((acc, post) => {
    return [...acc, ...post.attributes.tags];
  }, []);


  ngOnInit(): void {

  }
}
