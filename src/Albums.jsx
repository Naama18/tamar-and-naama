import { useState, useEffect } from "react";
import Photos from "./Photos";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [displayPhotosForAlbumId, setDisplayPhotosForAlbumId] = useState(null);
  const currentUserId = JSON.parse(localStorage.getItem("currentUser"))["id"];

  const ALBUMS_URL = `http://localhost:3500/albums?userId=${currentUserId}`;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(ALBUMS_URL);
        if (!response.ok) throw new Error("Did not receive expected data");
        const listAlbums = await response.json();
        setAlbums(listAlbums);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAlbums();
  }, [currentUserId]);

  const handleAlbumClick = (albumId) => {
    if (displayPhotosForAlbumId === albumId) {
      setDisplayPhotosForAlbumId(null);
    } else {
      setDisplayPhotosForAlbumId(albumId);
    }
  };
  function AddTodoToDb(newAlbumItem) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlbumItem),
    };
    fetch("http://localhost:3500/photos", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("photo updated:", data))
      .catch((error) => console.error("Error updating photo:", error));
  }
  const handleAddAlbum = (titleOfAlbum) => {
    const newAlbum = {
      userId: currentUserId,
      title: titleOfAlbum,
      id: (albums.length + Math.random() * 100).toString(),
    };
    setAlbums((prevAlbum) => [...prevAlbum, newAlbum]); // Add new todo
    AddTodoToDb(newAlbum);
  };
  return (
    <>
      <h2>Here are your albums:</h2>
      <button
        onClick={() => {
          const titleOfAlbum = prompt("enter your title of album");
          handleAddAlbum(titleOfAlbum);
        }}
      >
        Add album
      </button>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => handleAlbumClick(album.id)}>
              {album.title}
            </button>

            {displayPhotosForAlbumId === album.id && (
              <Photos albumId={album.id} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
