import "../Styles/FilmItem.css";
import {
  getFilmsFromApi,
  getImageFromApi,
} from "../API/PosterApi";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useState } from "react";
import { connect } from "react-redux";

const CustomButton = withStyles((theme) => ({
  colorPrimary: {
    color: "#7FCD58",
  },

  colorSecondary: {
    color: "#D24430",
  },

}))(IconButton);

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#D24430",
  },
  bar: {
    borderRadius: 2,
    backgroundColor: "#7FCD58",
  },
}))(LinearProgress);

function FilmItem(props) {
  const [_url, setUrl] = useState("");
  getFilmsFromApi(props.film.title).then((data) => {
    setUrl(data.results[0].poster_path);
  });

  const _deleteFilm = () => {
    const action = { type: "DELETE_FILM", value: props.film };
    props.dispatch(action);
  };

  const _toggleLike = () => {
    const action = { type: "LIKE_FILM", value: props.film.id };
    props.dispatch(action);
  };

  const _toggleDislike = () => {
    const action = { type: "DISLIKE_FILM", value: props.film.id };
    props.dispatch(action);
  };

  return (
    <div className="film-item">
      <img className="image" alt="film-poster" src={getImageFromApi(_url)} />
      <div className="content-container">
        <div className="like">
          <BorderLinearProgress
            variant="determinate"
            value={
              (props.film.likes * 100) /
              (props.film.likes + props.film.dislikes)
            }
          />
          <div className="ratio">
            <CustomButton color={props.likedFilm.findIndex(item => item === props.film.id) !== -1 ? 'primary' : 'default'} aria-label="like" onClick={() => _toggleLike()}>
              <ThumbUp style={{ fontSize: 18 }} />
            </CustomButton>
            {props.film.likes}
            <CustomButton color={props.dislikedFilm.findIndex(item => item === props.film.id) !== -1 ? 'secondary' : 'default'}aria-label="dislike" onClick={() => _toggleDislike()}>
              <ThumbDown style={{ fontSize: 18 }} />
            </CustomButton>

            {props.film.dislikes}
          </div>
        </div>
        <div className="header-container">
          <p className="title">{props.film.title}</p>
          <p className="category">{props.film.category}</p>
        </div>
        <div className="trash">
          <IconButton aria-label="delete" onClick={() => _deleteFilm()}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listFilm: state.listFilm,
    likedFilm: state.likedFilm,
    dislikedFilm: state.dislikedFilm,
  };
};

export default connect(mapStateToProps)(FilmItem);
