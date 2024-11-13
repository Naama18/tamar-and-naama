import { useState, useEffect } from "react";

export default function Photos(props) {
  const PHOTOS_URL = `http://localhost:3500/photos?albumId=${props.albumId}`;
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(PHOTOS_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listPhotos = await response.json();
        setPhotos(listPhotos);
        console.log(listPhotos);
      } catch (err) {
        console.log(err.message);
      }
    };

    (async () => await fetchPhotos())();
  }, []);
  function removeFromDb(photoToRemove) {
    const updatedPhotos = photos.filter(
      (photo) => photo.id !== photoToRemove.id
    );
    setPhotos(updatedPhotos);

    fetch(`http://localhost:3500/photos/${photoToRemove.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Todo deleted from the server.");
        } else {
          throw new Error("Failed to delete todo from the server.");
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  }
  function AddTodoToDb(newPhotoItem) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPhotoItem),
    };
    fetch("http://localhost:3500/photos", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("photo updated:", data))
      .catch((error) => console.error("Error updating photo:", error));
  }
  const handleAddPhoto = (titleOfUrl, urlOfImg) => {
    const newPhoto = {
      albumId: props.albumId,
      title: titleOfUrl,
      thumbnailUrl: urlOfImg,
      id: (photos.length + 1).toString(),
    };
    console.log(newPhoto);
    setPhotos((prevPhoto) => [...prevPhoto, newPhoto]); // Add new todo
    AddTodoToDb(newPhoto);
    console.log(photos);
  };
  return (
    <>
      <h2>Here is your photos:</h2>
      <button
        onClick={() => {
          const titleOfUrl = prompt("please enter your title");
          const urlOfImg = prompt("please enter url of image");

          handleAddPhoto(titleOfUrl, urlOfImg);
        }}
      >
        add photo
      </button>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <li>
                {photo.title}
                <br />
                <img src={photo.thumbnailUrl} />
              </li>
              <button
                onClick={() => {
                  removeFromDb(photo);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
