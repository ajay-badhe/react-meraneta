import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap'

const CommonForm = ({ getFormName, RadioName, getFormMiddleName, getFormLastName, getFormMobile, getFormGender }) => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')


    const genderHadler = (e) => {
        setGender(e.target.value);
        getFormGender(e.target.value)
    }

    const getfirstName = (e) => {
        setFirstName(e.target.value)
        getFormName(e.target.value)
    }
    const getMiddleName = (e) => {
        setMiddleName(e.target.value)
        getFormMiddleName(e.target.value)
    }
    const getLastName = (e) => {
        setLastName(e.target.value)
        getFormLastName(e.target.value)
    }

    const getMobile = (e) => {
        setMobile(e.target.value)
        getFormMobile(e.target.value)
    }

    return (
        <>

            <Form.Group as={Col} md="4" className="my-3">
                <label>First Name</label>
                <Form.Control type="text" placeholder="First Name" value={firstName} onChange={getfirstName} />
            </Form.Group>
            <Form.Group as={Col} md="4" className="my-3">
                <label>Middle Name</label>
                <input type="text" placeholder="Middle Name" value={middleName} onChange={getMiddleName} />
            </Form.Group>
            <Form.Group as={Col} md="4" className="my-3">
                <label>Last Name</label>
                <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={getLastName} />
            </Form.Group>
            <Form.Group as={Col} md="4" className="my-3">
                <label>Mobile Number</label>
                <Form.Control type="number" placeholder="Mobile Number" value={mobile} onChange={getMobile} />
            </Form.Group>
            <Form.Group as={Col} md="4" className="my-3">
                <label>Gender</label>
                <div className="d-flex" onChange={genderHadler} >
                    <Form.Check type="radio" name={RadioName} value={"Male"} id={"male" + RadioName} /> &nbsp; &nbsp; <label htmlFor={"male" + RadioName}>Male</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Check type="radio" name={RadioName} value={"Female"} id={"female" + RadioName} /> &nbsp; &nbsp; <label htmlFor={"female" + RadioName}>Female</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Check type="radio" name={RadioName} value={"Other"} id={"other" + RadioName} /> &nbsp; &nbsp; <label htmlFor={"other" + RadioName}>Other</label>
                </div>
            </Form.Group>
        </>
    )
}

export default CommonForm
