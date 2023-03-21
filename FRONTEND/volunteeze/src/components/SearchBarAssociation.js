import React, { useState } from "react";
import "../styles/SearchBarAssociation.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBarAssociation({ placeholder, data, updateCenter }) {
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
                className="dataItem"
                onClick={() =>
                  updateCenter({
                    lat: association.lat,
                    lng: association.lng,
                  })
                }
              >
                <p>{association.nom}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBarAssociation;
