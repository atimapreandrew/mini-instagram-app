import React, { useEffect, useState } from "react";
import profileIcon from "../assets/profileIcon.svg";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";
import Modal from "./modal/Modal";

function Bio() {
  const userDetails = useLiveQuery(() => db.bio.get("info"), []);
  const userPhoto = useLiveQuery(() => db.bio.get("profilePhoto"), []);

  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function addUserDetailsToDB() {
    const data = {
      name: "Andrew A.",
      about: "Building the next big thing :)",
    };
    await db.bio.add(data, "info").catch((err) => {
      console.log("Default Bio data already exist!");
    });
  }
  addUserDetailsToDB();

  async function updateUserDetails(e) {
    const userData = {
      name: e.target.name.value,
      about: e.target.about.value,
    };
    e.preventDefault();
    await db.bio.put(userData, "info");
    setEditFormIsOpen(false);
  }

  const editForm = (
    <form className="edit-bio-form" onSubmit={updateUserDetails}>
      <input
        type="text"
        name="name"
        defaultValue={userDetails?.name}
        placeholder="Your name"
      />
      <input
        type="text"
        name="about"
        defaultValue={userDetails?.about}
        placeholder="About you"
      />
      <br />
      <button
        onClick={() => setEditFormIsOpen(false)}
        type="button"
        className="cancel-button"
      >
        Cancel
      </button>
      <button className="btn" type="submit">
        Save
      </button>
    </form>
  );

  const editButton = (
    <button
      className="btn"
      onClick={() => {
        setEditFormIsOpen(true);
      }}
    >
      Edit
    </button>
  );

  const deleteAllPhotos = async () => {
    await db.gallery.clear();
    setIsOpen(false);
  };

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    await db.bio.put(newProfilePhoto, "profilePhoto");
  };

  return (
    <section className="bio">
      <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div
          role="button"
          className="profile-photo"
          title="Click to edit photo"
        >
          <img src={!userPhoto ? profileIcon : userPhoto} alt="Profile Photo" />
        </div>
      </label>
      <div className="profile-info">
        <p className="name">{userDetails?.name}</p>
        <p className="about">{userDetails?.about}</p>
        {editFormIsOpen ? editForm : editButton}
        {!editFormIsOpen && (
          <button className="delete-all-button" onClick={() => setIsOpen(true)}>
            Delete All Photos
          </button>
        )}
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} id="bio" deleteBtn={deleteAllPhotos} />
      )}
    </section>
  );
}

export default Bio;
