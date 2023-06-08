import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@configs/firebase.ts";
// this will show the animation
const Loader = () => {
  return (
    <div className='position-fixed w-100 top-0 start-0 zindex-9999'>
      <div style={{ width: "{dynamic}-%", height: "3px", background: "red" }} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>
);
