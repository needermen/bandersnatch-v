import {Component, OnInit} from '@angular/core';
import {JsonFileReaderService} from '../bander-video/services/json-file-reader.service';
import {Video} from '../bander-video/models/video';
import {TreeNode} from 'primeng/api';
import {Scenario} from '../bander-video/models/scenario';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  data = [];
  selectedScenario: Scenario;

  constructor(private jsonFileReaderService: JsonFileReaderService) {
    this.selectedScenario = this.jsonFileReaderService.getAllScenarios()[0];
    const root = {
      expanded: true,
      type: 'root',
      data: this.selectedScenario,
      children: []
    } as TreeNode;

    root.children.push(this.convertWithChildren(this.selectedScenario.play));

    this.data.push(root);
  }

  ngOnInit(): void {
  }

  convertToTreeNode(video: Video) {
    return {
      expanded: !!video.answers,
      type: 'video',
      label: video.id,
      data: video
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
