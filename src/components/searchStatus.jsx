import React from "react"

export default function SearchStatus({ length }) {
    
    const renderPhrase = (number) => {
        const lastNum = Number(number.toString().slice(-1))
        if ((number > 4 && number < 15) || (lastNum === 1)) return "человек тусанет"
        if ([2,3,4].indexOf(lastNum)>=0) return "человека тусанёт"
        return "человек тусанет"
    }

    return (
        <h2><span className={"badge m-1 bg-"+(length>0 
            ? "primary"
            : "warning")}
        >
            {length>0 
            ? `${length} ${renderPhrase(length)} с тобой сегодня`
            : `Пока что не удалось найти новых людей`}
        </span></h2>
    )
}