import React, { useEffect, useState } from "react";

import axiosClient from "../axios-client";

function Dashboard() {
    const [userCount, setUserCount] = useState();

    useEffect(() => {
        axiosClient.get("/dashboard").then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <div>
            <div className="card animated fadeInDown">
                Dashboard {userCount && <span>{userCount}</span>}
            </div>
        </div>
    );
}

export default Dashboard;
