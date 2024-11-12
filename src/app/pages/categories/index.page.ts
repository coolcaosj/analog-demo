import { Component, computed, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BlogStore } from "../../store/blog.store";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class CategoriesComponent implements OnInit {
  private readonly store = inject(BlogStore);
  readonly categories = computed(() => this.store.categories());
  readonly categoryMap = computed(() => {
    const map = new Map<string, number>();
      for (const cs of this.categories()) {
        for (const c of cs) {
          map.set(c, map.has(c)? map.get(c)! + 1 : 1)
        }
      }
    return map;
  });
  ngOnInit(): void {

  }

}
