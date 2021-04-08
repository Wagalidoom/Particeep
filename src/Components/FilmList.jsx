import "../Styles/FilmList.css";
import FilmItem from "./FilmItem";
import React, { useEffect, useState } from "react";

function FilmList(props) {
  const [_category, setCategory] = useState([]);
  useEffect(() => {
    setCategory(props.category);
  }, [props]);
  console.log(_category)
  
  const filmItems = props.list.map((film) => {
    if (_category.length !== 0) {
      if (_category.findIndex((item) => item === film.category) !== -1) {
        return <FilmItem key={film.id} film={film} />;
      } else return undefined;
    }
    return <FilmItem key={film.id} film={film} />;
  });
  console.log(filmItems)
  return <div className="main_container">{filmItems}</div>;
}

export default FilmList;
