import React from "react";
import Login from "../../components/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-tertiary">
        {/* header */}
        <Login />
         {/* footer */}
    </div>
  );
};