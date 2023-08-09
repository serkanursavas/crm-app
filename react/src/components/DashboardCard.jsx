import React from "react";

export default function DashboardCard({
    title,
    children,
    style = "",
    className = "",
}) {
    return (
        <div
            className={
                "bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down " +
                className
            }
            style={style}
        >
            {title && (
                <h3 className="pb-2 mb-4 text-2xl font-semibold border-b">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
