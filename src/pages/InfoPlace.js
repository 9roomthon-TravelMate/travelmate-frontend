import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import defaultImage from'../assets/images/default_image.jpg';
import { fetchTourPlace } from "../utils/api";


function InfoPlace() {
  const location = useLocation();
  //const areaInfo = {...location.state};
  const { info } = location.state || {};
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await fetchTourPlace(info);
        setPlace(data);
        
        setLength(data.images.length+1);
      } catch (err) {
        setError(err);
      }
    };
    getPlaces();
  }, [info]);
  
  return (
    <div>
      

      {/* 여행 지역 선택 */}
      
      <div className="pt-24 pb-24" style={{ backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
      <div className="container mx-auto px-4 flex justify-center items-center">
    <div className="w-full md:w-8/12 lg:w-7/12 bg-white rounded-lg shadow-lg p-6">
      {place ? (
        <>
          {/* 여행지 정보가 들어갈 부분 */}
          <div className="font-bold text-3xl text-center text-gray-800 mt-2">{place.name}</div>
          {/* <div className="text-center text-gray-600">{place.address}</div> */}
          <div className="border-b border-gray-300 mt-7 mb-4"></div>
          
          <div className="font-bold text-lg text-gray-800 mb-2">장소 소개</div>
          <img 
            src={place.mainImageUrl || defaultImage} 
            alt={place.name} 
            className="w-full h-auto rounded-lg shadow-md" 
            style={{ maxHeight: '500px', objectFit: 'cover' }} 
          />
          <div className="text-gray-700 text-base mt-4 mb-6">
            {place.overview}
          </div>
          <div className="border-b border-gray-300 mb-4"></div>
          
          <div className="font-bold text-lg text-gray-800 mb-2">주소</div>
          <div className="text-gray-700 text-base mb-6">{place.address}</div>
        </>
      ) : (
        <div className="text-center text-2xl font-bold text-gray-700">Loading...</div>
      )}
    </div>
  </div>
</div>

    </div>
  )
}

export default InfoPlace