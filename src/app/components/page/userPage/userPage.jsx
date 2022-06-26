import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import api from "../../../api"
import QualitiesList from "../../ui/qualities/qualitiesList"

const UserPage = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data))
    })
    const handleAllUsers = () => {
        history.push("/users")
    }
    return (
        <>
            {user
                ? (
                    <>
                        <h1>{user.name}</h1>
                        <h2>Profession: {user.profession.name}</h2>
                        <QualitiesList qualities={user.qualities} />
                        <p>Completed meetings: {user.completedMeetings}</p>
                        <h2>Rate: {user.rate}</h2>
                        <button onClick={() => (handleAllUsers())}>All users</button>
                    </>
                )
                : "loading..."
            }
        </>
    )
}

export default UserPage

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}
