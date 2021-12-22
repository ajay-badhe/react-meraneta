import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-bootstrap'



const Select = ({ custumClass, placeholder, options, getSelectedValue, isReq, updateValue }) => {
    const [selectValue, setSelectValue] = useState("")
    const [selectId, setSelectId] = useState("")

    const setValue = (e) => {
        setSelectValue(e.target.value);
        setSelectId(e.target.id);
        getSelectedValue(e.target.value, e.target[e.target.selectedIndex].id);
    }

    useEffect(() => {
        if (updateValue) {
            setSelectValue(updateValue, selectId)
        }
    }, [updateValue])
    return (
        <Form.Select className={custumClass} value={selectValue} onChange={setValue} required={isReq}>
            <option selected value="">{placeholder}</option>
            {
                options.map((optionList, index) => (
                    <option key={index} id={optionList.id} value={optionList.name}>{optionList.name}</option>
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
    isReq: false,
    updateValue: ''
}

export default Select
