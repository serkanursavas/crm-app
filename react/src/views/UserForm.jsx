import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function UserForm() {
    const { id } = useParams();

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        useEffect(() => {
            setLoading(true);

            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {id && <h1>Update User: {user.name}</h1>}
            {!id && <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    name: e.currentTarget.value,
                                })
                            }
                            placeholder="Name"
                            value={user.name}
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    email: e.currentTarget.value,
                                })
                            }
                            placeholder="Email"
                            value={user.email}
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.currentTarget.value,
                                })
                            }
                            placeholder="Password"
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation:
                                        e.currentTarget.value,
                                })
                            }
                            placeholder="Password Confirmation"
                        />
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
