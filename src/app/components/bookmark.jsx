import React from "react"
import PropTypes from "prop-types"

export default function Bookmark({ status, ...rest }) {
    return (
        <button className="btn" {...rest}>
            <i
                className={`bi bi-${
                    status ? "bookmark-heart-fill" : "bookmark-plus"
                }`}
            />
        </button>
    )
}

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
}
