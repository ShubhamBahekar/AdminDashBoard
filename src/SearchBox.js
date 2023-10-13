function SearchBox({ searchQuery, onSearchChange }) {
  const handleAsInputChanges = (event) => {
    const query = event.target.value;
    onSearchChange(query);
  };

  return (
    <div className="form-outline">
      <input
        type="text"
        id="form1"
        className="form-control"
        placeholder="Search for User"
        aria-label="Search"
        value={searchQuery}
        onChange={handleAsInputChanges}
      />
    </div>
  );
}

export default SearchBox;
