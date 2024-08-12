import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SummaryPage() {
  const location = useLocation();
  const { places } = location.state || { places: [] }; // 전달된 데이터가 없을 경우 빈 배열 사용

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-8'>추천 장소</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {places.map((place, index) => (
          <li key={index} className='border p-4 rounded-lg shadow-sm'>
            <img
              src={place.mainThumbnailUrl || 'placeholder-image-url.jpg'}
              alt={place.name}
              className='w-full h-48 object-cover mb-4 rounded-lg'
            />
            <h2 className='text-lg font-bold mb-2'>{place.name}</h2>
            <p className='text-gray-600'>{place.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}