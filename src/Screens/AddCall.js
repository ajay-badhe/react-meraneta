import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import Select from '../Components/Select'
import Sidebar from '../Components/Sidebar'
import { ASSEMBLIES_URL } from '../constants/assembies'
import axios from 'axios'
import { CREATE_CALL } from '../constants/callList'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const AddCall = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState();
    const [assembliesList, setAssembliesList] = useState([]);
    const [assemblies, setAssemblies] = useState('')
    const [priority, setPriority] = useState('')

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [date, setDate] = useState('')
    const [gender, setGender] = useState('')


    const genderHadler = (e) => {
        setGender(e.target.value);

    }

    const getToggleData = (toggle) => {
        setShowMenu(toggle)
    }

    const getPriority = (data) => {
        setPriority(data)
    }
    const getAssemblies = (data) => {
        setAssemblies(data)
    }


    const token = JSON.parse(localStorage.getItem('authToken'))
    const PriorityList = [{ name: 'High' }, { name: 'Medium' }, { name: 'Low' }]


    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {

            e.stopPropagation();
        }

        setValidated(true);
        const body = {
            "callFrom": {
                "addressFields": {},
                "extraFields": {},
                "gender": gender,
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "phone": mobile,
                "cast": null,
                "subcast": null,
                "office": 1
            },
            "isDirectEntry": true,
            "date": date,
            "priority": priority,
            "cityType": "CITY"
        }
        console.log(body)
        axios.post(CREATE_CALL, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            navigate("/call")
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get(ASSEMBLIES_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setAssembliesList(response.data)

            }).catch(error => {
                console.log({ error })
            })

    }, [])

    return (
        <div className={showMenu ? "toggle" : " "}>
            <Header getToggle={getToggleData} />
            <Sidebar />
            <div className="Layout">
                <div className="w-100 p-2">
                    <Card body className="mt-3">
                        <Form onSubmit={submitHandler} noValidate validated={validated} >
                            <h4>Add Call</h4>
                            <Row>
                                <Form.Group as={Col} md="4" controlId="validationCustom01" className="my-3">
                                    <label>Date</label>
                                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please select date
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom02" className="my-3">
                                    <label>Priority</label>
                                    <Select getSelectedValue={getPriority} placeholder={'Select Priority'} options={PriorityList} isReq={true} />
                                    <Form.Control.Feedback type="invalid">
                                        Please select Priority
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom03" className="my-3">
                                    <label>Note</label>
                                    <textarea placeholder="Note">

                                    </textarea>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom04" className="my-3">
                                    <label>Assembly</label>
                                    <Select getSelectedValue={getAssemblies} placeholder={'Select Assembly'} options={assembliesList} isReq={false} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom01" className="my-3">
                                    <label>First Name</label>
                                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom05" className="my-3">
                                    <label>Middle Name</label>
                                    <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom06" className="my-3">
                                    <label>Last Name</label>
                                    <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter last name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom07" className="my-3">
                                    <label>Mobile Number</label>
                                    <Form.Control type="number" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter mobile number
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom08" className="my-3">
                                    <label>Gender</label>
                                    <div className="d-flex" onChange={genderHadler} >
                                        <Form.Check type="radio" name="gender" required value={"Male"} id="male" /> &nbsp; &nbsp; <label htmlFor="male">Male</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Form.Check type="radio" name="gender" required value={"Female"} id="Female" /> &nbsp; &nbsp; <label htmlFor="Female">Female</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Form.Check type="radio" name="gender" required value={"Other"} id="other" /> &nbsp; &nbsp; <label htmlFor="other">Other</label>
                                        <Form.Control.Feedback type="invalid">
                                            Please select gender
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Col md={5} className="mt-4">
                                    <Row>
                                        <Col md={6} >
                                            <button className="btn btn-danger">
                                                Submit
                                            </button>
                                            <Link to={'/call'} className="btn btn-secondary ms-3">
                                                Cancel
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}


export default AddCall
