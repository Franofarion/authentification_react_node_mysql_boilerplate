import api from "../utils/api";
import React, { useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    console.log("req.user");
    api.axios
      .get(`${api.apiUrl}/posts`)
      .then((result) => setPosts(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {posts.map((post) => {
        <div key={post.id}>
          <p>{post.title}</p>
        </div>;
      })}
    </div>
  );
}
