import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BlogStore } from "../../store/blog.store";

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class CategoriesComponent implements OnInit {
  private readonly store = inject(BlogStore);
  readonly postCount = this.store.count();
  readonly archives = this.store.archives();
  readonly years = [...this.archives.keys()].sort((a, b) => b - a);
  ngOnInit(): void {

  }

}
