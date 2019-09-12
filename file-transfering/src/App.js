import React from 'react';
import { Chat } from './components/chat';
import './App.css';
import { ViewSource } from './components/viewSource';

export function App() {
  return (
    <div className="App">
      <Chat />
      <ViewSource repoLink="https://github.com/afrokick/peerjs-examples/tree/master/file-transfering" />
    </div>
  );
}
