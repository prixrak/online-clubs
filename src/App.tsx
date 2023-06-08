import { AuthProtectedRoute } from "@components/AuthProtectedRoute";
import { HomeRedirect } from "@components/HomeRedirect";
import { paths } from "@constants/paths";
import { MainPage } from "@pages/MainPage";
import { SecondPage } from "@pages/SecondPage";
import { TopicPage } from "@pages/TopicPage";
import { getAuth } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import {
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
  useInitFirestore,
} from "reactfire";
import { initializeFirestore } from "firebase/firestore";
import "normalize.css";
import { LoginPage } from "@pages/LoginPage";
import { getStorage } from "firebase/storage";
import { Suspense } from "react";
import { MessagesPage } from "@pages/MessagesPage";
import { FilesPage } from "@pages/FilesPage";

const App = () => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    return db;
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        <StorageProvider sdk={getStorage(app)}>
          <Routes>
            <Route path='*' element={<HomeRedirect />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route element={<AuthProtectedRoute />}>
              <Route path={paths.home} element={<MainPage />} />
              <Route path={`${paths.club}/:clubId`} element={<SecondPage />}>
                <Route path={`${paths.topic}/:topicId`} element={<TopicPage />}>
                  <Route path={paths.messages} element={<MessagesPage />} />
                  <Route path={paths.files} element={<FilesPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </StorageProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
};

export default App;
