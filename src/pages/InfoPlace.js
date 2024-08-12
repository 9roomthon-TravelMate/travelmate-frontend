import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultImage from'../assets/images/default_image.jpg';
import { fetchTourPlace } from "../utils/api";
import TourSpotReviewList from '../components/TourSpotReviewList';
import Spinner from '../components/Spinner';
import StarRating from '../components/StarRating';
import TourSpotReviewForm from '../components/TourSpotReviewForm';

function InfoPlace() {
  const location = useLocation();
  //const areaInfo = {...location.state};
  const { info } = location.state || {};
  console.log('info',info);
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [reviewsReloadTrigger, setReviewsReloadTrigger] = useState(false);
  const [reviewStat, setReviewStat] = useState(null);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await fetchTourPlace(info);
        setPlace(data);
        console.log('data', data);
      } catch (err) {
        setError(err);
      }
    };
    getPlaces();
  }, [info]);

  // reviewStat이 아직 초기화되지 않은 경우에 초기화
  useEffect(() => {
    if (!place || reviewStat) return;
    
    const { ratingSum, reviewCount } = place;
    setReviewStat({
      averageRating: (ratingSum / reviewCount) || 0,
      count: reviewCount + 1
    });
  }, [place, reviewStat]);

  const handleReviewSubmitSuccess = () => {
    setReviewsReloadTrigger(trigger => !trigger);
  };
  
  return (
    <div>

      {/* 여행 지역 선택 */}
      
      <div className="pt-24 pb-24" style={{ backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="w-full md:w-8/12 lg:w-7/12">
            {place ? (
              <>
                {/* 여행지 정보가 들어갈 부분 */}
                <div className="font-bold text-2xl pt-6 pb-3 text-center">{place.name}</div>
                {/* 코드말고 이름으로 나중에 수정 */}
                <div className="text-center">{place.address}</div>
                <div className="border-b border-black pt-3"></div>
                <div className="font-bold text-base m-3">장소 소개</div>
                <img 
                  src={place.mainImageUrl || defaultImage} 
                  alt={place.name} 
                  className="w-9/10 h-auto mx-auto max-h-[500px]"  
                />
                <div className="m-3 text-base">
                  {place.overview}
                </div>

                <div className="border-b border-black"></div>
                <div className="font-bold text-base m-3">주소</div>
                <div className="text-base m-3">{place.address}</div>

                <div className="border-b border-black"></div>
                <div className="font-bold text-base m-3 mb-2">평점 및 리뷰 ({reviewStat?.count ?? 0})</div>
                <div className="flex gap-2 mx-3 mb-3 items-center">
                  <div className="font-bold text-lg">
                    {reviewStat?.averageRating ? reviewStat.averageRating.toFixed(1) : "0.0"}
                  </div>
                  <StarRating rating={reviewStat?.averageRating ?? 0} isDisabled={true} />
                </div>

                <TourSpotReviewList 
                  tourSpotId={info} 
                  reviewStat={reviewStat} 
                  setReviewStat={setReviewStat} 
                  reloadTrigger={reviewsReloadTrigger} 
                />

                <div className="border-b my-4 border-black"></div>
                <TourSpotReviewForm tourSpotId={info} onSubmitSuccess={handleReviewSubmitSuccess} />
              </>
            ) : (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default InfoPlace