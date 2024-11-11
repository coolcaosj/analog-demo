import { Component, inject, OnInit } from "@angular/core";
import { BlogStore } from "../../store/blog.store";

@Component({
  selector: 'app-archives',
  standalone: true,
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class CategoriesComponent implements OnInit {
  private readonly store = inject(BlogStore);
  ngOnInit(): void {
  }

}
