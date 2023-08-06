import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();

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

        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    // Show notification
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.response;

                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    // show notifi
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.response;

                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {id && (
                <h1>
                    Update User: {user.name} {user.password}
                </h1>
            )}
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
                            type="email"
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
                            type="password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.currentTarget.value,
                                })
                            }
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation:
                                        e.currentTarget.value,
                                })
                            }
                            placeholder="Password Confirmation"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
