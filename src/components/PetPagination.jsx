"use client";

import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PetPagination = ({ totalPages }) => {
  return (
    <div className="mt-12 pb-16 font-mono font-bold flex justify-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdKeyboardArrowRight />}
        previousLabel={<MdKeyboardArrowLeft />}
        pageCount={totalPages || 5}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={(e) => console.log("Selected Page:", e.selected + 1)}
        containerClassName="flex justify-center items-center gap-2"
        pageLinkClassName="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#2B1A0E] text-xl transition hover:bg-[#FAF8F5]"
        activeLinkClassName="!bg-[#2B1A0E] !text-[#FDF6F2] shadow-[4px_4px_0px_#7B1F1F]"
        previousLinkClassName="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#2B1A0E] text-3xl hover:bg-[#FAF8F5] transition"
        nextLinkClassName="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#2B1A0E] text-3xl hover:bg-[#FAF8F5] transition"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default PetPagination;
