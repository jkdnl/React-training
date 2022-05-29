import React from "react"



export default function Quality({ color, name, _id }) {
    return (
        <span className={`badge bg-${color} m-1`}>{name}</span>
    )
}
