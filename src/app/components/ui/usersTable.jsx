import React from "react"
import PropTypes from "prop-types"

import Bookmark from "../common/bookmark"
import Qualities from "./qualities"
import Table from "../common/table"

import { Link } from "react-router-dom"

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: user => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: user => (
                <Qualities qualities={user.qualities} />
            )
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Кол-во встреч" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: user => (
                <Bookmark
                    onClick={() => onToggleBookmark(user._id)}
                    status={user.bookmark}
                />
            )
        },
        delete: {
            component: user => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                Delete
                </button>
            )
        }
    }
    return (
        <Table onSort={ onSort } selectedSort={ selectedSort } columns={ columns } data={ users } />
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UsersTable
