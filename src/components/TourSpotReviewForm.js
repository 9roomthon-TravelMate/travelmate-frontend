import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import { postTourSpotReview, fetchMyTourSpotReview, updateTourSpotReview, deleteTourSpotReview } from "../utils/api";
import {sleep} from '../utils/sleep';


export default function TourSpotReviewForm({ tourSpotId, onSubmitSuccess }) {
  const [reviewId, setReviewId] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getMyReview = async() => {
      try {
        const data = await fetchMyTourSpotReview(tourSpotId);
        setReviewId(data.id);
        setRating(data.rating);
        setReviewText(data.text);

      } catch (err) {

      }
    };
    getMyReview();
  }, [tourSpotId]);

  const handleClickWrite = async() => {
    if (!rating || reviewId !== null || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const data = await postTourSpotReview(tourSpotId, {
        rating,
        text: reviewText
      });
      setReviewId(data.id);
      
      onSubmitSuccess?.();

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickModify = async() => {
    if (!rating || reviewId === null || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const data = await updateTourSpotReview(reviewId, {
        rating,
        text: reviewText
      });
      setReviewText(data.text);
      
      onSubmitSuccess?.();

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickDelete = async() => {
    if (reviewId === null || isSubmitting) return;
    if (!window.confirm('리뷰를 삭제할까요?')) return;

    setIsSubmitting(true);
    try {
      await deleteTourSpotReview(reviewId);
      setReviewId(null);
      setRating(0);
      setReviewText("");

      onSubmitSuccess?.();
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <StarRating rating={rating} isDisabled={false} setRating={setRating} size="xl" />
        </div>
        <textarea 
          id="message" 
          rows="5" 
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" 
          placeholder="해당 장소에 대한 리뷰를 작성해보세요."
        ></textarea>
      </div>

      <div className="flex gap-2 justify-end">
        {reviewId !== null && (
          <button 
            onClick={handleClickDelete}
            disabled={!rating}
            className="text-white bg-red-700 hover:bg-red-800 disabled:bg-gray-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            삭제
          </button> 
        )}

        {reviewId === null ? (
          <button 
            onClick={handleClickWrite}
            disabled={!rating}
            className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            작성
          </button> 
        ) : (
          <button 
            onClick={handleClickModify}
            disabled={!rating}
            className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            수정
          </button> 
        )}
      </div>
      
    </div>
  );
}