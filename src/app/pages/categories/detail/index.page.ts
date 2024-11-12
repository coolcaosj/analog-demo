import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { BlogStore } from "../../../store/blog.store";

@Component({
  selector: 'app-categories-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class CategoryDetailComponent implements OnInit {
  private readonly store = inject(BlogStore);
  readonly category = signal('');
  readonly posts = computed(() => this.store.posts().filter(post => post.attributes.category == this.category()));

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.category.set(this.route.snapshot.queryParams['category']);

  }

}
