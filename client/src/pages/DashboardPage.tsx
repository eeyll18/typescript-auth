import React from "react";
import { useAuth } from "../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">
          Loading user data or not authenticated...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white font-bold text-xl">My App</span>
              </div>
            </div>
            <div className="md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <span className="text-indigo-200 mr-3">
                  Hello, {user.email}!
                </span>
                <button
                  onClick={logout}
                  className="ml-auto bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header> */}

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to your Dashboard
              </h2>
              <p className="text-gray-600 mb-2">
                This is a protected area. Only authenticated users can see this.
              </p>
              <div className="mt-4 p-4 bg-indigo-50 rounded-md">
                <h3 className="text-lg font-medium text-indigo-700">
                  User Information:
                </h3>
                <p className="text-indigo-600">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-indigo-600">
                  <strong>Roles:</strong> {user.roles.join(", ")}
                </p>
              </div>
              {/**/}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
