import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { DatePipe } from "@angular/common";
import { BlogStore } from "../../store/blog.store";

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class ArchivesComponent implements OnInit {
  private readonly store = inject(BlogStore);
  readonly postCount = this.store.count();
  readonly archives = this.store.archives();
  readonly years = [...this.archives.keys()].sort().reverse();
  ngOnInit(): void {
  }

}
