import React, { useEffect, useState } from "react";
import profileIcon from "../assets/profileIcon.svg";
import getPhotoUrl from "get-photo-url";
import { db } from "../dexie";

function Bio() {
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    about: "Here should be a brief description about you :).",
  });
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profileIcon);

  useEffect(() => {
    const setDataFromDB = async () => {
      const userDetailsFromDB = await db.bio.get("info");
      const profilePhotoFromDB = await db.bio.get("profilePhoto");
      userDetailsFromDB && setUserDetails(userDetailsFromDB);
      profilePhotoFromDB && setProfilePhoto(profilePhotoFromDB);
    };

    setDataFromDB();
  }, []);

  async function updateUserDetails(e) {
    const objectData = {
      name: e.target.name.value,
      about: e.target.about.value,
    };
    e.preventDefault();
    setUserDetails(objectData);
    await db.bio.put(objectData, "info");
    setEditFormIsOpen(false);
  }

  const editForm = (
    <form className="edit-bio-form" onSubmit={updateUserDetails}>
      <input
        type="text"
        id=""
        name="name"
        defaultValue={userDetails.name}
        placeholder="Your name"
      />
      <input
        type="text"
        id=""
        name="about"
        defaultValue={userDetails.about}
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
      <button type="submit">Save</button>
    </form>
  );

  const editButton = (
    <button
      onClick={() => {
        setEditFormIsOpen(true);
      }}
    >
      Edit
    </button>
  );

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    setProfilePhoto(newProfilePhoto);
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
          <img src={profilePhoto} alt="Profile Photo" />
        </div>
      </label>
      <div className="profile-info">
        <p className="name">{userDetails.name}</p>
        <p className="about">{userDetails.about}</p>
        {editFormIsOpen ? editForm : editButton}
      </div>
    </section>
  );
}

export default Bio;
