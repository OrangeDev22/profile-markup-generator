import React, { useState } from "react";

import "./App.css";
import DataForm from "./Components/DataForm";
import ProfileMarkup from "./Components/ProfiuleMarkup";
import { Profile } from "./utils/constants";

function App() {
  const profileFromStorage = localStorage.getItem("profile-data");
  const [profile, setProfile] = useState<Profile | undefined>(
    profileFromStorage ? JSON.parse(profileFromStorage || "") : undefined
  );
  const [step, setStep] = useState<"form" | "profile">(
    profile ? "profile" : "form"
  );

  return (
    <div className="flex flex-col min-h-full text-white">
      <header className=""></header>
      <main className="flex-grow flex flex-col">
        <div className="w-full max-w-4xl mx-auto">
          {step === "form" && !profile && (
            <DataForm
              onDataSubmited={(profile) => {
                localStorage.setItem("profile-data", JSON.stringify(profile));
                setProfile(profile);
                setStep("profile");
              }}
            />
          )}
          {step === "profile" && profile && <ProfileMarkup profile={profile} />}
        </div>
      </main>
    </div>
  );
}

export default App;
