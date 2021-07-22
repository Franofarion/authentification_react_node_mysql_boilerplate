import api from "../../utils/api";
import React, { useEffect } from "react";
import "./Posts.css";

function Post({ id, creator, title, content }) {
  return (
    <div className="Post">
      <div className="Post-body">
        <h2>{title}</h2>
        <p>{content}</p>
        <h5>{creator}</h5>
      </div>
    </div>
  );
}

function PostCreation({ onPostCreation }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmitClick = async () => {
    const success = await onPostCreation(title, content);
    if (success) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="Post">
      <div className="Post-body">
        <input
          value={title}
          className="Post-input"
          type="text"
          placeholder="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="Post-input"
          placeholder="Your content..."
          value={content}
          rows={3}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="Post-submit"
          onClick={handleSubmitClick}
          disabled={title === "" || content === ""}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default function Posts() {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    api.axios
      .get(`${api.apiUrl}/posts`)
      .then((result) => setPosts(result.data))
      .catch((err) => console.error(err));
  }, []);

  const onPostCreation = async (title, content) => {
    try {
      const result = await api.axios.post(`${api.apiUrl}/posts`, {
        title,
        content,
      });
      setPosts([...posts, result.data]);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="PostList">
      {posts.map((post) => (
        <div key={post.id}>
          <Post {...post} />
        </div>
      ))}
      <PostCreation onPostCreation={onPostCreation} />
    </div>
  );
}
