import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { injectContent, MarkdownComponent } from "@analogjs/content";
import AboutAttributes from "src/app/pages/about/about.attributes";

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './index.page.html',
  styleUrl: './index.page.css',
})
export default class AboutComponent implements OnInit {
  readonly about$ = injectContent<AboutAttributes>({ customFilename: 'about/about' });
  readonly content: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.about$.subscribe(res => {
      this.content.set(res.content as string);
    });
  }

}
