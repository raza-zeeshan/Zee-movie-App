import React, { useState, useEffect } from "react";

export default function MovieModal({ movie, allGenres, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    cast: [],
    genres: [],
    thumbnail: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        year: movie.year || new Date().getFullYear(),
        cast: Array.isArray(movie.cast) ? movie.cast : [],
        genres: Array.isArray(movie.genres) ? movie.genres : [],
        thumbnail: movie.thumbnail || "",
      });
    }
  }, [movie]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  const handleGenreChange = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleCastChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      cast: e.target.value
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }
    onSave(formData);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">
              {movie ? "✏️ Edit Movie" : "➕ Add New Movie"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label fw-bold">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Movie title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Year</label>
              <input
                type="number"
                className="form-control"
                name="year"
                value={formData.year}
                onChange={handleFormChange}
                placeholder="Year"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Cast (comma-separated)
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.cast.join(", ")}
                onChange={handleCastChange}
                placeholder="Actor 1, Actor 2, Actor 3..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Genres</label>
              <div
                className="bg-light p-3 rounded border"
                style={{ maxHeight: "180px", overflowY: "auto" }}
              >
                {allGenres.map((genre) => (
                  <div key={genre} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`modal-genre-${genre}`}
                      checked={formData.genres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`modal-genre-${genre}`}
                    >
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Thumbnail URL</label>
              <input
                type="text"
                className="form-control"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleFormChange}
                placeholder="https://example.com/image.jpg"
              />
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="mt-2"
                  style={{ maxHeight: "100px", borderRadius: "4px" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-warning" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              {movie ? "Update Movie" : "Add Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
