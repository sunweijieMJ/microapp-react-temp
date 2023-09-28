import classnames from 'classnames';
import _ from 'lodash';
import React, { memo, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player.d';
import 'video.js/dist/video-js.min.css';
import 'video.js/dist/lang/zh-CN.json';
import 'video.js/dist/lang/en.json';
import cssModule from './index.module.scss';
import { DEFAULT_LOCALE } from '@/utils/contant/global';

/**
 * @property className 类名
 * @property sourceSrc 视频地址
 * @property sourceType 视频格式
 * @property poster 视频封面
 * @property width 视频容器的宽度
 * @property height 视频容器的高度
 * @property autoplay 是否自动播放
 * @property controls 是否显示控制条
 * @property preload 是否预加载
 * @property loop 是否循环播放
 * @property muted 是否静音播放
 * @property fluid 视频响应式适应其容器大小
 * @property aspectRatio 视频的宽高比
 * @property language 默认语言
 * @property playbackRates 视频播放的速率选项
 */
interface IProps {
  className?: string;
  sourceSrc: string;
  sourceType?: ISourceType;
  poster?: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  controls?: boolean;
  preload?: IPreload;
  loop?: boolean;
  muted?: boolean;
  fluid?: boolean;
  aspectRatio?: string;
  language?: ILanguage;
  playbackRates?: number[];
}

/**
 * 预加载模式
 */
type IPreload = 'auto' | 'metadata' | 'none';

/**
 * 语言模式
 */
type ILanguage = 'zh-CN' | 'en';

/**
 * 视频格式
 */
type ISourceType =
  | 'application/x-mpegURL'
  | 'application/dash+xml'
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'
  | 'video/avi'
  | 'video/x-flv'
  | 'video/x-matroska';

/**
 * video配置项
 */
type IVideoProps = Omit<IProps, 'className' | 'sourceType' | 'sourceSrc'> & {
  sources: {
    src: string;
    type?: string;
  }[];
};

/**
 * videoJs播放器
 */
const VideoPlayer: React.FC<IProps> = (props) => {
  const { className, ...rest } = props;
  const videoNodeRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // 设置代理地址
  const getProxyVideoUrl = (url: string) => {
    return `${url}`;
  };

  // 获取video第一帧
  const getVideoBase64 = (url: string) => {
    return new Promise<string>((resolve) => {
      let dataURL = '';
      const video = document.createElement('video');
      video.currentTime = 1; // 第一帧
      video.setAttribute('crossOrigin', 'anonymous'); // 处理跨域
      video.setAttribute('src', url);
      video.addEventListener('loadeddata', function () {
        const canvas = document.createElement('canvas');
        const width = this.videoWidth;
        const height = this.videoHeight;
        canvas.width = width;
        canvas.height = height;
        canvas?.getContext('2d')?.drawImage(video, 0, 0, width, height);
        dataURL = canvas.toDataURL('image/jpeg');
        resolve(dataURL);
      });
    });
  };

  // video实例化
  const createInstance = (videoNode: HTMLElement, options: IVideoProps) => {
    playerRef.current = videojs(videoNode, options);
    playerRef.current.ready(function () {
      console.log('ready');
    });
  };

  // 获取video参数
  const getOptions = (rest: IProps, videoFrame?: string): IVideoProps => {
    return {
      poster: videoFrame,
      sources: [
        {
          src: getProxyVideoUrl(rest.sourceSrc),
          type: rest.sourceType,
        },
      ],
      ..._.omit(rest, ['sourceSrc', 'sourceType']),
    };
  };

  // 初始化容器
  const init = (options: IVideoProps) => {
    const videoContainer = videoNodeRef.current;
    if (!videoContainer) {
      return;
    }
    const videoBox = videoContainer.querySelectorAll('.videowrap');
    for (let i = 0, LEN = videoBox.length; i < LEN; i++) {
      if (!videoBox[i]) break;
      videoBox[i].innerHTML = '';
      const myVideo = document.createElement('video');
      const videoId = `video-${uuidv4()}`;
      myVideo.setAttribute('id', videoId);
      myVideo.setAttribute('class', 'video-js');
      videoBox[i].appendChild(myVideo);
      // video初始化
      createInstance(myVideo, options);
    }
  };

  useEffect(() => {
    if (rest.sourceType === 'video/mp4' && !rest.poster) {
      getVideoBase64(rest.sourceSrc).then((res) => {
        const videoFrame = res;
        const options = getOptions(rest, videoFrame);
        init(options);
      });
    } else {
      const options = getOptions(rest);
      init(options);
    }

    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={videoNodeRef}
      className={classnames(className, cssModule.container)}
    >
      <div className="videowrap"></div>
    </div>
  );
};

VideoPlayer.defaultProps = {
  controls: true,
  sourceType: 'application/x-mpegURL',
  language: DEFAULT_LOCALE,
};

export default memo(VideoPlayer);
