import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by name, job title, or status..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {query && (
          <button className="clear-btn" onClick={handleClear} title="Clear search">
            ✕
          </button>
        )}
      </div>
      <p className="search-hint">Tip: Search by candidate name, job title, or status</p>
    </div>
  );
};

export default SearchBar;
