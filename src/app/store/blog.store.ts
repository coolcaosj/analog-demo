import { computed, Injectable, signal } from "@angular/core";
import { ContentFile, injectContentFiles } from '@analogjs/content';
import PostAttributes from "src/app/post-attributes";

@Injectable({
  providedIn: 'root',
})
export class BlogStore {
  // 博客文章列表
  private readonly _content = signal<ContentFile<PostAttributes>[]>(injectContentFiles<PostAttributes>());

  readonly posts = computed(() => {
    return this._content().sort((a,b) => {
      if (a.attributes.pinned &&!b.attributes.pinned) return -1;
      if (!a.attributes.pinned && b.attributes.pinned) return 1;
      return new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime();
    });
  });
  readonly tags = computed(() => {
    return this._content().reduce((result: string[], post: ContentFile<PostAttributes>) => {
      const postTags = post.attributes.tags;
      if (!postTags) return result;
      for (const t of postTags) {
        if (result.includes(t)) continue;
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

}
