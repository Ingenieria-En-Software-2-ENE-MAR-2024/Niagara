import React from "react";
import Login from "../components/login";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-tertiary">
        {/* header */}
        <Login />
         {/* footer */}
    </div>
  );
};

export default LoginPage;