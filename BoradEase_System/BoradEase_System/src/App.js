import { useEffect, useState } from 'react';
import './App.css';
import LoadingPage from './component/frontend/loading/LoadingPage';
import Main from './component/frontend/main/Main';
import RegisterPage from './component/auth/register/RegisterPage';
import { Route, Routes, Redirect, Navigate } from 'react-router-dom';
import LoginPage from './component/auth/login/LoginPage';
import AdminMasterLayout from './component/admin/master-layout/AdminMasterLayout';
import AdminMessage from './component/admin/layout/messages/AdminMessage';
import routes from './component/admin/route/routes';
import PrivateRoutes from './component/protected/PrivateRoutes';

export const BASE_URL = 'http://localhost:8000'


function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }, [])

  return (
    <div className="App">
      <>
        <div className="App">
          {
            loading ? (
              <LoadingPage />
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/new-user" element={<RegisterPage />} />


                  {/*Private Route */}
                  <Route element={<PrivateRoutes />}>
                    <Route path="/auth" element={<AdminMasterLayout />}>
                      {routes
                        .filter(route => route.component)
                        .map(({ path, component: Component }) => (
                          <Route
                            key={path}
                            path={path}
                            element={<Component />}
                          />
                        )
                        )}
                      <Route index element={<Navigate to="/auth/dashboard" />} />
                    </Route>
                  </Route>

                </Routes>
              </>
            )
          }
        </div>
      </>
    </div>
  );
}

export default App;
