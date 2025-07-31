import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { PageLoading } from "@/components/PageLoading";

const ProtectedRoute = React.lazy(() => import("@/components/ProtectedRoute"));
const Layout = React.lazy(() => import("@/components/Layout"));
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));
const Tasks = React.lazy(() => import("@/pages/Tasks"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            <React.Suspense fallback={<PageLoading />}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path="register"
          element={
            <React.Suspense fallback={<PageLoading />}>
              <Register />
            </React.Suspense>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route
              path="tasks"
              element={
                <React.Suspense fallback={<PageLoading />}>
                  <Tasks />
                </React.Suspense>
              }
            />
            <Route
              path="*"
              element={
                <React.Suspense fallback={<PageLoading />}>
                  <NotFound />
                </React.Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
