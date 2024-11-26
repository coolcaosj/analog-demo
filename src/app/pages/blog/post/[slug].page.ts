import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouterLink } from '@angular/router';

import PostAttributes from '../../../post-attributes';
import { TreeNode } from '../../../components/tree-node/tree-node';
import { TreeNodeComponent } from '../../../components/tree-node/tree-node.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, DatePipe, RouterLink, TreeNodeComponent],
  templateUrl: './[slug].page.html',
  styleUrl: './[slug].page.css',
})
export default class BlogPostComponent implements OnInit {
  readonly post$ = injectContent<PostAttributes>('slug');

  blogContent = '';
  treeData: TreeNode[] = [];

  ngOnInit() {
    this.post$.subscribe(post => {
      this.blogContent = post.content as string;
      this.treeData = this.parseHtmlToTree(post.content as string);
    });
  }

  scrollTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  parseHtmlToTree(html: string): TreeNode[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [];

    doc.body.querySelectorAll('h1, h2, h3').forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const heading = node as HTMLElement;
        const level = parseInt(heading.tagName.charAt(1));

        const newEntry: TreeNode = {
          id: heading.id,
          label: heading.textContent!,
          children: []
        };

        if (level === 1) {
          stack.length = 0; // Clear the stack
          stack.push(newEntry);
          result.push(newEntry);
        } else {
          // If there's no H1 ancestor, push a placeholder object as root
          if (stack.length === 0) {
            const placeholder: TreeNode = { label: 'Root', children: [], id: 'root' };
            result.push(placeholder);
            stack.push(placeholder);
          }

          // Use stack to find correct parent
          while (stack.length >= level) {
            stack.pop();
          }

          stack[stack.length - 1].children.push(newEntry);
          stack.push(newEntry);
        }
      }
    });
    return result;
  }

  navigateTo(id: string) {
    const element = document.getElementById(id);
    console.log(id, element);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
}
