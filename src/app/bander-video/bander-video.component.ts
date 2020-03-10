import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {JsonFileReaderService} from './json-file-reader.service';
import {Node} from './node';
import {Subject, timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {fade} from './fade.animation';
import {faChevronCircleLeft, faCompress, faExpand, faPauseCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons';

declare var Hls;

@Component({
  selector: 'app-bander-video',
  templateUrl: './bander-video.component.html',
  styleUrls: ['./bander-video.component.scss'],
  animations: [fade]
})
export class BanderVideoComponent implements OnInit, AfterViewInit {
  faExpand = faExpand;
  faCompress = faCompress;
  faPlay = faPlayCircle;
  faPause = faPauseCircle;
  faBack = faChevronCircleLeft;

  countDown: number;
  anwerId: number;
  paused: boolean;
  fullScreened: boolean;
  showPlayerControls: boolean;

  node: Node;
  nextNode: Node;

  showQuestion: boolean;

  currentVideo: any;
  newVideo: any;

  @Input() scenarioId: string;

  @Output() backIt = new EventEmitter();

  @ViewChild('wrapper', {static: false}) wrapper: ElementRef;

  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private renderer2: Renderer2, private jsonFileReader: JsonFileReaderService) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.showPlayerControls = false);
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1200);
  }

  onmouseMove() {
    this.showPlayerControls = true;
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit(): void {
    this.node = this.jsonFileReader.getFirst(this.scenarioId);
  }

  ngAfterViewInit(): void {
    this.currentVideo = this.wrapper.nativeElement.querySelector('#vi');
    this.currentVideo.addEventListener('timeupdate', this.triggerCheck);
    this.currentVideo.addEventListener('loadedmetadata', () => {
      this.currentVideo.play();
      this.currentVideo.muted = '';
    });
  }

  triggerCheck = () => {
    if (!this.currentVideo.duration || !this.currentVideo.currentTime) {
      return;
    }
    if ((this.currentVideo.duration - this.currentVideo.currentTime) * 1000 < 3000) {
      if (this.showQuestion) {
        this.processQuestion();
      }
      return;
    }
    if ((this.currentVideo.duration - this.currentVideo.currentTime) * 1000 < 13000) {
      if (!this.showQuestion) {
        this.showQuestion = true;
        this.countDown = 10;
        timer(1000, 1000).pipe(take(10)).subscribe(() => {
          this.countDown = this.countDown - 1;
        });
      }
    }
  };

  processQuestion() {
    this.anwerId = 0;
    this.showQuestion = false;
    if (!this.nextNode && !this.processDefault()) {
      // ended
      return;
    }

    this.createNewVideo();
    this.currentVideo.addEventListener('ended', this.startNewVideo);
  }

  createNewVideo() {
    // create new Video
    this.newVideo = this.renderer2.createElement('video');
    this.renderer2.setAttribute(this.newVideo, 'id', this.nextNode.id);
    // this.newVideo.muted = 'muted';
    this.renderer2.setStyle(this.newVideo, 'display', 'none');
    this.renderer2.setAttribute(this.newVideo, 'crossorigin', 'crossorigin');
    this.renderer2.insertBefore(this.wrapper.nativeElement, this.newVideo, this.wrapper.nativeElement.firstChild);
    this.processVideoWithHls();
  }

  startNewVideo = () => {
    // show new video
    this.newVideo.muted = '';
    // this.newVideo.currentTime = 0;
    this.newVideo.play();
    this.renderer2.setStyle(this.newVideo, 'display', 'block');

    // remove old video
    this.renderer2.setStyle(this.currentVideo, 'display', 'none');
    this.renderer2.removeChild(this.wrapper.nativeElement, this.currentVideo);
    this.currentVideo = null;

    this.node = this.nextNode;
    this.nextNode = null;

    this.currentVideo = this.newVideo;
    this.currentVideo.addEventListener('timeupdate', this.triggerCheck);
  };

  processVideoWithHls() {
    if (this.nextNode.hls) {
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(this.nextNode.hls);
        hls.attachMedia(this.newVideo);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // this.newVideo.play();
        });
      } else if (this.newVideo.canPlayType('application/vnd.apple.mpegurl')) {
        this.renderer2.setAttribute(this.newVideo, 'src', this.nextNode.hls);
        this.newVideo.addEventListener('loadedmetadata', () => {
          // this.newVideo.play();
        });
      }
    } else {
      this.newVideo.addEventListener('loadedmetadata', () => {
        // this.newVideo.play();
        this.renderer2.setAttribute(this.newVideo, 'src', this.nextSrc);
      });
    }
  }

  pause() {
    console.log('pause');
    this.currentVideo.pause();
    this.paused = true;
  }

  play() {
    this.currentVideo.play();
    this.paused = false;
  }

  fullscreen() {
    if (this.RunPrefixMethod(document, 'FullScreen') || this.RunPrefixMethod(document, 'IsFullScreen')) {
      this.RunPrefixMethod(document, 'CancelFullScreen');
      this.fullScreened = false;
    } else {
      this.RunPrefixMethod(this.wrapper.nativeElement, 'RequestFullScreen');
      this.fullScreened = true;
    }
  }

  RunPrefixMethod(obj, method) {
    let pfx = ['webkit', 'moz', 'ms', 'o', ''];
    var p = 0, m, t;
    while (p < pfx.length && !obj[m]) {
      m = method;
      if (pfx[p] == '') {
        m = m.substr(0, 1).toLowerCase() + m.substr(1);
      }
      m = pfx[p] + m;
      t = typeof obj[m];
      if (t != 'undefined') {
        pfx = [pfx[p]];
        return (t == 'function' ? obj[m]() : obj[m]);
      }
      p++;
    }

  }

  processAnswer(id: number) {
    this.anwerId = id;
    console.log('process answer');
    const result = this.node.answers.filter(a => a.id == id)[0];
    this.selectNextNode(result.goTo);
  }

  processDefault() {
    if (this.node.answers && this.node.answers[0]) {
      this.selectNextNode(this.node.answers[0].goTo);
      return true;
    } else {
      return false;
    }
  }

  selectNextNode(nodeId: string) {
    const result = this.jsonFileReader.getById(this.scenarioId, nodeId);
    if (result) {
      this.nextNode = result;
    } else {
      this.nextNode = <Node> {id: nodeId};
    }
    console.log('next node = ' + JSON.stringify(this.nextNode));
  }

  get src() {
    return this.source(this.node);
  }

  get nextSrc() {
    return this.source(this.nextNode);
  }

  source(node: Node) {
    return node.url ? node.url : `https://content.jwplatform.com/videos/${node.id}.mp4`;
  }

}
