import React, { useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import FavButton from "./FavButton";
import RetweetButton from "./RetweetButton";
import ShareButton from "./ShareButton";
import { abbreviateNumber } from "js-abbreviation-number";
import { useDispatch, useSelector } from "react-redux";
import { favTweet, unfavTweet } from "../../../actions/thread.actions";

const Interaction = ({ tweet }) => {
  const tweetId = tweet._id;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const threadData = useSelector((state) => state.threadReducer);

  const numberParser = (num) => {
    if (num <= 9999) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else if(num < 100000){
        return abbreviateNumber(num.toString(), 1)
    } else return abbreviateNumber(num.toString(),0)
  };
  
  const [isFavActive, setIsFavActive] = useState( threadData.userFavs.includes(tweetId));
  const [nbFav, setNbFav] = useState(numberParser(tweet.favs.length));

  const [isRetweetActive, setIsRetweetActive] = useState(threadData.userRetweets.includes(tweetId));
  const [nbRetweet, setNbRetweet] = useState(numberParser(tweet.retweets.length));


  const [nbComment, setNbComment] = useState(numberParser(tweet.comments.length));


  useEffect(() => {
    setNbFav(numberParser(tweet.favs.length));
    setNbComment(numberParser(tweet.comments.length));
    setNbRetweet(numberParser(tweet.retweets.length));

    setIsRetweetActive(threadData.userRetweets.includes(tweetId) ? true : false)
    setIsFavActive(threadData.userFavs.includes(tweetId) ? true : false)

  }, [tweet])



  const handleFav = () => {
    dispatch(isFavActive ? unfavTweet({tweetId, uid: userData._id}) : favTweet({tweetId, uid: userData._id}));
  }

  const handleRetweet = () => {
    if (isRetweetActive) {
      setIsRetweetActive(false);
    }
    if (!isRetweetActive) {
      setIsRetweetActive(true);
    }
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
