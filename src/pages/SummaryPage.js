import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveVisitedPlaces } from '../utils/api';
import defaultImage from'../assets/images/default_image.jpg';


export default function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { places } = location.state || { places: [] };
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleSelect = (place) => {
    setSelectedPlaces((prevSelected) => {
      if (
        prevSelected.some((selected) => selected.contentId === place.contentId)
      ) {
        return prevSelected.filter(
          (selected) => selected.contentId !== place.contentId
        );
      } else {
        return [...prevSelected, place];
      }
    });
  };

  const handleSave = async () => {
    const contentIds = selectedPlaces.map((place) => place.contentId);

    try {
      await saveVisitedPlaces(contentIds);
      alert('방문할 장소가 성공적으로 저장되었습니다.');
      setSelectedPlaces([]);
      navigate('/');
    } catch (error) {
      alert('저장 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-8 mt-8'>
        <h1 className='text-lg mb-4 mt-12' style={{ color: '#7E7C7C' }}>
          당신의 취향에 딱 맞는 장소들을 찾았습니다!
        </h1>
        <p className='text-2xl mb-12'>
          방문하고 싶은 장소들을 내 여행에 추가해보세요.
        </p>
      </div>
      <div className='flex justify-between'>
        <div className='flex justify-between'>
          {/* 왼쪽 추천 장소 리스트 */}
          <div className='w-1/2 pr-2'>
            <h2
              className='text-xl font-semibold mb-4'
              style={{ color: '#411A90' }}
            >
              # 추천 장소
            </h2>
            <ul className='grid grid-cols-1 gap-4'>
              {places.map((place, index) => (
                <li
                  key={index}
                  className='border p-4 rounded-lg shadow-sm flex justify-between items-center'
                >
                  <div>
                    <img
                      src={
                        place.mainThumbnailUrl || defaultImage
                      }
                      alt={place.name}
                      className='w-full h-48 object-cover mb-4 rounded-lg'
                    />
                    <h2 className='text-lg font-bold mb-2'>{place.name}</h2>
                    <p className='text-gray-600'>{place.address}</p>
                  </div>
                  <button
                    onClick={() => handleSelect(place)}
                    className={`ml-4 p-2 rounded-full text-white ${
                      selectedPlaces.some(
                        (selected) => selected.contentId === place.contentId
                      )
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: '40px', height: '40px' }}
                  >
                    {selectedPlaces.some(
                      (selected) => selected.contentId === place.contentId
                    )
                      ? '-'
                      : '+'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽 선택된 장소 리스트 */}
          <div className='w-1/2 pl-2'>
            <h2
              className='text-xl font-semibold mb-4'
              style={{ color: '#411A90' }}
            >
              # 내 여행
            </h2>
            <ul className='grid grid-cols-1 gap-4'>
              {selectedPlaces.map((place, index) => (
                <li key={index} className='border p-4 rounded-lg shadow-sm'>
                  <h2 className='text-lg font-bold mb-2'>{place.name}</h2>
                  <p className='text-gray-600'>{place.address}</p>
                </li>
              ))}
            </ul>

            {selectedPlaces.length > 0 && (
              <div className='flex justify-end'>
                <button
                  className='mt-8 bg-gray-200 text-black py-2 px-4 rounded'
                  onClick={handleSave}
                >
                  완료
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
