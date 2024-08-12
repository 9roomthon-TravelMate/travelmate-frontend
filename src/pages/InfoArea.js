import React, { useState, useEffect } from 'react';
import defaultImage from'../assets/images/default_image.jpg';
import Paging from '../components/Paging';
import StarRating from "../components/Star";
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRegions, fetchDistricts, fetchThemes, fetchTourismInfo } from "../utils/api";


function InfoArea() {
  const location = useLocation();
  //const areaInfo = {...location.state};
  const { area } = location.state || {};
  const navigate = useNavigate();
  const [areaCodes, setAreaCodes] = useState([]);
  const [areaButton, setAreaButton] = useState(area ? area.id : "");
  const [cityCodes, setcityCodes] = useState([]);
  const [cityButton, setCityButton] = useState("");
  const [themeCodes, setThemeCodes] = useState([]);
  const [themeButton, setThemeButton] = useState("");
  const [tourismInfo, setTourismInfo] = useState([]);
  const [currentPage,setCurrentPage] = useState(1); //현재 페이지
  const [count, setCount] = useState(10); // 총 아이템 갯수
  const [error, setError] = useState(null);
  const [starScore, setStarScore] = useState(null);
  

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

  useEffect(() => {
    if (areaButton) {
      const getDistricts = async () => {
        try {
          const data = await fetchDistricts(areaButton);
          setcityCodes(data);
        } catch (err) {
          setError(err);
        }
      };
  
      getDistricts();
    }
  }, [areaButton]);

  useEffect(() => {
    const getThemes = async () => {
      try {
        const data = await fetchThemes();
        setThemeCodes(data);
      } catch (err) {
        setError(err);
      }
    };
    getThemes();
  }, []);

  useEffect(() => {
    const getTourismInfo = async () => {
      try {
        const data = await fetchTourismInfo({
          regionId:areaButton,
          districtId:cityButton,
          themeId:themeButton,
          pageNumber:currentPage,
          pageSize:10});

        setTourismInfo(data.content);
        setCount(data.totalElements);

        
        
      } catch (err) {
        setError(err);
      }
    };
    getTourismInfo();
  }, [areaButton, cityButton, themeButton, currentPage]);

  const handleButtonClick = (code) => {
    setAreaButton(code);
    setCityButton("");
    const selectedArea = areaCodes.find(a => a.id === code);
    navigate('.', { state: { area: selectedArea } });
    
  };

  //전체 지역 버튼 클릭
  const handleAllButtonClick = (code) => {
    setAreaButton(code);
    setCityButton(code);
    const selectedArea = areaCodes.find(a => a.id === code);
    navigate('.', { state: { area: selectedArea } });
    
  };

  const handleCityButtonClick = (code) => {
    setCityButton(code);
    
    
  };

  const handleThemeButtonClick = (code) => {
    setThemeButton(code);
    
    
  };

  const handlePlaceButtonClick = (info) => {
    navigate('/InfoPlace', { state : {info} });
  };

  const setPage = (error) => {
    setCurrentPage(error);
  };


  return (
    <div className="pt-24 pb-24" style={{ backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
      <div className="font-bold text-2xl m-20 mb-2 mt-7">
        #{area ? area.name : '전체'}
      </div>
      {/*좌: 여행 필터 선택 */}
      <div className="flex  h-screen">
        <div className="w-1/3 flex flex-col  ">
          <div className="font-bold text-base ml-20 mt-5">
            검색을 원하는 필터를 검색해보세요
          </div>
          <div className=" bg-white text-sm  rounded-xl ml-20 mt-5 w-2/3">
            <div className="m-3">
            {/* 지역 버튼  */}
            <button  onClick={() => handleAllButtonClick("")} className="p-1 mt-1.5 mb-1.5 ml-2 mr-2 font-semibold" style={{ color: areaButton === "" ? 'black' : '#7B7B7B' }}>
                  #전체
            </button>
            {areaCodes.map((area) => (
              <button key={area.id} onClick={() => handleButtonClick(area.id)} className="p-1 mt-1.5 mb-1.5 ml-2 mr-2 font-semibold" style={{ color: areaButton === area.id ? 'black' : '#7B7B7B' }}>
                #{area.name}
              </button>
            ))}

            <div className="ml-4 mr-4 mb-2 mt-2 border-b border-black"></div>
            {/* 시군구 버튼 */}
            {/* areaButton이 ""이 아닐떄만 나타나도록 허용 */}
            {areaButton !== "" ? (
              <>

              <button onClick={() => handleCityButtonClick("")} className="ml-3 mr-3 mt-2 mb-2 font-semibold" style={{ color: cityButton === "" ? 'black' : '#7B7B7B' }}>
              #전체
              </button>

              {cityCodes.map((city) => (
              <button key={city.districtId} onClick={() => handleCityButtonClick(city.districtId)} className="ml-3 mr-3 mt-2 mb-2 font-semibold" style={{ color: cityButton === city.districtId ? 'black' : '#7B7B7B' }}>
              #{city.name}
              </button>
                  ))}
        
              <div className="ml-4 mr-4 mb-2 mt-2 border-b border-black"></div>

              </>

            ) : null}
              {/* 필터 버튼 */}
              <button  onClick={() => handleThemeButtonClick("")} className="ml-3 mr-3 mt-2 mb-2" style={{color: themeButton === "" ? 'black' : '#7B7B7B'  }}>
                  #전체
                </button>
              
              <div className="font-medium text-sm" style={{ color: '#7B7B7B' }}>
                {themeCodes.map((theme) => (
                <button key={theme.id} onClick={() => handleThemeButtonClick(theme.id)} className="ml-3 mr-3 mt-2 mb-2" style={{ color: themeButton === theme.id ? 'black' : '#7B7B7B' }}>
                  #{theme.title}
                </button>
                ))}
                
              </div>
            </div>
          </div>
        </div>

        {/* 우:장소 선택 */}
        <div className="w-2/3 mt-6 ml-28 flex items-start flex-col">
        <div className="text-base font-semibold flex">
        총&nbsp;<div style={{ color:'#4592BD' }}>{count}</div>건
        </div>

        <div > 
        {tourismInfo ? (
        <div className="text-black text-sm flex flex-wrap mt-10">
          {tourismInfo.map((info) => (
            <button key={info.id} onClick={() => handlePlaceButtonClick(info.id)} className="flex items-center p-2 border m-2" style={{ flex: "1 1 35%", maxWidth: "35%" }}>
              <img 
                src={info.mainImageUrl || defaultImage} 
                alt={info.name} 
                className="w-36 h-24 object-cover mr-4" 
              />
              <div className="text-start">
                <h2 className="text-sm font-semibold pb-1">{info.name}</h2>
                <p className="text-xs pb-1">{info.address}</p>
                <div>
                  <StarRating ratingSum={info.ratingSum} reviewCount={info.reviewCount}/>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-white text-2xl">
          No tourism information found.
        </div>
      )}
      <div className="flex justify-center mr-72">
        <Paging page={currentPage} count={count} setPage={setPage} />
        
      </div>
      </div>




      </div>
      </div>
    </div> 

  )
}

export default InfoArea