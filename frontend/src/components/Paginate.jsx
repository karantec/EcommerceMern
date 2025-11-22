import React from "react";

const Paginate = ({ currentPage, totalPage, pageHandler }) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">

        {/* First */}
        <button
          onClick={() => pageHandler(1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
            ${currentPage <= 1 
              ? "opacity-40 cursor-not-allowed bg-gray-100" 
              : "hover:bg-gray-200 bg-gray-50"
            }
          `}
        >
          First
        </button>

        {/* Prev */}
        <button
          onClick={() => pageHandler(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
            ${currentPage <= 1 
              ? "opacity-40 cursor-not-allowed bg-gray-100" 
              : "hover:bg-gray-200 bg-gray-50"
            }
          `}
        >
          Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {[...Array(totalPage)].map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => pageHandler(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                      : "bg-gray-50 hover:bg-gray-200"
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => pageHandler(currentPage + 1)}
          disabled={currentPage >= totalPage}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
            ${currentPage >= totalPage 
              ? "opacity-40 cursor-not-allowed bg-gray-100" 
              : "hover:bg-gray-200 bg-gray-50"
            }
          `}
        >
          Next
        </button>

        {/* Last */}
        <button
          onClick={() => pageHandler(totalPage)}
          disabled={currentPage >= totalPage}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
            ${currentPage >= totalPage 
              ? "opacity-40 cursor-not-allowed bg-gray-100" 
              : "hover:bg-gray-200 bg-gray-50"
            }
          `}
        >
          Last
        </button>

      </div>
    </div>
  );
};

export default Paginate;
