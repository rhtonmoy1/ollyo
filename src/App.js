import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css"; 

const Image = ({ image, index, moveImage, isSelected, toggleSelection }) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedImage) => {
      if (draggedImage.index !== index) {
        moveImage(draggedImage.index, index);
        draggedImage.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`image-container ${isSelected ? "selected" : ""}`}
    >
      <label htmlFor={`checkbox-${index}`} className="image-label">
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          checked={isSelected}
          onChange={() => toggleSelection(index)}
        />
        <div className="checkmark"></div>
        <img src={image} alt={`Image ${index}`} />
      </label>
    </div>
  );
};

const App = () => {
  const initialImages = [
    "/images/image-1.webp",
    "/images/image-2.webp",
    "/images/image-3.webp",
    "/images/image-4.webp",
    "/images/image-5.webp",
    "/images/image-6.webp",
    "/images/image-7.webp",
    "/images/image-8.webp",
    "/images/image-9.webp",
    "/images/image-10.jpeg",
    "/images/image-11.jpeg",
  ];

  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const toggleSelection = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((item) => item !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]); // Clear selectedImages after deletion
  };

  return (
    <div className="gallery-container">
      <div className="header">
        <h1>
          {selectedImages.length > 0
            ? `${selectedImages.length} Files Selected`
            : "Gallery"}
        
        </h1>
        {selectedImages.length > 0 && (
            <button className="delete-button" onClick={deleteSelectedImages}>
              Delete files
            </button>
          )}
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="image-grid">
          {images.map((image, index) => (
            <Image
              key={index}
              image={image}
              index={index}
              moveImage={moveImage}
              isSelected={selectedImages.includes(index)}
              toggleSelection={toggleSelection}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
