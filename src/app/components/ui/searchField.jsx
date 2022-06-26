import React from "react"
import PropTypes from "prop-types"

const SearchField = ({ value, onChange }) => {
    return (
        <input type="text" className="form-control" placeholder="Search..." value={value} onChange={onChange} />
    )
}

SearchField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SearchField
