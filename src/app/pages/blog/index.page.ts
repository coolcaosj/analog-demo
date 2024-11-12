import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentFile, injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { BlogStore } from '../../store/blog.store';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class BlogComponent implements OnInit {

  private readonly blogStore = inject(BlogStore);
  // 博客文章列表
  readonly posts = this.blogStore.posts;
  // 标签列表
  readonly tags = this.blogStore.tags;
  // 博客分类
  readonly categories =  this.blogStore.categories;

  // 分页
  readonly hasNext = this.blogStore.hasNext;
  readonly hasPrev = this.blogStore.hasPrev;
  readonly pageIdx = this.blogStore.pageIndex;
  readonly totalPage = this.blogStore.totalPage;


  constructor() {}

  ngOnInit(): void {

  }

  next() {
    this.blogStore.nextPage();
  }
  prev() {
    this.blogStore.prevPage();
  }

}
