import { render } from "@testing-library/react";
import React, { useState } from "react";
import api from "../api"

export default function Users() {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id!==userId))
    }
    const renderPhrase = (number) => {
        const lastNum = Number(number.toString().slice(-1))
        if ((number > 4 && number < 15) || (lastNum === 1)) return "человек тусанет"
        if ([2,3,4].indexOf(lastNum)>=0) return "человека тусанут"
        return "человек тусанет"
    }

    return (
        <>
            {/* {renderPhrase(users.length)} */}
            <h2><span className={"badge m-1 bg-"+(users.length>0 
                ? "primary"
                : "warning")}
            >
                {users.length>0 
                ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
                : `Пока что не удалось найти новых людей`}
            </span></h2>
            {users.length > 0 &&
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встреч</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.qualities.map(quality => (
                                    <span key={quality._id} className={`badge bg-${quality.color} m-1`}>{quality.name}</span>
                                ))}</td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate} / 5</td>
                                <td>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </table>}
        </>
    )
}