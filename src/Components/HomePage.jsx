import FilmList from "./FilmList";
import { connect } from "react-redux";
import { movies$ } from "../Helpers/movies";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "../Styles/HomePage.css";

function HomePage(props) {
  const [_category, setCategory] = useState([]);
  const [_size, setSize] = useState(4);
  const _updateFilm = (list) => {
    const action = { type: "UPDATE_FILM", value: list };
    props.dispatch(action);
  };

  const uniqueCategory = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  if (props.listFilm.length === 0) {
    movies$.then((resolve) => _updateFilm(resolve));
  }

  return (
    <>
      <div className="topbar">
      <ToggleButtonGroup className="button-group"
          value={_size}
          exclusive
          onChange={handleSize}
          aria-label="page size"
        >
          <ToggleButton value="4" aria-label="4">
            4
          </ToggleButton>
          <ToggleButton value="8" aria-label="8">
            8
          </ToggleButton>
          <ToggleButton value="12" aria-label="12">
            12
          </ToggleButton>
        </ToggleButtonGroup>
        <Select className="select"
          multiple
          onChange={handleChange}
          value={_category}
          input={<Input />}
        >
          {props.listFilm
            .map((item) => item.category)
            .filter(uniqueCategory)
            .map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
        </Select>
        
      </div>
      <FilmList list={props.listFilm} category={_category} size={_size} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    listFilm: state.listFilm,
  };
};

export default connect(mapStateToProps)(HomePage);
