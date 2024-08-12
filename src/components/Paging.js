import React, { useState } from "react";
import Pagination from "react-js-pagination";

const Paging = ({page, count, pageSize, setPage}) => {

  return (
    <Pagination
      innerClass="flex gap-4"
      activePage={page} // 현재 페이지
      itemsCountPerPage={pageSize ?? 10} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={count} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      activeLinkClass="text-black"
      itemClass="text-[#7B7B7B] font-semibold"
      onChange={setPage} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging