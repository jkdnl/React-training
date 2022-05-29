import React from "react"

import Quality from "./quality"
import Bookmark from "./bookmark"

export default function User({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookmark,
}) {
    return (
        <tr>
            <td>{name}</td>
            <td>{qualities.map(quality => (
                <Quality key={quality._id} {...quality} />
            ))}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} / 5</td>
            <td>
                <Bookmark onClick={() => onToggleBookmark(_id)} status={bookmark}/>
            </td>
            <td> 
                <button 
                    className="btn btn-danger" 
                    onClick={() => onDelete(_id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

