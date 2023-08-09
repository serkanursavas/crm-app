import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import PaginationLinks from "../components/PaginationLinks";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState();
    const [meta, setMeta] = useState();
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const onPageClick = (link) => {
        getUsers(link.url);
    };

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${u.id}`).then(() => {
            setNotification("User succesfully deleted");
            getUsers();
        });
    };

    const getUsers = (url) => {
        url = url || "/users";
        setLoading(true);
        axiosClient
            .get(url)
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
                setMeta(data.meta);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="flex items-center justify-end">
                <Link to="/users/new" className="btn-add">
                    Add new user
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={`/users/${u.id}`}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) => onDelete(u)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <PaginationLinks meta={meta} onPageClick={onPageClick} />
        </div>
    );
}

export default Users;
