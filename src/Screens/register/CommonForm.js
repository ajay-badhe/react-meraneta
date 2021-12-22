import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Select from '../../Components/Select'

const CommonForm = (
    {
        getFormName,
        RadioName,
        getFormMiddleName,
        getFormLastName,
        getFormMobile,
        getFormGender,
        updateCommanForm,
        getFormDOB,
        getFormAge,
        getFormOccupation,
        getFormAddhar,
        getFormPan,
        getFormVoter,
        getFormEducation,
        getFormRationCard
    }) => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [age, setAge] = useState('')
    const [occupation, setOccupation] = useState('')
    const [addhar, setAddhar] = useState('')
    const [pan, setPan] = useState('')
    const [voter, setVoter] = useState('')
    const [rationCard, setRationCard] = useState('')
    const [education, setEducation] = useState('')


    const educationList = [{ name: '10th Pass' }, { name: '12th Pass' }, { name: 'Graduate' }, { name: 'Post Graduate' }]
    const rationCardList = [{ name: 'No Card' }, { name: 'Orange' }, { name: 'White' }, { name: 'Yellow' }]

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

    const getDOB = (e) => {
        setDob(e.target.value)
        getFormDOB(e.target.value)
        setAge('0')
    }
    const getAge = (e) => {
        setAge(e.target.value)
        getFormAge(e.target.value)
    }
    const getOccupation = (e) => {
        setOccupation(e.target.value)
        getFormOccupation(e.target.value)
        console.log(e.target.value);
    }
    const getAddhar = (e) => {
        setAddhar(e.target.value)
        getFormAddhar(e.target.value)
    }
    const getPan = (e) => {
        setPan(e.target.value)
        getFormPan(e.target.value)
    }
    const getVoter = (e) => {
        setVoter(e.target.value)
        getFormVoter(e.target.value)
    }

    const getRationCard = (data) => {
        getFormRationCard(data);
    }
    const getEducation = (data) => {
        getFormEducation(data)
    }

    useEffect(() => {
        if (updateCommanForm) {
            setFirstName(updateCommanForm.firstName)
            setMiddleName(updateCommanForm.middleName)
            setLastName(updateCommanForm.lastName)
            setMobile(updateCommanForm.phone)
            setGender(updateCommanForm.gender)
            setDob(moment(updateCommanForm.dob).format('YYYY-MM-DD'))
            console.log(updateCommanForm.dob)
            setOccupation(updateCommanForm.occupation)
            setAddhar(updateCommanForm.aadhar)
            setPan(updateCommanForm.pancard)
            setVoter(updateCommanForm.voterID)
            setRationCard(updateCommanForm.rationCard)
            setEducation(updateCommanForm.education)
        }
    }, [updateCommanForm])

    console.log("Common form dob", dob)
    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Form.Group as={Col} md="4" className="my-3">
                            <label>First Name<sup>*</sup></label>
                            <Form.Control type="text" placeholder="First Name" value={firstName} onChange={getfirstName} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="my-3">
                            <label>Middle Name</label>
                            <input type="text" placeholder="Middle Name" value={middleName} onChange={getMiddleName} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="my-3">
                            <label>Last Name<sup>*</sup></label>
                            <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={getLastName} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="my-3">
                            <label>Mobile Number<sup>*</sup></label>
                            <Form.Control type="number" placeholder="Mobile Number" value={mobile} onChange={getMobile} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="my-3">
                            <label>Gender<sup>*</sup></label>
                            <div className="d-flex"  >
                                <Form.Check type="radio" name={RadioName} checked={gender === "MALE"} onChange={genderHadler} value={"MALE"} id={"male" + RadioName} /> &nbsp; &nbsp; <label htmlFor={"male" + RadioName}>Male</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Form.Check type="radio" name={RadioName} checked={gender === "FEMALE"} onChange={genderHadler} value={"FEMALE"} id={"female" + RadioName} /> &nbsp; &nbsp; <label htmlFor={"female" + RadioName}>Female</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Form.Check type="radio" name={RadioName} checked={gender === "OTHER"} onChange={genderHadler} value={"OTHER"} id={"other" + RadioName} /> &nbsp; &nbsp; <label htmlFor={"other" + RadioName}>Other</label>
                            </div>
                        </Form.Group>
                    </Row>
                </Col>
                <Col md={7}>
                    <fieldset>
                        <legend>Optional</legend>
                        <Row md={3} className="gy-2">
                            <Col>
                                <label>DOB</label>
                                <input type="date" value={dob} onChange={getDOB} />
                            </Col>
                            <Col>
                                <label>Age</label>
                                <input type="number" disabled={dob} value={age} onChange={getAge} />
                            </Col>
                            <Col>
                                <label>Education</label>
                                <Select getSelectedValue={getEducation} placeholder={'select education'} options={educationList} />
                            </Col>
                            <Col>
                                <label>Occupation</label>
                                <input type='text' placeholder='Enter Occupation' value={occupation} onChange={getOccupation} />
                            </Col>
                            <Col>
                                <label>Addhar</label>
                                <input type='text' placeholder='Enter Addhar' value={addhar} onChange={getAddhar} />
                            </Col>
                            <Col>
                                <label>Pan</label>
                                <input type='text' placeholder='Enter Pan' value={pan} onChange={getPan} />
                            </Col>
                            <Col>
                                <label>Voter</label>
                                <input type='text' placeholder='Enter voter' value={voter} onChange={getVoter} />
                            </Col>
                            <Col>
                                <label>Ration Card</label>
                                <Select getSelectedValue={getRationCard} placeholder={'Ration Card'} options={rationCardList} />
                            </Col>
                        </Row>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}

export default CommonForm
