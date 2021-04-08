const initialState = { listFilm: [], likedFilm: [], dislikedFilm: [] };

function manageFilm(state = initialState, action) {
    let nextState;
    let filmIndex = [];
    let likedFilmIndex = [];
    let dislikedFilmIndex = [];

    switch (action.type) {
        case 'UPDATE_FILM':
            console.log("UPDATE");
            nextState = {
                ...state,
                listFilm: action.value
            }

            return nextState || state;
        case 'DELETE_FILM':
            console.log("DELETE");
            nextState = {
                ...state,
                listFilm: state.listFilm.filter((item) => item.id !== action.value.id)
            }

            console.log("next state :", nextState, "state", state);
            return nextState || state;

        case 'LIKE_FILM':
            console.log("LIKE");
            likedFilmIndex = state.likedFilm.findIndex(item => item === action.value)
            filmIndex = state.listFilm.findIndex(item => item.id === action.value);
            if (likedFilmIndex !== -1) {
                nextState = {
                    ...state,
                    likedFilm: state.likedFilm.filter((item, index) => index !== likedFilmIndex)
                }
                nextState.listFilm[filmIndex].likes--;
            }
            else {
                dislikedFilmIndex = state.dislikedFilm.findIndex(item => item === action.value)
                nextState = {
                    ...state,
                    likedFilm: [...state.likedFilm, action.value],
                    dislikedFilm: state.dislikedFilm.filter((item, index) => index !== dislikedFilmIndex)
                }
                if(dislikedFilmIndex !== -1){
                    nextState.listFilm[filmIndex].dislikes--;
                }
                nextState.listFilm[filmIndex].likes++;
            }
            
            return nextState || state;
            
        case 'DISLIKE_FILM':
            console.log("DISLIKE");
            dislikedFilmIndex = state.dislikedFilm.findIndex(item => item === action.value)
            filmIndex = state.listFilm.findIndex(item => item.id === action.value);
            if (dislikedFilmIndex !== -1) {
                nextState = {
                    ...state,
                    dislikedFilm: state.dislikedFilm.filter((item, index) => index !== dislikedFilmIndex)
                }
                nextState.listFilm[filmIndex].dislikes--;
            }
            else {
                likedFilmIndex = state.likedFilm.findIndex(item => item === action.value)
                nextState = {
                    ...state,
                    likedFilm: state.likedFilm.filter((item, index) => index !== likedFilmIndex),
                    dislikedFilm: [...state.dislikedFilm, action.value]
                }
                if(likedFilmIndex !== -1){
                    nextState.listFilm[filmIndex].likes--;
                }
                nextState.listFilm[filmIndex].dislikes++;
            }

            return nextState || state;
        default:
            return state;
    }
}

export default manageFilm;