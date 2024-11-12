import { computed, Injectable, signal } from "@angular/core";
import { ContentFile, injectContentFiles } from '@analogjs/content';
import PostAttributes from "src/app/post-attributes";

@Injectable({
  providedIn: 'root',
})
export class BlogStore {
  // 博客文章列表
  private readonly _content = signal<ContentFile<PostAttributes>[]>(injectContentFiles<PostAttributes>());
  private _pageSize = signal(5); // 每页文章数量
  private _pageIndex = signal(1); // 当前页码
  private _search = signal('');   // 搜索关键字

  readonly pageSize = this._pageSize.asReadonly();
  readonly pageIndex = this._pageIndex.asReadonly();
  readonly search = this._search.asReadonly();
  readonly hasNext = computed(() => this.pageIndex() * this.pageSize() < this.count());
  readonly hasPrev = computed(() => this.pageIndex() > 1);
  readonly totalPage = computed(() => Math.ceil(this.count() / this.pageSize()));

  readonly posts = computed(() => {
    return this._content().filter(post => post.attributes.slug != 'about').filter(post => {
      if (post.attributes.title) {
        return post.attributes.title.toLowerCase().includes(this._search().toLowerCase());
      }
      return false;
    }).sort((a,b) => {
      if (a.attributes.pinned &&!b.attributes.pinned) return -1;
      if (!a.attributes.pinned && b.attributes.pinned) return 1;
      return new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime();
    }).slice((this.pageIndex() - 1) * this.pageSize(), this.pageIndex() * this.pageSize());
  });
  readonly count = computed(() => this.posts().length);
  readonly tags = computed(() => {
    return this._content().reduce((result: string[], post: ContentFile<PostAttributes>) => {
      const postTags = post.attributes.tags;
      if (!postTags) return result;
      for (const t of postTags) {
        result.push(t);
      }
      return result;
    }, [] as string[]);
  });
  readonly categories = computed(() => {
    return this._content().reduce((result: string[], post: ContentFile<PostAttributes>) => {
      const postCategory = post.attributes.category;
      if (!postCategory) return result;
      if (result.includes(postCategory)) return result;
      result.push(postCategory);
      return result;
    }, [] as string[]);
  });

  setSearch(text: string) {
    this._search.set(text);
  }

  nextPage() {
    this._pageIndex.update(v => v + 1);
  }

  prevPage() {
    this._pageIndex.update(v => v - 1);
  }


}
