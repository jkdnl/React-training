import React, { useState, useEffect } from "react"
// import PropTypes from "prop-types"
import _ from "lodash"

import SearchStatus from "../../ui/searchStatus"
import SearchField from "../../ui/searchField"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import GroupList from "../../common/groupList"
import api from "../../../api"
import UsersTable from "../../ui/usersTable"

export default function usersListPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
    const [users, setUsers] = useState()
    const [search, setSearch] = useState("")

    const handleSearchChange = ({ target }) => {
        setSearch(target.value)
        setSelectedProf()
    }
    useEffect(() => {
        api.users.fetchAll().then(data => {
            setUsers(data)
        })
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data)
        })
    })
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, search])

    const pageSize = 4

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item)
        setSearch("")
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    if (users) {
        const filteredUsers = search
            ? users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
            : selectedProf
                ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : users

        const handleSort = (item) => {
            setSortBy(item)
        }

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && (
                    <>
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                items={professions}
                                onItemSelect={handleProfessionsSelect}
                                selectedProf={selectedProf}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </div>
                    </>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchField
                        onChange={handleSearchChange}
                        value={search}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return "loading..."
}

// usersListPage.propTypes = {
//     users: PropTypes.array
// }
