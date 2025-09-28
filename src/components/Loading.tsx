import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingComponentProps {
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  className = '',
  text = 'Loading...',
  size = 'md'
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'text-base',
      text: 'text-xs',
      spacing: 'space-x-2'
    },
    md: {
      icon: 'text-xl',
      text: 'text-sm',
      spacing: 'space-x-3'
    },
    lg: {
      icon: 'text-2xl',
      text: 'text-base',
      spacing: 'space-x-4'
    },
    xl: {
      icon: 'text-3xl',
      text: 'text-lg',
      spacing: 'space-x-4'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex justify-center items-center p-5 ${className}`}>
      <div className={`flex items-center ${config.spacing} flex-col gap-5`}>
        <Spin indicator={<LoadingOutlined className={`text-blue-500 ${config.icon}`} spin />} />
        {text && <span className={`text-gray-600 ${config.text}`}>{text}</span>}
      </div>
    </div>
  );
};

export default LoadingComponent;