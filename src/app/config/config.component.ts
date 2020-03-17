import {Component, OnInit} from '@angular/core';
import {JsonFileReaderService} from '../bander-video/services/json-file-reader.service';
import {Video} from '../bander-video/models/video';
import {TreeNode} from 'primeng/api';
import {Scenario} from '../bander-video/models/scenario';
import {JsonEditorOptions} from 'ang-jsoneditor';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  data = [];
  jsonData: Scenario;
  editorOptions: JsonEditorOptions;

  constructor(private jsonFileReaderService: JsonFileReaderService) {
    this.jsonData = this.jsonFileReaderService.getAllScenarios()[0];
    this.buildTree(this.jsonData);
  }

  ngOnInit(): void {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code'];
    this.editorOptions.mode = 'code';
  }

  buildTree(scenario: Scenario) {
    this.data = [];

    const root = {
      expanded: true,
      type: 'root',
      data: scenario,
      children: []
    } as TreeNode;

    root.children.push(this.convertWithChildren(scenario.play));

    this.data.push(root);
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

  changeJson(change) {
    this.buildTree(change);
  }

}
