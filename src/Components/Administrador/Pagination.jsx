const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <ul className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <li key={index + 1} className="page-item">
          <button onClick={() => paginate(index + 1)} className="page-link">
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
