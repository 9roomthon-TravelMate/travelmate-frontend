import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import defaultImage from'../assets/images/default_image.jpg';
import { fetchTourPlace } from "../utils/api";
import TourSpotReviewList from '../components/TourSpotReviewList';
import Spinner from '../components/Spinner';
import StarRating from '../components/StarRating';
import TourSpotReviewForm from '../components/TourSpotReviewForm';
import { useKakaoLoader, Map, MapMarker } from 'react-kakao-maps-sdk';
import ImageGallery from '../components/ImageGallery';

const KAKAO_API_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_API_JAVASCRIPT_KEY;

function InfoPlace() {
  const { id: placeId } = useParams();
  //const areaInfo = {...location.state};
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [reviewsReloadTrigger, setReviewsReloadTrigger] = useState(false);
  const [reviewStat, setReviewStat] = useState(null);
  const [images, setImages] = useState([]);
  const [isMapLoading] = useKakaoLoader({ appkey: KAKAO_API_JAVASCRIPT_KEY });

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await fetchTourPlace(placeId);
        setPlace(data);

        setImages([
          { 
            url: data.mainImageUrl, 
            thumbnailUrl: data.mainThumbnailUrl,
            name: data.name
          },
          ...data.images
        ]);

      } catch (err) {
        setError(err);
      }
    };
    getPlaces();
  }, [placeId]);
  
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
    <div className="pt-24 pb-24" style={{ backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-screen-md bg-white rounded-lg shadow-lg p-6 overflow-hidden">
          {place ? (
            <>
              {/* 여행지 정보가 들어갈 부분 */}
              <div className="font-bold text-3xl text-center text-gray-800 mt-2">{place.name}</div>
              {/* <div className="text-center text-gray-600">{place.address}</div> */}
              <div className="border-b border-gray-300 mt-7 mb-4"></div>
              <div className="font-bold text-lg text-gray-800 mb-2">장소 소개</div>
              <ImageGallery images={images} defaultImageUrl={defaultImage} />

              <div className="text-gray-700 text-base mt-4 mb-6">
                {place.overview}
              </div>

              <div className="border-b border-gray-300 mb-4"></div>
              <div className="font-bold text-lg text-gray-800 mb-2">주소</div>
              <div className="text-gray-700 text-base mb-2">{place.address}</div>
              <div className="h-[200px] md:h-[250px] mx-auto mb-6">
                <Map
                  center={{
                    lat: place.latitude,
                    lng: place.longitude
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  level={3} 
                >
                  <MapMarker 
                    position={{
                      lat: place.latitude,
                      lng: place.longitude
                    }}
                  />
                </Map>
              </div>

              {/* 평점 및 리뷰 */}
              <div className="border-b border-gray-300 mb-4"></div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg text-gray-800 mb-2">평점 및 리뷰 ({reviewStat?.count ?? 0})</div>
                  <div className="flex gap-2 mb-3 items-center">
                    <div className="font-bold text-xl">
                      {reviewStat?.averageRating ? reviewStat.averageRating.toFixed(1) : "0.0"}
                    </div>
                    <StarRating rating={reviewStat?.averageRating ?? 0} isDisabled={true} />
                  </div>
                </div>
              </div>
              
              <TourSpotReviewList 
                tourSpotId={placeId} 
                reviewStat={reviewStat} 
                setReviewStat={setReviewStat} 
                reloadTrigger={reviewsReloadTrigger} 
              />

              <div className="border-b mt-6 mb-4 border-gray-300"></div>
              <div className="font-bold text-lg text-gray-800 mb-2">내 리뷰</div>
              <TourSpotReviewForm tourSpotId={placeId} onSubmitSuccess={handleReviewSubmitSuccess} />
              
            </>
          ) : (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoPlace