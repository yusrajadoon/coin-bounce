import { useState, useEffect } from "react";
import { getBlogById, updateBlog } from "../../api/internal";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateBlog.module.css";
import { useSelector } from "react-redux";
import TextInput from "../../components/TextInput/TextInput";

function UpdateBlog() {
  const navigate = useNavigate();
  const { id: blogId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const author = useSelector((state) => state.user._id);

  const getPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const updateHandler = async () => {
    try {
      const data = {
        author,
        title,
        content,
        blogId,
        ...(photo.includes("http") ? {} : { photo }),
      };

      const response = await updateBlog(data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  useEffect(() => {
    async function getBlogDetails() {
      try {
        const response = await getBlogById(blogId);
        if (response.status === 200) {
          const blog = response.data.blog;
          setTitle(blog.title);
          setContent(blog.content);
          setPhoto(blog.photo);
        }
      } catch (error) {
        console.error("Failed to load blog details:", error);
      }
    }
    getBlogDetails();
  }, [blogId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Edit your blog</div>

      <TextInput
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />

      <textarea
        className={styles.content}
        placeholder="Your content goes here..."
        maxLength={400}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className={styles.photoPrompt}>
        <p>Choose a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
        />
        {photo && (
          <img
            src={photo}
            width={150}
            height={150}
            alt="Selected blog preview"
          />
        )}
      </div>

      <button className={styles.update} onClick={updateHandler}>
        Update
      </button>
    </div>
  );
}

export default UpdateBlog;
