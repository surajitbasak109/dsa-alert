import clsx from 'clsx';

type PaginationProps = {
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void; // Callback for page changes
};

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    // Validate page number
    if (page < 1 || page > pagination.totalPages) {
      return;
    }
    onPageChange(page); // Call the provided callback
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className={clsx(
          `px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50`,
          pagination.currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
        )}>
        Previous
      </button>
      <span>
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className={clsx(
          `px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50`,
          pagination.currentPage === pagination.totalPages
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
        )}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
