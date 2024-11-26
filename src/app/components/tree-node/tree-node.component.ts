import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TreeNode } from "./tree-node";

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.less',
})
export class TreeNodeComponent implements OnInit {

  @Input() treeNode!: TreeNode;

  @Output() navigate = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  navigateTo(id: string) {
    this.navigate.emit(id);
  }

}
