import React, { useEffect, useState } from "react";

import { UserCircleIcon } from "@heroicons/react/outline";

import axiosClient from "../axios-client";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
    const [data, setData] = useState();

    useEffect(() => {
        axiosClient.get("/dashboard").then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
                title="Latest User"
                className="order-3 row-span-2 lg:order-1"
                style={{ animationDelay: "0.2s" }}
            >
                {data && (
                    <div>
                        <UserCircleIcon className="w-32 h-32 m-auto" />
                        <h3 className="mb-3 text-xl font-bold">
                            {data.latestUser.name}
                        </h3>
                        <div className="flex justify-between mb-1 text-sm">
                            <div>Created Date:</div>
                            <div>{data.latestUser.created_at}</div>
                        </div>
                        <div className="flex justify-between mb-1 text-sm">
                            <div>Email:</div>
                            <div>{data.latestUser.email}</div>
                        </div>
                    </div>
                )}
            </DashboardCard>
            <DashboardCard
                title="Total User"
                className="order-1 lg:order-2"
                style={{ animationDelay: "0.1s" }}
            >
                <div className="flex items-center justify-center flex-1 pb-4 font-semibold text-8xl">
                    {data?.totalUser}
                </div>
            </DashboardCard>
            <DashboardCard
                title="Latest Updated Users"
                className="order-4 row-span-2 lg:order-3"
                style={{ animationDelay: "0.3s" }}
            >
                {data && (
                    <div className="text-left">
                        {data.latestUserUpdated.map((user, index) => {
                            return (
                                <div key={index}>
                                    <a
                                        href="#"
                                        className="block p-2 hover:bg-gray-100/90"
                                    >
                                        <div className="font-semibold">
                                            {user.name}
                                        </div>
                                        <small>
                                            Updated at:{" "}
                                            <i className="font-semibold">
                                                {user.updated_at}
                                            </i>
                                        </small>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!data && (
                    <div className="py-16 text-center text-gray-600">
                        There is no updated users yet
                    </div>
                )}
            </DashboardCard>
        </div>
    );
}

export default Dashboard;
