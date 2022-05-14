import React, { useState } from 'react';

import './App.css';
import Sidebar from './components/Sidebar';
import ImagePanel from './components/ImagePanel';
import StyleTransferPanel from './components/StyleTransferPanel';

function App() {
  const [originalImage, setOriginalImage] = useState('');
  const [filteredImage, setFilteredImage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Original');
  const [filterLoading, setFilterLoading] = useState(false);

  return (
    <div className="App" class='flex flex-row'>
      <div class='lg:w-2/12 md:w-3/12'>
        <Sidebar
          originalImage={originalImage}
          setFilteredImage={(filteredImage) => setFilteredImage(filteredImage)}
          selectedFilter={selectedFilter}
          setSelectedFilter={(filter) => setSelectedFilter(filter)}
          setFilterLoading={(loading) => setFilterLoading(loading)}
        />
      </div>

      <div class='flex flex-row lg:w-10/12 md:9/12'>
        {selectedFilter === 'Style Transfer' ? (
          <StyleTransferPanel
            originalImage={originalImage}
            setOriginalImage={(originalImage) => setOriginalImage(originalImage)}
            setFilteredImage={(filteredImage) => setFilteredImage(filteredImage)}
            filteredImage={filteredImage}
            setSelectedFilter={() => setSelectedFilter('Original')}
            filterLoading={filterLoading}
          />
        ) : (
          <ImagePanel
            originalImage={originalImage}
            setOriginalImage={(originalImage) => setOriginalImage(originalImage)}
            setFilteredImage={(filteredImage) => setFilteredImage(filteredImage)}
            filteredImage={filteredImage}
            setSelectedFilter={() => setSelectedFilter('Original')}
            filterLoading={filterLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
