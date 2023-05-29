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

const App = () => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    return db;
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Routes>
        <Route
          element={
            <AuthProvider sdk={auth}>
              <AuthProtectedRoute />
            </AuthProvider>
          }>
          <Route path={paths.home} element={<MainPage />} />
          <Route path={paths.second} element={<SecondPage />} />
          <Route path={`${paths.club}/:id`} element={<SecondPage />}>
            <Route path={`${paths.topic}/:topicId`} element={<TopicPage />} />
          </Route>
        </Route>
        <Route path='*' element={<HomeRedirect />} />
      </Routes>
    </FirestoreProvider>
  );
};

export default App;
