import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return <div>Users</div>;
}

export default Users;
