import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import navigationIcon from '../assets/images/navigation 1.svg';
import { fetchRegions } from "../utils/api";


function InfoMain() {
  const [areaCodes, setAreaCodes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


    
    useEffect(() => {
      const getRegions = async () => {
        try {
          const data = await fetchRegions();

          const processedData = data.map(region => {
            let processedName = region.name;
            if (region.name === "세종특별자치시") {
              processedName = "세종";
            } else if (region.name === "경기도") {
              processedName = "경기";
            } else if (region.name === "강원특별자치도") {
              processedName = "강원";
            } else if (region.name === "충청북도") {
              processedName = "충북";
            } else if (region.name === "충청남도") {
              processedName = "충남";
            } else if (region.name === "경상북도") {
              processedName = "경북";
            } else if (region.name === "경상남도") {
              processedName = "경남";
            } else if (region.name === "전북특별자치도") {
              processedName = "전북";
            } else if (region.name === "전라남도") {
              processedName = "전남";
            } else if (region.name === "제주도") {
              processedName = "제주";
            }
            return {
              ...region,
              name: processedName
            };
          });
          setAreaCodes(processedData);
        } catch (err) {
          setError(err);
        }
      };
  
      getRegions();
    }, []);
    

    const handleAreaClick = (area) => {
      navigate('/InfoArea', { state: { area } });
      console.log('area',area);
    };
    

  
  return (
  <div>

      {/* 여행 지역 선택 */}
      <div className="pt-24 pb-24" style={{ backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
    <h1 className="text-center p-10 font-bold text-2xl">어디로 여행을 떠나시나요?</h1>
    <div className="container mx-auto p-4">
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2         md:grid-cols-4 lg:grid-cols-4 gap-7">
        {areaCodes.map((area) => (
          <button key={area.id} className="border rounded-lg overflow-hidden shadow-md w-44 m-2" onClick={()=>handleAreaClick(area)}>
            <img src={'https://cdn.pixabay.com/photo/2022/06/24/05/35/ocean-7281047_1280.jpg'} alt={area.name} className="w-full h-44 object-cover" />
            <div className="pt-2 pl-2 pb-1 text-left font-semibold" style={{ color: '#5E6282' }}>
              {area.name}
            </div>
            <div className="pl-1.5 mb-2 flex">
              <img className="pt-1 mr-0.5 w-4 h-4" src={navigationIcon} alt={navigationIcon} />
              <div className="font-normal text-[0.7rem] pb-1" style={{ color: '#5E6282' }}>
                {area.englishName}
              </div>
            </div>
          </button>
        ))}
        </div>
      </div>
    </div>
    </div>

    
  </div>


  
    
  );
}

export default InfoMain;