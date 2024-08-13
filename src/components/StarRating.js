


const MAX_RATING = 5;
const STAR_BUTTON_COUNT = 5;
const RATING_STEP = MAX_RATING / STAR_BUTTON_COUNT;

const SIZE_CLASSNAMES = {
  'sm': 'w-3.5 h-3.5',
  'md': 'w-5 h-5',
  'lg': 'w-6 h-6',
  'xl': 'w-7 h-7'
};

const StarButton = ({ starNum, fill, setRating, isDisabled, size }) => {
  // fill을 0~1 사이로 제한
  const percentage = Math.min(Math.max(fill, 0), 1) * 100;

  const sizeClassName = SIZE_CLASSNAMES[size] ?? SIZE_CLASSNAMES['md'];

  const handleClick = () => {
    setRating(starNum);
  };

  return (
    <button className={`relative ${sizeClassName}`} disabled={isDisabled} onClick={handleClick}>
      <svg className={`absolute top-0 left-0 w-full h-full ${isDisabled ? "text-gray-300" : "text-gray-200"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>

      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        <svg className={`${sizeClassName} text-yellow-400`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
    </button>
  );
};

export default function StarRating({ rating, setRating, isDisabled, size }) {

  const getFillValue = (starNum) => {
    const localMax = RATING_STEP * starNum;
    const diff = localMax - rating;

    if (diff >= RATING_STEP) {
      return 0;
    } else if (diff <= 0) {
      return 1;
    } else {
      return (RATING_STEP - diff) / RATING_STEP;
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(STAR_BUTTON_COUNT)].map((_, i) => {
        const starNum = i + 1;
        const fill = getFillValue(starNum);
        return (
          <StarButton key={starNum} starNum={starNum} fill={fill} setRating={setRating} isDisabled={isDisabled} size={size} />
        );
      })}
    </div>
  );
}