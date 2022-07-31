import React from "react";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";
import LoadingSpinner from "./LoadingSpinner";

function Gallery() {
  const allPhotos = useLiveQuery(() => db.gallery.toArray(), []);

  const addPhotosToDB = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };

  const deletePhoto = (id) => {
    db.gallery.delete(id);
  };

  return (
    <>
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhotosToDB}>
        <i className="add-photo-button fas fa-plus-square"></i>
      </label>

      <section className="gallery">
        {!allPhotos && <LoadingSpinner />}
        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="" />
            <button
              className="delete-button"
              onClick={() => deletePhoto(photo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default Gallery;
