import React, { useState } from 'react';

import './App.css';
import Sidebar from './components/Sidebar';
import ImagePanel from './components/ImagePanel';

function App() {
  const [originalImage, setOriginalImage] = useState('');
  const [filteredImage, setFilteredImage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Original');
  const [filterLoading, setFilterLoading] = useState(false);

  return (
      <div className="App" class='flex flex-row'>
        <div class='w-2/12'>
          <Sidebar
            originalImage={originalImage}
            setFilteredImage={(filteredImage) => setFilteredImage(filteredImage)}
            selectedFilter={selectedFilter}
            setSelectedFilter={(filter)=> setSelectedFilter(filter)}
            setFilterLoading={(loading)=> setFilterLoading(loading)}
          />
        </div>

        <div class='flex flex-row w-10/12'>
          <ImagePanel
            setOriginalImage={(originalImage) => setOriginalImage(originalImage)}
            setFilteredImage={(filteredImage) => setFilteredImage(filteredImage)}
            filteredImage={filteredImage}
            setSelectedFilter={()=>setSelectedFilter('Original')}
            filterLoading={filterLoading}
          />
        </div>
      </div>
  );
}

export default App;
