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
  const [filters, setFilters] = useState({ 'Original': false, 'Sharpen': false, 'Blur': false, 'Pencil Sketch': false, 'Sepia': false, 'Invert': false });
  const [styles, setStyles] = useState({'Candy': false, 'Composition': false, 'Feathers': false, 'La Muse': false, 'Mosaic': false, 'Starry Night': false, 'The Scream': false, 'The Wave': false, 'Undue': false});

  return (
    <div className="App" class='flex flex-row'>
      <div class='lg:w-2/12 w-3/12 '>
        <Sidebar
          filters={filters}
          setFilters={(filter) => setFilters(filter)} // set filter status
          styles={styles}
          setStyles={(style)=>setStyles(style)}
          originalImage={originalImage}
          setFilteredImage={(filteredImage) => setFilteredImage(filteredImage)}
          selectedFilter={selectedFilter}
          setSelectedFilter={(filter) => setSelectedFilter(filter)}
          setFilterLoading={(loading) => setFilterLoading(loading)}
        />
      </div>

      <div class='flex flex-row lg:w-10/12 w-9/12'>
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
