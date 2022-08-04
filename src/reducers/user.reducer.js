import { FOLLOW, GET_USER, UNFOLLOW } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case FOLLOW:
      return {
        ...state,
        following: [...state.following, action.payload.idToFollow],
      };

    case UNFOLLOW:
      return {
        ...state,
        following: state.following.filter(
          (following) => following !== action.payload.idToUnFollow
        ),
      };

    default:
      return state;
  }
}
