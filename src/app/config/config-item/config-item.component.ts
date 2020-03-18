import {Component, Input, OnInit} from '@angular/core';
import {Scenario} from '../../bander-video/models/scenario';
import {JsonEditorOptions} from 'ang-jsoneditor';
import {JsonFileReaderService} from '../../shared/services/json-file-reader.service';
import {TreeNode} from 'primeng/api';
import {Video} from '../../bander-video/models/video';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.scss']
})
export class ConfigItemComponent implements OnInit {
  treeData = [];

  @Input() set scenario(scn: Scenario) {
    this.buildTree(scn);
  }

  constructor(private jsonFileReaderService: JsonFileReaderService) {
  }

  ngOnInit(): void {
  }

  buildTree(scenario: Scenario) {
    this.treeData = [];

    const root = {
      expanded: true,
      type: 'root',
      data: scenario,
      children: []
    } as TreeNode;

    root.children.push(this.convertWithChildren(scenario.play));

    this.treeData.push(root);
  }


  convertToTreeNode(video: Video) {
    return {
      expanded: !!video.answers,
      type: 'video',
      label: video.id,
      data: {...video}
    };
  }

  convertWithChildren(video: Video) {
    const node = this.convertToTreeNode(video) as TreeNode;
    if (video.answers) {
      node.children = [];
      for (const answer of video.answers) {
        const childNode = this.convertWithChildren(answer.play);
        childNode.data.answer = answer.text;

        node.children.push(childNode);
      }
    }
    return node;
  }

  jwPlayerSource(node: TreeNode) {
    return `https://content.jwplatform.com/videos/${node.data.id}.mp4`;
  }


}
