import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";

const STORAGE_KEY = "movies_data";
const GENRES_KEY = "genres_data";

export default function App() {
  const [multiselect, setMultiselect] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [edMovie, setEdMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  

  const [curPage, setCurPage] = useState(1);
  const mPerPage = 100;

  const exGenres = (movieList) => {
    const genreSet = new Set();
    movieList.forEach((movie) => {
      if (Array.isArray(movie.genres)) {
        movie.genres.forEach((genre) => genreSet.add(genre));
      }
    });
    return Array.from(genreSet).sort();
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
      const data = response.data.slice(30000, 36300);
      setMovies(data);

      const genres = exGenres(data);
      setAllGenres(genres);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(GENRES_KEY, JSON.stringify(genres));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedMovies = localStorage.getItem(STORAGE_KEY);
    const storedGenres = localStorage.getItem(GENRES_KEY);

    if (storedMovies && storedGenres) {
      setMovies(JSON.parse(storedMovies));
      setAllGenres(JSON.parse(storedGenres));
      setLoading(false);
    } else {
      fetchMovies();
    }
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const titleMatch = movie.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const genreMatch =
        multiselect.length === 0 ||
        (Array.isArray(movie.genres) &&
          movie.genres.some((g) => multiselect.includes(g)));
      return titleMatch && genreMatch;
    });
  }, [movies, search, multiselect]);

  useEffect(() => {
    setCurPage(1);
  }, [search, multiselect]);

  const startIndex = (curPage - 1) * mPerPage;
  const endIndex = startIndex + mPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  const handleGenreChange = (genre) => {
    setMultiselect((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleAddMovie = () => {
    setEdMovie(null);
    setShowModal(true);
  };

  const handleEditMovie = (movie) => {
    setEdMovie(movie);
    setShowModal(true);
  };

  const handleSaveMovie = (formData) => {
    let updatedMovies;
    if (edMovie) {
      updatedMovies = movies.map((m) =>
        m === edMovie ? { ...edMovie, ...formData } : m
      );
    } else {
      const newMovie = { ...formData, id: Date.now() };
      updatedMovies = [newMovie, ...movies];
    }

    setMovies(updatedMovies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMovies));
    setShowModal(false);
  };

  const handleDeleteMovie = (movie) => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      const updatedMovies = movies.filter((m) => m !== movie);
      setMovies(updatedMovies);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMovies));
    }
  };

  // const handleClearCache = () => {
  //   if (
  //     window.confirm(
  //       "This will clear all data and reload movies from API. Continue?"
  //     )
  //   ) {
  //     localStorage.removeItem(STORAGE_KEY);
  //     localStorage.removeItem(GENRES_KEY);
  //     setLoading(true);
  //     fetchMovies();
  //   }
  // };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 fw-bold mx-4">
            🎬 Zee-Movie App
          </span>
          <div>
            <button
              className="btn btn-warning btn-md mx-4"
              onClick={handleAddMovie}
            >
              ➕ Add New Movie
            </button>

            {/* <button className="btn btn-info btn-md" onClick={handleClearCache}>
              🔄 Refresh from API
            </button> */}
          </div>
        </div>
      </nav>

      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#3c6187d0", minHeight: "100vh" }}
      >
        <div className="row mb-2 justify-content-center">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Search by Title</label>
            <input
              type="text"
              className="form-control form-control-lg bg-success-subtle text-success"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-1">
            <label className="form-label fw-bold">Filter by Genres</label>
            <div
              className="bg-warning-subtle p-3 border rounded"
              style={{ maxHeight: "100px", overflowY: "auto" }}
            >
              {allGenres.map((genre) => (
                <div key={genre} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`genre-${genre}`}
                    checked={multiselect.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`genre-${genre}`}
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col text-center">
            <p className="text-muted">
              Showing <strong>{filteredMovies.length}</strong> of{" "}
              <strong>{movies.length}</strong> movies
            </p>
          </div>
        </div>

        <MovieList
          movies={paginatedMovies}
          onEdit={handleEditMovie}
          onDelete={handleDeleteMovie}
        />

        <div>
          <ul className="pagination justify-content-center mt-2">
            <li className={`page-item ${curPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() =>
                  curPage > 1 && setCurPage(curPage - 1)
                }
              >
                Previous
              </button>
            </li>

            {(() => {
              const totalPages = Math.ceil(
                filteredMovies.length / mPerPage
              );
              const pages = [];

              for (let i = 1; i <= Math.min(5, totalPages); i++) {
                pages.push(i);
              }

              if (totalPages > 10) {
                pages.push("...");
              }

              for (let i = Math.max(totalPages - 4, 6); i <= totalPages; i++) {
                pages.push(i);
              }

              return pages.map((page, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    curPage === page ? "active" : ""
                  } ${page === "..." ? "disabled" : ""}`}
                >
                  {page === "..." ? (
                    <span className="page-link">...</span>
                  ) : (
                    <button
                      className="page-link"
                      onClick={() => setCurPage(page)}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ));
            })()}

            <li
              className={`page-item ${
                curPage === Math.ceil(filteredMovies.length / mPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  curPage <
                    Math.ceil(filteredMovies.length / mPerPage) &&
                  setCurPage(curPage + 1)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </div>

        {showModal && (
          <MovieModal
            movie={edMovie}
            allGenres={allGenres}
            onSave={handleSaveMovie}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
