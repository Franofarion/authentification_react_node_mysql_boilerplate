import api from "../utils/api";
import React, { useEffect } from "react";
import { logOut } from "../utils/session";
import { useHistory } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log("req.user");
    api.axios
      .get(`${api.apiUrl}/posts`)
      .then((result) => setPosts(result.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    logOut();
    history.push("/login");
  };

  return (
    <div>
      <h3>Posts</h3>
      {posts.map((post) => (
        <>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </>
      ))}
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
