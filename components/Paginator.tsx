import { ApiPaginationQuery, pagination } from "@/global";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatorProps {
  // hanndleClickPrev?: <T>(pagination: ApiPaginationQuery) => Promise<T>;
  // hanndleClickNext?: <T>(pagination: ApiPaginationQuery) => Promise<T>;
  // itemsPerPage?: number;
  pagination: pagination;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
}

function Paginator({
  // hanndleClickNext,
  // hanndleClickPrev,
  // itemsPerPage = 20,
  handlePageChange,
  pagination,
  currentPage = 1,
}: PaginatorProps) {
  return (
    <div className='p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50'>
      <div className='text-sm text-slate-500'>
        Showing page {currentPage} of {pagination?.totalPages || 1}
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='p-2 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-brand-teal hover:text-white hover:border-brand-teal disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:cursor-not-allowed transition-all'
          aria-label='Previous Page'
        >
          <ChevronLeft className='w-4 h-4' />
          <span>
            prevvious page{" "}
            {pagination?.previousPage ? pagination.previousPage : ""}
          </span>
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination?.totalPages}
          className='p-2 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-brand-teal hover:text-white hover:border-brand-teal disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:cursor-not-allowed transition-all'
          aria-label='Next Page'
        >
          <span>
            next page{" "}
            {currentPage < pagination.totalPages
              ? currentPage + 1
              : currentPage}
          </span>
          <ChevronRight className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className='flex items-center justify-center '>
  //       {currentPage <= 1 ? null : (
  //         <button
  //           onClick={handleOnClickPrev}
  //           className='p-10 mx-5 text-white bg-blue-900 cursor-pointer'
  //         >
  //           prev
  //         </button>
  //       )}
  //       {currentPage == pagination?.totalPages ? null : (
  //         <button
  //           onClick={handleOnClickNext}
  //           className='p-10 mx-5 text-white bg-blue-900 cursor-pointer'
  //         >
  //           Next
  //         </button>
  //       )}
  //     </div>
  //     <div className='flex items-center justify-end'>
  //       {/* <input type='number' min='10' max='100' onChange={(e) => } /> */}
  //       <p className='text-right text-slate-700 text-sm'>
  //         page {currentPage} of {pagination?.totalPages}
  //       </p>
  //     </div>
  //   </div>
  // );
}

export default Paginator;
