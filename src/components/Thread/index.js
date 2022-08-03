import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThread } from "../../actions/thread.actions";
import Tweet from "../Tweet";
import { isEmpty } from "../Utils";

const Thread = ({ type, uid, filter = "" }) => {
  const dispatch = useDispatch();
  const tweetdata = useSelector((state) => state.threadReducer.timeline);
  const [tweetList, setTweetList] = useState(tweetdata);

  const tweetFilter = (array) => {
    switch (filter) {
      case "tweets":
        return array.filter((elem) => {
          return elem.type !== "comment";
        });

      case "with_replies":
        return array;

      case "media":
        return array.filter((elem) => {
          return elem.type === "media";
        });
      case "likes":
        return array.filter((elem) => {
          return elem.tweet.favs.includes(uid);
        });

      default:
        return array;
    }
  };

  useEffect(() => {
    setTweetList(tweetFilter(tweetdata));
  }, [tweetdata, filter]);

  useEffect(() => {
    dispatch(getThread({uid, type}));
  }, []);

  return isEmpty(tweetList) ? (
    <div className="loading">
      <img src="./img/icons/load.svg" />
    </div>
  ) : (
    <div className="tweet-list">
      {!isEmpty(tweetList) &&
        tweetList.map((content, i) => {
          return (
            <Tweet
              key={content.tweet._id + i}
              content={content}
            />
          );
        })}
    </div>
  );
};

export default Thread;
