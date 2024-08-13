import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import SimpleBar from 'simplebar-react';


export default function ImageGallery({ images, defaultImageUrl }) {
  const thumbnailSimpleBarRef = useRef();
  const activeThumbnailRef = useRef();

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeImageIdx]);

  const handleImagePrevClick = () => {
    setActiveImageIdx(idx => idx === 0 ? images.length - 1 : idx - 1);
  };

  const handleImageNextClick = () => {
    setActiveImageIdx(idx => (idx + 1) % images.length);
  };

  const handleThumbnailLoad = () => {
    thumbnailSimpleBarRef?.current?.recalculate();
  };

  const handleThumbnailClick = (index) => {
    setActiveImageIdx(index);
  };

  return (
    <div>

      {/** 원본 이미지 보기 */}
      <div className='relative'>
        <img 
          src={images[activeImageIdx].url || defaultImageUrl} 
          alt={images[activeImageIdx].name} 
          className="w-full h-auto rounded-lg shadow-md max-h-[500px] object-cover" 
        />
        {images.length > 1 ? (
          <>
            <button 
              className="absolute z-10 flex items-center justify-center w-16 md:w-20 h-full left-0 top-0 opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-25 active:bg-opacity-50"
              onClick={handleImagePrevClick}
            >
              <div className="h-8 md:h-12 text-gray-700">
                <IoIosArrowBack className="w-full h-full" />
              </div>
            </button>
            <button 
              className="absolute z-10 flex items-center justify-center w-16 md:w-20 h-full right-0 top-0 opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-25 active:bg-opacity-50"
              onClick={handleImageNextClick}
            >
              <div className="h-8 md:h-12 text-gray-700">
                <IoIosArrowForward className="w-full h-full" />
              </div>
            </button>
          </>
        ) : null}
      </div>

      {/** 썸네일 목록 */}
      {images.length > 1 ? ( 
        <div className="">
          <SimpleBar ref={thumbnailSimpleBarRef} >
            <div className="flex py-3 justify-center">
              <div className="flex h-12 md:h-16 gap-1">
                {images.map((image, i) => (
                  <img 
                    src={image.thumbnailUrl || defaultImageUrl} 
                    alt={image.name} 
                    className={`rounded-sm object-cover cursor-pointer border-2 transition-colors active:border-purple-500 
                      ${activeImageIdx === i ? "border-purple-500" : "border-transparent hover:border-purple-400"}`}
                    key={i}
                    ref={activeImageIdx === i ? activeThumbnailRef : null}
                    onLoad={handleThumbnailLoad}
                    onClick={() => handleThumbnailClick(i)}
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </SimpleBar>
        </div>
      ) : null}

    </div>
  );
}