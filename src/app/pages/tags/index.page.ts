import { Component, inject, OnInit } from "@angular/core";
import { BlogStore } from "../../store/blog.store";

@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class TagsComponent implements OnInit {
  private readonly store = inject(BlogStore);
  ngOnInit(): void {
    console.log(this.store.tags);
  }

}
