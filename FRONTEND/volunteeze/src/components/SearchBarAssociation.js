import React, { useState } from "react";
import "../styles/SearchBarAssociation.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBarAssociation({
  placeholder,
  data,
  updateCenter,
  onChangeZoom,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const dataFiltered = data.filter((association) => {
      return association.nom.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(dataFiltered);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="blocSearch">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {wordEntered.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((association) => {
              return (
                <a
                  href="#/"
                  className="dataItem"
                  key={association.nom}
                  onClick={() => {
                    updateCenter({
                      lat: association.latitude,
                      lng: association.longitude,
                    });
                    clearInput();
                    onChangeZoom(16);
                  }}
                >
                  <p>{association.nom}</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBarAssociation;
