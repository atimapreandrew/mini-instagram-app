import React, { useState } from "react";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./modal/Modal";

function Gallery() {
  const allPhotos = useLiveQuery(() => db.gallery.reverse().toArray(), []);
  const [isOpen, setIsOpen] = useState(false);

  const addPhotosToDB = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#newPhotoInput"),
    });
  };

  const deletePhoto = (id) => {
    db.gallery.delete(id);
    setIsOpen(false);
  };

  return (
    <>
      <input type="file" name="photo" id="newPhotoInput" />
      <label htmlFor="newPhotoInput" onClick={addPhotosToDB}>
        <i className="add-photo-button fas fa-plus-square"></i>
      </label>

      <section className="gallery-empty">
        {!allPhotos && <LoadingSpinner />}
        {allPhotos?.length === 0 ? (
          <p>
            Gallery is empty, click the <span className="addIcon">+</span> to
            add some photos.
          </p>
        ) : null}
      </section>

      <section className="gallery">
        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="" />
            <button className="delete-button" onClick={() => setIsOpen(true)}>
              Delete
            </button>
            {isOpen && (
              <Modal
                setIsOpen={setIsOpen}
                deleteBtn={() => deletePhoto(photo.id)}
              />
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default Gallery;
