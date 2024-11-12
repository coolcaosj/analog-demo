import { Component, computed, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BlogStore } from "../../store/blog.store";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class TagsComponent implements OnInit {
  private readonly store = inject(BlogStore);
  readonly postCount = computed(() => this.store.posts().length);
  readonly tags = computed(() => {
    return this.store.tags().reduce((result: string[], tag: string) => {
      if (!result.includes(tag)) {
        result.push(tag);
      }
      return result;
    }, [] as string[]).sort((a,b) => Math.random() - 0.5);
  });
  readonly tagsMap = computed(() => {
    const tags = this.store.tags();
    const map = new Map<string, number>();
    tags.forEach((tag) => {
      if (map.has(tag)) {
        map.set(tag, map.get(tag)! + 1);
      } else {
        map.set(tag, 1);
      }
    });
    return map;
  });
  readonly tagsCount = computed(() => this.tags().length);
  ngOnInit(): void {
  }

  getTagCount(tag: string) {
    return this.tagsMap().get(tag);
  }

  getTagSize(tag: string) {
    const count = this.getTagCount(tag);
    const precent = count! / this.postCount()!;
    return `${12 + Math.floor(precent * 28)}px`;
  }

}
