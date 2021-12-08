import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-bootstrap'



const Select = ({ custumClass, placeholder, options, getSelectedValue, isReq }) => {
    const [selectValue, setSelectValue] = useState("")

    const setValue = (e) => {
        setSelectValue(e.target.value);
        getSelectedValue(e.target.value);
    }

    useEffect(() => {

    }, [])

    return (
        <Form.Select className={custumClass} value={selectValue} onChange={setValue} required={isReq}>
            <option selected value="">{placeholder}</option>
            {
                options.map((optionList, index) => (
                    <option key={index} value={optionList.name}>{optionList.name}</option>
                ))
            }
        </Form.Select>
    )
}

Select.propTypes = {
    placeholder: propTypes.string.isRequired,
}
Select.defaultProps = {
    custumClass: "select",
    options: [],
    isReq: false
}

export default Select
