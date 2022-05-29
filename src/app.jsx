import React, { useState } from "react"
import api from "../src/api"
import Users from "./components/users"
import SearchStatus from "./components/searchStatus"

export default function App() {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id!==userId))
    }

    const handleToggleBookmark = (userId) => {
        setUsers(
            users.map(user => {
                if (user._id === userId) {
                    console.log('k');
                    return {...user, bookmark: !user.bookmark} 
                }
                return user
            })
        )
    }

    return (
        <div>
            <SearchStatus length={users.length}/>
            <Users onDelete={handleDelete} onToggleBookmark={handleToggleBookmark} users={users} />
        </div>
    )
}