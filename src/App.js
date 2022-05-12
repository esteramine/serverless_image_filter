import React, { useState } from 'react';

import './App.css';
import Sidebar from './components/Sidebar';
import ImagePanel from './components/ImagePanel';
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return (
    <div className="App" class='flex flex-row'>
      <div class='w-2/12'>
        <Sidebar />
      </div>

      <div class='flex flex-row w-10/12'>
        <ImagePanel/>
      </div>
    </div>
  );
}

export default App;
