import React from 'react';
import cssModule from './index.module.scss';

/**
 * 全局Loading
 */
const Loading: React.FC = function () {
  return (
    <div className={cssModule.LoadingWrap}>
      <div className={cssModule.LoadingSvg}>
        <svg
          id="yds-LoadingLogoSvg"
          viewBox="-11,-5 100,100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <clipPath
            id="yds-LoadingLogoSvg-clipUpper"
            clipPathUnits="userSpaceOnUse"
          >
            <path
              d="M40 40 L73.465,21.535 a1.4,1.4 0 0 0 2 0 l5,-5   a1.4,1.4 0 0 0 0 -2 l-50,-50 L-5,-5 L-5,100 L-5,50.3 a0.707,0.707 0 0 0 1.207,0.5 l7.8,-7.8 a3,3 0 0 0 1,-2.4 Z"
              id="yds-LoadingLogoSvg-clipUpperPath"
            ></path>
          </clipPath>
          <clipPath
            id="yds-LoadingLogoSvg-clipLower"
            clipPathUnits="userSpaceOnUse"
          >
            <path
              d="M40 40 L4.635,52.465 a1.5,1.5 0 0 0 -2.1 0 l-5,5  a1.5,1.5 0 0 0 0 2 L0,100 83,100 83,0 L83,23.2 a0.707,0.707 0 0 0 -1.207,-0.5 l-7.8,7.8 a3,3 0 0 0 -1,2.4 Z"
              id="yds-LoadingLogoSvg-clipLowerPath"
            ></path>
          </clipPath>
          <defs>
            <path
              id="yds-LoadingLogoSvg-upper"
              d="M-9,49 l9,-9 L0,19 L19,0 L59,0 L78,19"
              strokeWidth="10"
              fill="none"
              clipPath="url(#yds-LoadingLogoSvg-clipUpper)"
            ></path>
            <path
              id="yds-LoadingLogoSvg-lower"
              d="M87,24.5 l-9,9 L78,55 L39,90.5 L0,55"
              strokeWidth="10"
              fill="none"
              clipPath="url(#yds-LoadingLogoSvg-clipLower)"
            ></path>
          </defs>
          <g>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase1"
              href="#yds-LoadingLogoSvg-upper"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase2"
              href="#yds-LoadingLogoSvg-upper"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase3"
              href="#yds-LoadingLogoSvg-upper"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase4"
              href="#yds-LoadingLogoSvg-upper"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase5"
              href="#yds-LoadingLogoSvg-upper"
            ></use>
          </g>
          <g>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase1"
              href="#yds-LoadingLogoSvg-lower"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase2"
              href="#yds-LoadingLogoSvg-lower"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase3"
              href="#yds-LoadingLogoSvg-lower"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase4"
              href="#yds-LoadingLogoSvg-lower"
            ></use>
            <use
              className="yds-LoadingLogoSvg-path yds-LoadingLogoSvg-phase5"
              href="#yds-LoadingLogoSvg-lower"
            ></use>
          </g>
          <g>
            <path
              id="yds-LoadingLogoSvg-center"
              d="M34,32 l10,-10 l0,20 l-10,10 Z"
              strokeWidth="2.5"
              stroke="#64ABB4"
              fill="#64ABB4"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
