import React from 'react';
import HelloWorld from './components/HelloWorld';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <HelloWorld />
    </div>
  );
};

export default App;