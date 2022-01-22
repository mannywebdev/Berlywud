import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBox.css'
import { BiSearchAlt } from "react-icons/bi"

export default function SearchBox() {
  const history = useHistory()
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/name/${name}`);
  };
  return (
    <form  onSubmit={submitHandler}>
      <div className="wrap">
      <div className="search">
        <input
          className="searchTerm"
          placeholder="Search for products"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" className="searchButton" type="submit">
          <BiSearchAlt style={{color: "black"}}/>
        </button>
      </div>
      </div>
    </form>
  );
}