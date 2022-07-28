import React, { useState } from "react";
import getPhotoUrl from "get-photo-url";

function Gallery() {
  const [allPhotos, setAllPhotos] = useState([]);

  const handleAllPhotos = async () => {
    const newPhoto = {
      id: Date.now(),
      url: await getPhotoUrl("#addPhotoInput"),
    };

    setAllPhotos([newPhoto, ...allPhotos]);
  };

  return (
    <>
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={handleAllPhotos}>
        <i className="add-photo-button fas fa-plus-square"></i>
      </label>

      <section className="gallery">
        {allPhotos.map((photo) => (
          <div className="item">
            <img src={photo.url} className="item-image" alt="" />
            <button className="delete-button">Delete</button>
          </div>
        ))}
      </section>
    </>
  );
}

export default Gallery;
