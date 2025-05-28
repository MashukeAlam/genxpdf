import React, { useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function AuthModal() {
  const { isOpen, setIsOpen, modalRef, username, profilePicture, setCurrentUser } = useAuth();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfo = await res.json();
      const payload = JSON.stringify({sub: userInfo.sub, email: userInfo.email, name: userInfo.name});
      setIsOpen(false)
    },
    onError: (error) => console.log("Login failed", error),
  });

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      ref={modalRef}
      aria-hidden={!isOpen}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Signing up brings new features</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>
          <div className="modal-body text-center">
            <p className="text-muted mb-4">Sign in to continue</p>
            <button
              className="btn btn-outline-dark d-flex align-items-center gap-2 px-4 py-2 rounded-pill mx-auto"
              onClick={() => login()}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width="20"
                height="20"
              />
              <span>Please use Google to sign in...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}