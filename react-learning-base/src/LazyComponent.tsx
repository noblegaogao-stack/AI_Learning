import React from 'react';

// 懒加载组件
const LazyComponent: React.FC = () => {
  return (
    <div>
      <h4>Lazy Loaded Component</h4>
      <p>This component was loaded lazily using React.lazy() and Suspense.</p>
      <p>It's only loaded when the user clicks the "Load Lazy Component" button.</p>
    </div>
  );
};

export default LazyComponent;