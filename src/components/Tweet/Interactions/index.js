import React, { useContext, useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import FavButton from "./FavButton";
import RetweetButton from "./RetweetButton";
import ShareButton from "./ShareButton";
import { abbreviateNumber } from "js-abbreviation-number";
import { useDispatch, useSelector } from "react-redux";
import { favTweet, unfavTweet } from "../../../actions/thread.actions";

const Interaction = ({ tweet }) => {
  const tweetId = tweet._id;
  const user = useSelector((state) => state.userReducer);
  const [currentUserFavs, setCurrentUserFavs] = useState(user.favs.map(fav => fav.id));
  const [currentUserRetweets, setCurrentUserRetweets] = useState(user.retweets.map(retweet => retweet.id));
  const dispatch = useDispatch();

  const numberParser = (num) => {
    if (num <= 9999) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else if(num < 100000){
        return abbreviateNumber(num.toString(), 1)
    } else return abbreviateNumber(num.toString(),0)
  };
  
  const [isFavActive, setIsFavActive] = useState(currentUserFavs.includes(tweetId));
  const [nbFav, setNbFav] = useState(numberParser(tweet.favs.length));

  const [isRetweetActive, setIsRetweetActive] = useState(currentUserRetweets.includes(tweetId));
  const [nbRetweet, setNbRetweet] = useState(numberParser(tweet.retweets.length));

  const [nbComment, setNbComment] = useState(numberParser(tweet.comments.length));


  useEffect(() => {
    setNbFav(numberParser(tweet.favs.length));
    setNbComment(numberParser(tweet.comments.length));
    setNbRetweet(numberParser(tweet.retweets.length));

    setIsRetweetActive(currentUserRetweets.includes(tweetId))
    setIsFavActive(currentUserFavs.includes(tweetId))
  }, [tweet, currentUserFavs, currentUserRetweets]);

  useEffect(() => {
    setCurrentUserFavs(user.favs.map(fav => fav.id));
    setCurrentUserRetweets(user.retweets.map(retweet => retweet.id));
  }, [user])

  const handleFav = () => {
    dispatch(isFavActive ? unfavTweet({tweetId, uid:user._id}) : favTweet({tweetId, uid:user._id}));
    setCurrentUserFavs(isFavActive ? currentUserFavs.filter(fav => fav !== tweetId) : [...currentUserFavs, tweetId]);
  }

  return (
    <div className="interaction-container">
      <div className="interaction-wrapper">
        <CommentButton tweet={tweet} tweetId={tweetId} value={nbComment} />
        <RetweetButton isActive={isRetweetActive} tweet={tweet} tweetId={tweetId} value={nbRetweet} />
        <FavButton isActive={isFavActive} onClick={() => handleFav()} value={nbFav} />
        <ShareButton tweet={tweet} />
      </div>
    </div>
  );
};

export default Interaction;
