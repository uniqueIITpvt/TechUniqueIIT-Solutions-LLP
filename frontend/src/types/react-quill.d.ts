declare module 'react-quill' {
  import React from 'react';
  
  export interface ReactQuillProps {
    value: string;
    onChange: (value: string) => void;
    theme?: string;
    modules?: any;
    formats?: string[];
    className?: string;
    [key: string]: any;
  }

  const ReactQuill: React.ForwardRefExoticComponent<ReactQuillProps>;
  export default ReactQuill;
} 