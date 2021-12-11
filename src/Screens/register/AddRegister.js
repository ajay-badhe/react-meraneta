import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Select from '../../Components/Select'
import axios from 'axios'
import { LATTER_TYPES } from '../../constants/letterType'
import { CREATE_REGISTER } from '../../constants/register'
import CommonForm from './CommonForm'
import { useNavigate, useParams } from "react-router-dom";
import { DEPARTMENT_LIST } from '../../constants/department'



const AddRegister = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState();
    // main form
    const [latterTypeList, SetLetterTypeList] = useState([]);
    const [latterType, SetLetterType] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("")
    const [fileNo, setFileNo] = useState("")
    const [note, setNote] = useState("")
    const [Priority, setPriority] = useState("")
    const [documentType, setSelectDocumentType] = useState("Inward")
    const [checked, setChecked] = useState(true);

    // second form
    const [docFormName, setDocFromName] = useState('')
    const [docFormMiddleName, setDocFromMiddleName] = useState('')
    const [docFormLastName, setDocFromLastName] = useState('')
    const [docFormMobile, setDocFromMobile] = useState('')
    const [docFormGender, setDocFromGender] = useState('')

    // third form
    const [deliveryFormName, setDeliveryFromName] = useState('')
    const [deliveryFormMiddleName, setDeliveryFromMiddleName] = useState('')
    const [deliveryFormLastName, setDeliveryFromLastName] = useState('')
    const [deliveryFormMobile, setDeliveryFromMobile] = useState('')
    const [deliveryFormGender, setDeliveryFromGender] = useState('')

    const { id } = useParams();
    console.log(id)

    const changeType = () => {
        setChecked(!checked)
        if (checked) {
            setSelectDocumentType("Outward")
        }
        else {
            setSelectDocumentType("Inward")

        }
    }

    const token = JSON.parse(localStorage.getItem('authToken'))
    const PriorityList = [{ name: 'VIP' }, { name: 'Important' }, { name: 'Regular' }]
    // Toggle menu
    const getToggleData = (toggle) => {
        setShowMenu(toggle)
    }

    // get Document form detail
    const getDocumentFormName = (name) => {
        setDocFromName(name)
    }
    const getDocumentFormMiddleName = (name) => {
        setDocFromMiddleName(name)
    }
    const getDocumentFormLastName = (name) => {
        setDocFromLastName(name)
    }
    const getDocumentFormMobile = (name) => {
        setDocFromMobile(name)
    }
    const getDocumentFormGender = (name) => {
        setDocFromGender(name)
    }

    // get Delivery form detail
    const getDeliveryFormName = (name) => {
        setDeliveryFromName(name)
    }
    const getDeliveryFormMiddleName = (name) => {
        setDeliveryFromMiddleName(name)
    }
    const getDeliveryFormLastName = (name) => {
        setDeliveryFromLastName(name)
    }
    const getDeliveryFormMobile = (name) => {
        setDeliveryFromMobile(name)
    }
    const getDeliveryFormGender = (name) => {
        setDeliveryFromGender(name)
    }

    // get letter type
    const getLetterType = (data) => {
        SetLetterType(data)
    }

    // get department type
    const getDepartment = (data) => {
        setDepartment(data)
    }

    // get department type
    const getPriority = (data) => {
        setPriority(data)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let docTypePayload = {
            "documentFor": {
                "addressFields": {},
                "extraFields": {},
                "firstName": deliveryFormName,
                "gender": deliveryFormGender,
                "lastName": deliveryFormLastName,
                "phone": deliveryFormMobile,
                "office": 1
            },
            "receiveBy": {
                "addressFields": {},
                "extraFields": {},
                "firstName": docFormName,
                "gender": docFormGender,
                "lastName": docFormLastName,
                "phone": docFormMobile,
                "office": 1
            }
        }

        const body = {
            "isDirectEntry": true,
            "entryType": documentType,
            "letterType": {
                "id": 1,
                "name": latterType,
                "prefix": null,
                "template": null,
                "header": null,
                "footer": null,
                "createdDate": "2019-12-03T07:07:12.672Z",
                "updatedDate": "2019-12-03T07:07:12.672Z",
                "createdBy": 0,
                "updatedBy": 0
            },
            "department": {
                "id": 1,
                "name": department,
                "createdDate": "2019-12-03T07:07:12.672Z",
                "updatedDate": "2019-12-03T07:07:12.672Z",
                "createdBy": 0,
                "updatedBy": 0
            },
            "letterReleaseDate": date,
            "file_number": fileNo,
            "comments": note,
            ...docTypePayload,
            "priority": Priority,
            "cityType": null
        }
        axios.post(CREATE_REGISTER, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                navigate('/register')

            }).catch(error => {
                console.log({ error })
            })
    }

    const getApi = (URL, SETLIST) => {
        axios.get(URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                SETLIST(response.data)

            }).catch(error => {
                console.log({ error })
            })
    }

    useEffect(() => {

        getApi(LATTER_TYPES, SetLetterTypeList)
        getApi(DEPARTMENT_LIST, setDepartmentList)
    }, [])
    return (
        <div className={showMenu ? "toggle" : " "}>
            <Header getToggle={getToggleData} />
            <Sidebar />
            <div className="Layout">
                <div className="w-100 p-2">
                    <Card body className="mt-3">
                        <Form onSubmit={submitHandler}  >
                            <h4>Add Register {id}</h4>
                            <Row>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Document Type</label>
                                    <div className="switch">
                                        <div className="switch-button">
                                            <input className="switch-button-checkbox" type="checkbox" defaultChecked={checked}
                                                onChange={changeType}></input>
                                            <label className="switch-button-label mb-0" ><span className="switch-button-label-span">Outward</span></label>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Latter Release Date</label>
                                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>LetterType</label>
                                    <Select getSelectedValue={getLetterType} placeholder={'Select Letter Type'} options={latterTypeList} isReq={false} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Department</label>
                                    <Select getSelectedValue={getDepartment} placeholder={'Select Letter Type'} options={departmentList} isReq={false} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>File Type</label>
                                    <input type="text" placeholder="Enter File Type" value={fileNo} onChange={(e) => setFileNo(e.target.value)} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Priority</label>
                                    <Select getSelectedValue={getPriority} placeholder={'Select Priority'} options={PriorityList} isReq={true} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Note</label>
                                    <textarea placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)}>

                                    </textarea>
                                </Form.Group>

                            </Row>
                            <hr />
                            <label>
                                <h5>Document {documentType === "Inward" ? "From" : "For"}</h5>
                            </label>
                            <Row>
                                <CommonForm
                                    getFormName={getDocumentFormName}
                                    getFormMiddleName={getDocumentFormMiddleName}
                                    getFormLastName={getDocumentFormLastName}
                                    getFormMobile={getDocumentFormMobile}
                                    getFormGender={getDocumentFormGender}
                                    RadioName={"gender"} />
                            </Row>

                            <hr />
                            <label>
                                <h5>{documentType === "Inward" ? "Deliverd By" : "Received By"}</h5>
                            </label>
                            <Row>
                                <CommonForm
                                    getFormName={getDeliveryFormName}
                                    getFormMiddleName={getDeliveryFormMiddleName}
                                    getFormLastName={getDeliveryFormLastName}
                                    getFormMobile={getDeliveryFormMobile}
                                    getFormGender={getDeliveryFormGender}
                                    RadioName={"gender2"} />
                            </Row>
                            <Row>
                                <Col md={5} className="mt-4">
                                    <Row>
                                        <Col md={6} >
                                            <button type="submit" className="btn btn-danger">
                                                Submit
                                            </button>
                                            <Link to={'/register/list'} className="btn btn-secondary ms-3">
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

export default AddRegister
