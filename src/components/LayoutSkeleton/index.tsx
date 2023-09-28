import { Skeleton } from 'antd';
import React, { useState } from 'react';
import cssModule from './index.module.scss';

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round' | 'default';

/**
 * 全局骨架图
 */
const LayoutSkeleton: React.FC = function () {
  const [active] = useState(true);
  const [block] = useState(true);
  const [size] = useState<SizeType>('large');
  const [buttonShape] = useState<ButtonShapeType>('default');

  return (
    <div className={cssModule.LayoutSkeletonWrap}>
      <div className={cssModule.SkeletonHeader}>
        <Skeleton.Button
          active={active}
          size={size}
          shape={buttonShape}
          block={block}
        />
      </div>
      <div className={cssModule.SkeletonMain}>
        <Skeleton.Button
          active={active}
          size={size}
          shape={buttonShape}
          block={block}
        />
      </div>
    </div>
  );
};

export default LayoutSkeleton;
