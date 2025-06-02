import React from "react";
import {
  SignedIn,
  SignUpButton,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
const Auth = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal" />
        <SignUpButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Auth;
