import React, { useState } from "react";

function Input({ showDiv }) {
    
  const [searchWord, setSearchWord] = useState("");
  return (
    <div>
      <input
        type="text"
        data-testid="searchBar"
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <h1 data-testid="displaySearch">{searchWord}</h1>

      {showDiv && (
        <div data-testid="divWeWantToShow">
          Hey, My name is Tyrantt. I eat people to feed my stomach.
        </div>
      )}
    </div>
  );
}

export default Input;
