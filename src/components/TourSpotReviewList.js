import React, { useState, useEffect } from 'react';
import { fetchTourSpotReviewList } from '../utils/api';
import Spinner from '../components/Spinner';
import StarRating from './StarRating';
import Paging from './Paging';

export default function TourSpotReviewList({ tourSpotId, setReviewStat, reloadTrigger }) {

  const [reviewPage, setReviewPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async() => {
      try {
        const data = await fetchTourSpotReviewList(tourSpotId, {
          pageNumber, 
          pageSize
        });
        const { page, totalRatingSum, totalReviewCount } = data;

        setReviewPage(page);
        setTotalItemsCount(page.totalElements);

        setReviewStat({
          averageRating: (totalRatingSum / totalReviewCount) || 0,
          count: totalReviewCount
        });

      } catch (err) {
        setError(err);
      }
    };

    getReviews();
  }, [tourSpotId, setReviewStat, pageNumber, pageSize, reloadTrigger]);

  if (!reviewPage) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return totalItemsCount > 0 ? (
    <div>
      <div className="flex flex-col gap-3">
        {reviewPage.content.map(review => (
          <div key={review.id} className="flex gap-8 bg-[#fff9f9] p-4 lg:p-6 items-start relative">
            <div className="flex gap-2 items-center">
              <div>
                <img src={review.writer.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
              </div>
              <div className="font-semibold text-sm">{review.writer.nickname}</div>
            </div>
            <div className="flex flex-col gap-2">
              <StarRating rating={review.rating} isDisabled={true} size="sm" />
              <div className="whitespace-pre-wrap">{review.text}</div>
            </div>
            <div className="absolute text-xs text-gray-500 right-3 bottom-3">{new Date(review.updatedAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <Paging page={pageNumber} count={totalItemsCount} pageSize={pageSize} setPage={setPageNumber} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center text-gray-600">작성된 리뷰가 없어요</div>
  );
}