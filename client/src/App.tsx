import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { useAuth } from "./hooks/useAuth";

const FullPageLoader: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <svg
      className="animate-spin h-16 w-16 text-indigo-600 mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="text-xl font-semibold text-gray-700">
      Loading application...
    </p>
  </div>
);

const AppContent: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoader />;
  }

  // NavLink için aktif stil
  const activeClassName = "bg-indigo-700 text-white";
  const inactiveClassName =
    "text-indigo-100 hover:bg-indigo-500 hover:text-white";

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-white font-bold text-xl">AuthApp</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClassName : inactiveClassName
                      } px-3 py-2 rounded-md text-sm font-medium`
                    }
                  >
                    Home
                  </NavLink>
                  {user && (
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `${
                          isActive ? activeClassName : inactiveClassName
                        } px-3 py-2 rounded-md text-sm font-medium`
                      }
                    >
                      Dashboard
                    </NavLink>
                  )}
                  {/* {user && user.roles.includes('admin') && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`
                      }
                    >
                      Admin Panel
                    </NavLink>
                  )} */}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="text-indigo-100 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="ml-4 text-indigo-100 bg-indigo-500 hover:bg-indigo-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className="ml-4 bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded-md text-sm focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? activeClassName : inactiveClassName
                } block px-3 py-2 rounded-md text-base font-medium`
              }
            >
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? activeClassName : inactiveClassName
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
              >
                Dashboard
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive ? activeClassName : inactiveClassName
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
              >
                Login
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${
                    isActive ? activeClassName : inactiveClassName
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
              >
                Register
              </NavLink>
            )}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-indigo-700">
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="py-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}></Route>
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
