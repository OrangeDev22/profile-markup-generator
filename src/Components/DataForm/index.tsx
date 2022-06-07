import React, { useState } from "react";
import {
  COVER_PLACEHOLDER,
  Profile,
  PROFILE_PICTURE_PLACEHOLDER,
} from "../../utils/constants";
import FilePicker from "../../utils/FilePicker";
import FormInput from "../FormInput";

function DataForm({
  onDataSubmited,
}: {
  onDataSubmited: (profile: Profile) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");

  const selectPictureHandler = async () => {
    const { base64String, mime } = await FilePicker("image/*");
    return `data:${mime};base64,${base64String}`;
  };

  return (
    <div className="py-4 h-full flex flex-col justify-center text-center">
      <h1 className="my-4 text-lg font-bold ">
        Please Enter your data so we can create your profile
      </h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onDataSubmited({
            firstName,
            secondName,
            userName,
            profilePicture,
            coverPicture,
          });
        }}
      >
        <div
          className="w-20 h-20 mx-auto rounded-full overflow-hidden hover:cursor-pointer"
          onClick={async () => {
            const newImage = await selectPictureHandler();
            setProfilePicture(newImage);
          }}
        >
          <img
            src={profilePicture || PROFILE_PICTURE_PLACEHOLDER}
            alt="profile-placeholder"
          />
        </div>
        <FormInput
          name="first_name"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />
        <FormInput
          name="second_name"
          placeholder="Second Name"
          onChange={(e) => setSecondName(e.target.value)}
          value={secondName}
          required
        />
        <FormInput
          name="user_name"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />
        <h1 className="my-4">Select a cover picture for your profile</h1>
        <div
          className="w-full h-80 overflow-hidden rounded-lg hover:cursor-pointer"
          style={{
            backgroundImage: `url(${
              coverPicture ? coverPicture : COVER_PLACEHOLDER
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={async () => {
            const newPicture = await selectPictureHandler();
            setCoverPicture(newPicture);
          }}
        />
        <button className="p-3 bg-green-700 rounded w-full">
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default DataForm;
