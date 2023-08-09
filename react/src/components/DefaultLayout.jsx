import React, { useEffect } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Button from "../components/Button";

function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        const pathSplit = path.toString().toUpperCase().split("/");
        return pathSplit;
    };

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div className="flex min-h-screen">
            <aside className="w-60 bg-[#5b08a7] p-4">
                <Link
                    to="/dashboard"
                    className="block py-[0.75rem] px-[1.5rem] rounded-md text-white no-underline transition-all duration-200 hover:bg-[rgba(0,0,0,0.2)]"
                >
                    Dashboard
                </Link>
                <Link
                    to="/users"
                    className="block py-[0.75rem] px-[1.5rem] rounded-md text-white no-underline transition-all duration-200 hover:bg-[rgba(0,0,0,0.2)]"
                >
                    Users
                </Link>
            </aside>
            <div className="flex-1">
                <header className="flex items-center justify-between h-20 px-12 py-8 bg-white shadow-xs">
                    <div>{getPageTitle()}</div>
                    <div>
                        {user.name}

                        <Button
                            onClick={onLogout}
                            className={
                                "no-underline color-[#212121] bg-[rgba(0,0,0,0.1)]  ml-4 transition-all duration-300 rounded-md py-[0.75rem] px-[1.5rem] hover:bg-[rgba(0,0,0,0.05)]"
                            }
                        >
                            Logout
                        </Button>
                    </div>
                </header>
                <main className="p-8">
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}

export default DefaultLayout;
