import React, { useState } from "react";
import profileIcon from "../assets/profileIcon.svg";
import getPhotoUrl from "get-photo-url";

function Bio() {
  const [userDetails, setUserDetails] = useState({
    name: "Andrew Atimapre",
    about: "I'm a software developer.",
  });
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profileIcon);

  function updateUserDetails(e) {
    e.preventDefault();
    setUserDetails({
      name: e.target.name.value,
      about: e.target.about.value,
    });
    setEditFormIsOpen(false);
  }

  const editForm = (
    <form className="edit-bio-form" onSubmit={updateUserDetails}>
      <input type="text" id="" name="name" placeholder="Your name" />
      <input type="text" id="" name="about" placeholder="About you" />
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
