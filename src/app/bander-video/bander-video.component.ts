import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {JsonFileReaderService} from './services/json-file-reader.service';
import {Video} from './models/video';
import {Subject, timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {fade} from './animations/fade.animation';
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

  node: Video;
  nextNode: Video;

  currentVideo: any;
  newVideo: any;

  @Input() scenarioId: string;
  @Output() backIt = new EventEmitter();
  @ViewChild('wrapper', {static: false}) wrapper: ElementRef;

  constructor(private renderer2: Renderer2, private jsonFileReader: JsonFileReaderService) {
  }

  ngOnInit(): void {
    this.node = this.jsonFileReader.getFirst(this.scenarioId);
    this.initMovementHandling();
  }

  ngAfterViewInit(): void {
    this.currentVideo = this.wrapper.nativeElement.querySelector('#vi');
    this.loadVideo(this.node, this.currentVideo, true);
    this.currentVideo.addEventListener('timeupdate', this.triggerCheck);
  }

  triggerCheck = () => {
    if (!this.currentVideo.duration || !this.currentVideo.currentTime) {
      return;
    }
    if ((this.currentVideo.duration - this.currentVideo.currentTime) * 1000 < 3000) {
      if (this.questionMode) {
        this.processQuestion();
      }
      return;
    }
    if ((this.currentVideo.duration - this.currentVideo.currentTime) * 1000 < 13000) {
      if (!this.questionMode) {
        this.questionMode = true;
        if (this.node && this.node.answers && this.node.answers.length > 0) {
          this.countDown = 10;
          timer(1000, 1000).pipe(take(10)).subscribe(() => {
            this.countDown = this.countDown - 1;
          });
        }
      }
    }
  };

  createNewVideo() {
    // create new Video
    this.newVideo = this.renderer2.createElement('video');
    this.renderer2.setAttribute(this.newVideo, 'id', this.nextNode.id);
    this.renderer2.setStyle(this.newVideo, 'display', 'none');
    this.renderer2.setAttribute(this.newVideo, 'crossorigin', 'crossorigin');
    this.renderer2.insertBefore(this.wrapper.nativeElement, this.newVideo, this.wrapper.nativeElement.firstChild);
    this.loadVideo(this.nextNode, this.newVideo);
  }

  loadVideo(node, video, start = false) {
    if (node.hls) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(this.jwPlayerHlsSource(node));
        hls.attachMedia(video);
        if (start) {
          if (start) {
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play();
            });
          }
        }
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        this.renderer2.setAttribute(video, 'src', this.jwPlayerHlsSource(node));
        if (start) {
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        }
      }
    } else {
      this.renderer2.setAttribute(video, 'src', this.jwPlayerSource(node));
      if (start) {
        video.addEventListener('loadedmetadata', () => {
            video.play();
          }
        );
      }
    }
  }

  startNewVideo = () => {
    // show new video
    this.newVideo.muted = '';
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

  jwPlayerSource(node: Video) {
    return node.url ? node.url : `https://content.jwplatform.com/videos/${node.id}.mp4`;
  }

  jwPlayerHlsSource(video: Video) {
    return `https://cdn.jwplayer.com/manifests/${video.id}.m3u8`;
  }

  /* Movement Handling */
  userActivity;
  userInactive: Subject<any> = new Subject();

  initMovementHandling() {
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

  /* player */
  paused: boolean;
  fullScreened: boolean;
  showPlayerControls: boolean;

  pause() {
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
    let p = 0;
    let m;
    let t;
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

  /* Process Question, Answer */
  questionMode: boolean;
  countDown: number;
  answerIndex: number;

  processQuestion() {
    this.answerIndex = -1;
    this.questionMode = false;
    if (!this.nextNode && !this.processDefault()) {
      this.currentVideo.addEventListener('ended', () => this.backIt.emit());
    } else {
      this.createNewVideo();
      this.currentVideo.addEventListener('ended', this.startNewVideo);
    }
  }

  processAnswer(id: number) {
    this.answerIndex = id;
    const result = this.node.answers[this.answerIndex];
    this.selectNextNode(result.play);
  }

  processDefault() {
    if (this.node.answers && this.node.answers[0]) {
      this.selectNextNode(this.node.answers[0].play);
      return true;
    } else {
      return false;
    }
  }

  selectNextNode(node: Video) {
    this.nextNode = node;
  }

}
