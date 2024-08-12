import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarSection = styled.div`
    display: flex;
    .star {
        color: #FFD700; /* 진한 노란색 */
        font-size: 15x;
    }
    .star-empty {
        color: #e0e0e0; /* 회색 */
    }
`;

const Star = ({ ratingSum, reviewCount, totalStars = 5 }) => {
    // 평균 점수를 계산하고 반올림하여 정수로 변환
    const averageRating = Math.round(ratingSum / reviewCount);

    return (
        <StarSection>
            {[...Array(totalStars)].map((_, index) => {
                if (index < averageRating) {
                    return <FaStar key={index} className="star" />;
                }
                return <FaRegStar key={index} className="star-empty" />;
            })}
        </StarSection>
    );
}

export default Star;