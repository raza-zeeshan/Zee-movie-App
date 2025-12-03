
import React from 'react';

export default function MovieList({ movies, onEdit, onDelete }) {
  return (
    <div className="row">
      <div className="col-11 text-center mx-auto">
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-hover mb-0">
            <thead className="table-dark ">
              <tr className='text-center'>
                <th style={{ width: '80px',fontSize: '20px' }}>Thumbnail</th>
                <th style={{ fontSize: '20px' }}>Title</th>
                <th style={{ fontSize: '20px' }}>Year</th>
                <th style={{fontSize: '20px' }}>Cast</th>
                <th style={{ width: '80px',fontSize: '20px' }}>Genres</th>
                <th style={{ width: '140px',fontSize: '20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.length > 0 ? (
                movies.map((movie,index) => (
                  <tr key={index} className="text-center">
                    <td>
                      {movie.thumbnail ? (
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          style={{ 
                            height: '100px', 
                            width: '80px',
                            objectFit: 'cover', 
                            borderRadius: '2px', 
                            
                          }}
                        />
                      ) : (
                        <div 
                          className="bg-light d-flex align-items-center justify-content-center" 
                          style={{ height: '100px', width: '80px', borderRadius: '2px' }}
                        >
                          📷
                        </div>
                      )}
                    </td>
                    <td className="fw-bold text-dark align-middle">
                      {movie.title}
                    </td>
                    <td className="align-middle ">{movie.year}</td>
                    <td className="align-middle">
                      <small>
                        {Array.isArray(movie.cast) ? movie.cast.slice(0, 2).join(', ') : 'N/A'}
                      </small>
                    </td>
                    <td className="align-middle">
                      <div>
                        {Array.isArray(movie.genres) && movie.genres.map((genre, idx) => (
                          <span key={idx} className="badge bg-dark me-1 mb-1">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm btn-success me-2 mb-1"
                        onClick={() => onEdit(movie)}
                        title="Edit"
                      >
                         Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger mb-1"
                        onClick={() => onDelete(movie)}
                        title="Delete"
                      >
                         Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No movies found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}