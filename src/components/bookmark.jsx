import React from "react"



export default function Bookmark({ status, ...rest }) {
    return (
        <button className="btn" {...rest}>
            <i className={`bi bi-${status ? "bookmark-heart-fill" : "bookmark-plus"}`} />
        </button>
    )
}

