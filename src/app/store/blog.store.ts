import { computed, Injectable, signal } from "@angular/core";
import { ContentFile, injectContentFiles } from '@analogjs/content';
import PostAttributes from "src/app/post-attributes";

@Injectable({
  providedIn: 'root',
})
export class BlogStore {
  // 博客文章列表
  private readonly _content = signal<ContentFile<PostAttributes>[]>(injectContentFiles<PostAttributes>());
  private _pageSize = signal(8); // 每页文章数量
  private _pageIndex = signal(1); // 当前页码
  private _search = signal('');   // 搜索关键字

  readonly allPosts = computed(() => {
    // 只保留post
    return this._content().filter(post => post.attributes.slug != 'about');
  });

  readonly pageSize = this._pageSize.asReadonly();
  readonly pageIndex = this._pageIndex.asReadonly();
  readonly search = this._search.asReadonly();
  readonly hasNext = computed(() => this.pageIndex() * this.pageSize() < this.count());
  readonly hasPrev = computed(() => this.pageIndex() > 1);
  readonly totalPage = computed(() => Math.ceil(this.count() / this.pageSize()));

  readonly posts = computed(() => {
    return this.allPosts().filter(post => {
      if (post.attributes.title) {
        if (this._search()) {
          return post.attributes.title.toLowerCase().includes(this._search().toLowerCase());
        }
        return true;
      }
      return false;
    }).sort((a, b) => {
      if (a.attributes.pinned && !b.attributes.pinned) return -1;
      if (!a.attributes.pinned && b.attributes.pinned) return 1;
      return new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime();
    }).slice((this.pageIndex() - 1) * this.pageSize(), this.pageIndex() * this.pageSize());
  });


  readonly searchResult = computed(() => {
    return this.allPosts().filter(post => {
      if (post.attributes.title) {
        if (this._search()) {
          return post.attributes.title.toLowerCase().includes(this._search().toLowerCase());
        }
        return true;
      }
      return false;
    }).sort((a, b) => {
      if (a.attributes.pinned && !b.attributes.pinned) return -1;
      return 1;
    });
  });


  readonly count = computed(() => this.allPosts().length);
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
      const postCategory = post.attributes.categories;
      if (!postCategory) return result;
      if (result.includes(postCategory)) return result;
      result.push(postCategory);
      return result;
    }, [] as string[]);
  });

  readonly archives = computed(() => {
    return this.allPosts().reduce((result: Map<string, string[][]>, post: ContentFile<PostAttributes>) => {
      const postDate = post.attributes.date;
      if (!postDate) return result;
      const year = new Date(postDate).getFullYear();
      const key = `${year}`;
      if (result.has(key)) {
        result.get(key)?.push([post.attributes.slug, post.attributes.title]);
      } else {
        result.set(key, [[post.attributes.slug, post.attributes.title]]);
      }
      return result;
    }, new Map());
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
