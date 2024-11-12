import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { BlogStore } from "../../../store/blog.store";

@Component({
  selector: 'app-tag-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class TagDetailComponent implements OnInit {
  private readonly store = inject(BlogStore);
  readonly tag = signal<string>('');
  readonly posts = computed(() => {
    return this.store.allPosts().filter(post => {
      if ( post.attributes.tags) {
        console.log(post.attributes.title,post.attributes.tags);
        console.log(this.tag());

        return post.attributes.tags.includes(this.tag());
      }
      return false;
    });
  });
  constructor(
    private readonly route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tag.set(params['tag']);
    });
  }

}
