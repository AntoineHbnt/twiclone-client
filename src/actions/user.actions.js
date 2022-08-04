import axios from "axios";

export const GET_USER = "GET_USER";
export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.error(err));
  };
};

export const follow = ({uid, idToFollow}) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/${uid}`,
      withCredentials: true,
      data: {
        idToFollow,
      },
    })
      .then((res) => {
        dispatch({ type: FOLLOW, payload: res.data });
      })
      .catch((err) => console.error(err));
  };
}

export const unfollow = ({uid, idToUnFollow}) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/${uid}`,
      withCredentials: true,
      data: {
        idToUnFollow,
      },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW, payload: res.data });
      })
      .catch((err) => console.error(err));
  };
}
