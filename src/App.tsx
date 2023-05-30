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
  useFirebaseApp,
  useInitFirestore,
} from "reactfire";
import { initializeFirestore } from "firebase/firestore";
import "normalize.css";
import { LoginPage } from "@pages/LoginPage";

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
        <Routes>
          <Route path='*' element={<HomeRedirect />} />
          <Route path={paths.login} element={<LoginPage />} />
          <Route element={<AuthProtectedRoute />}>
            <Route path={paths.home} element={<MainPage />} />
            <Route path={paths.second} element={<SecondPage />} />
            <Route path={`${paths.club}/:id`} element={<SecondPage />}>
              <Route path={`${paths.topic}/:topicId`} element={<TopicPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </FirestoreProvider>
  );
};

export default App;
