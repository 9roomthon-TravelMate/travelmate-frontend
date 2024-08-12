import React from "react";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage }) => {
  return (
    <div className="flex mt-4 ">
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지에서 보여줄 아이템 수
        totalItemsCount={count} // 총 아이템 수
        pageRangeDisplayed={5} // 페이지 범위 표시
        prevPageText={"‹"} // 이전 페이지 텍스트
        nextPageText={"›"} // 다음 페이지 텍스트
        onChange={setPage} // 페이지 변경 핸들러
        innerClass="pagination flex space-x-5 " // 버튼 사이의 간격 설정
        
      />
    </div>
  );
};

export default Paging;