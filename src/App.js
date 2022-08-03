import Log from "./pages/Log";
import Routes from "./components/Routes";
import "./styles/index.scss";
import { UserContext } from "./components/AppContext";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data)})
      .catch((err) => console.log(err));

    if(uid) {
      dispatch(getUser(uid))
    }
  }, [uid, dispatch]);

  return (
    <UserContext.Provider value={{uid, favs: user.favs, retweets: user.retweets}}>
      {!uid ? (
        <Log />
      ) : (
        <div className="page-container">
          <Router>
            <NavBar />
            <Routes />
          </Router>
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
