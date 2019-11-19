import React, { useRef } from 'react';

import AppState from 'context/appState';

import Meme from 'components/meme/Meme';
import MemeControls from 'components/memeControls/MemeControls';
import Alert from 'components/alert/Alert';

const App = () => {
  const memeNode = useRef(null);
  return (
    <AppState>
      <main className="main-container">
        <Meme ref={memeNode} />
        <MemeControls ref={memeNode} />
        <Alert />
      </main>
    </AppState>
  );
};

export default App;
