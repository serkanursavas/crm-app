import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/404.svg";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img
                src={errorImg}
                alt="Not Found"
                className="w-[32rem] h-[32rem]"
            />
            <h1 className="mt-4 text-2xl font-semibold">Page Not Found</h1>
            <p className="mt-2 text-gray-500">
                The page you're looking for doesn't exist.
            </p>
            <Link to="/" className="mt-4 text-blue-500 hover:underline">
                Go back to home
            </Link>
        </div>
    );
};

export default NotFound;
