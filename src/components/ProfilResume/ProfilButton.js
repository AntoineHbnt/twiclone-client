import _ from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../actions/user.actions";

const ProfilButton = ({ profilId }) => {
  const user = useSelector((state) => state.userReducer);
  const [currentUser, setCurrentUser] = useState(user);
  const [isCurrentUserProfil, setIsCurrentUserProfil] = useState(false);
  const [isFollowing, setIsFollowing] = useState();
  const [label, setLabel] = useState("loading...");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      setIsCurrentUserProfil(profilId === currentUser._id);
      setIsFollowing(currentUser.following.includes(profilId));
    }
  }, [currentUser]);

  useEffect(() => {
    setLabel(isFollowing ? "Abonné" : "Suivre");
  },[isFollowing]);

  useEffect(() => {
    setCurrentUser(user);
  },[user])

  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unfollow({uid: currentUser._id, idToUnFollow: profilId}));
    } else {
      dispatch(follow({uid: currentUser._id, idToFollow: profilId}));
    }
  };

  const handleClick = () => {
    if (!isCurrentUserProfil) {
      handleFollow();
    }
  };

  return (
    <button className="profil-btn-container" onClick={() => handleClick()}>
      <div className={`profil-btn-wrapper`}>
        <span>{isCurrentUserProfil ? "Éditer profil" : label}</span>
      </div>
    </button>
  );
};

export default ProfilButton;
