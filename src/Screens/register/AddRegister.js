import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Select from '../../Components/Select'
import axios from 'axios'
import { LATTER_TYPES } from '../../constants/letterType'
import { CREATE_REGISTER, CREATE_REGISTER_EDIT } from '../../constants/register'
import CommonForm from './CommonForm'
import { useNavigate, useParams } from "react-router-dom";
import { DEPARTMENT_LIST } from '../../constants/department'
import moment from 'moment'




const AddRegister = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState();
    const [loading, setLoading] = useState(true)
    // main form
    const [latterTypeList, SetLetterTypeList] = useState([]);
    const [latterType, SetLetterType] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("")
    const [fileNo, setFileNo] = useState("")
    const [note, setNote] = useState("")
    const [Priority, setPriority] = useState("")
    const [documentType, setSelectDocumentType] = useState("INWARD")
    const [checked, setChecked] = useState(false);
    const [updateList, setupdateList] = useState([]);
    const [updateDocumentCommanForm, setupdateDocumentCommanForm] = useState([]);
    const [updatedeliveryCommanForm, setupdatedeliveryCommanForm] = useState([]);
    const [TokenNo, setTokenNo] = useState();
    const [selectedId, setSelectId] = useState();
    // second form
    const [docFormName, setDocFromName] = useState('')
    const [docFormMiddleName, setDocFromMiddleName] = useState('')
    const [docFormLastName, setDocFromLastName] = useState('')
    const [docFormMobile, setDocFromMobile] = useState('')
    const [docFormGender, setDocFromGender] = useState('')
    const [docFormdob, setDocFromDOB] = useState('')
    const [docFormage, setDocFormAge] = useState('')
    const [docFormoccupation, setDocFromOccupation] = useState('')
    const [docFormaddhar, setDocFromAddhar] = useState('')
    const [docFormpan, setDocFormPan] = useState('')
    const [docFormvoter, setDocFromVoter] = useState('')
    const [docFormEducation, setDocFromEducation] = useState('')
    const [docFormRationCard, setDocFromRationCard] = useState('')

    // third form
    const [deliveryFormName, setDeliveryFromName] = useState('')
    const [deliveryFormMiddleName, setDeliveryFromMiddleName] = useState('')
    const [deliveryFormLastName, setDeliveryFromLastName] = useState('')
    const [deliveryFormMobile, setDeliveryFromMobile] = useState('')
    const [deliveryFormGender, setDeliveryFromGender] = useState('')
    const [deliveryFormdob, setDeliveryFromDOB] = useState('')
    const [deliveryFormage, setDeliveryFormAge] = useState('')
    const [deliveryFormoccupation, setDeliveryFromOccupation] = useState('')
    const [deliveryFormaddhar, setDeliveryFromAddhar] = useState('')
    const [deliveryFormpan, setDeliveryFormPan] = useState('')
    const [deliveryFormvoter, setDeliveryFromVoter] = useState('')
    const [deliveryFormEducation, setDeliveryFromEducation] = useState('')
    const [deliveryFormRationCard, setDeliveryFromRationCard] = useState('')

    const { id } = useParams();

    const changeType = () => {
        setChecked(!checked)
        if (checked) {
            setSelectDocumentType("INWARD")
            // setChecked(false)
        }
        else {
            setSelectDocumentType("OUTWARD")
            // setChecked(true)

        }
        console.log(documentType);
        console.log(checked)
    }
    // console.log(checked)


    const token = JSON.parse(localStorage.getItem('authToken'))
    const PriorityList = [{ name: 'VIP' }, { name: 'IMPORTANT' }, { name: 'REGULAR' }]
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

    const getDocumentFormDOB = (name) => {
        setDocFromDOB(name)
    }
    const getDocumentFormAge = (name) => {
        setDocFormAge(name)
    }
    const getDocumentFormOccupation = (name) => {
        setDocFromOccupation(name)
    }
    const getDocumentFormAddhar = (name) => {
        setDocFromAddhar(name)
    }
    const getDocumentFormPan = (name) => {
        setDocFormPan(name)
    }
    const getDocumentFormVoter = (name) => {
        setDocFromVoter(name)
    }
    const getDocumentRationCard = (name) => {
        setDocFromRationCard(name);
        console.log(name);
    }
    const getDocumentEducation = (name) => {
        setDocFromEducation(name);
        console.log(name);
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
    const getDeliveryFormDOB = (name) => {
        setDeliveryFromDOB(name)
    }
    const getDeliveryFormAge = (name) => {
        setDeliveryFormAge(name)
    }
    const getDeliveryFormOccupation = (name) => {
        setDeliveryFromOccupation(name)
    }
    const getDeliveryFormAddhar = (name) => {
        setDeliveryFromAddhar(name)
    }
    const getDeliveryFormPan = (name) => {
        setDeliveryFormPan(name)
    }
    const getDeliveryFormVoter = (name) => {
        setDeliveryFromVoter(name)
    }
    const getDeliveryEducation = (name) => {
        setDeliveryFromEducation(name);
        console.log(name);
    }
    const getDeliveryRationCard = (name) => {
        setDeliveryFromRationCard(name);
        console.log(name);
    }


    // get letter type
    const getLetterType = (data, id) => {
        SetLetterType(data)
        setSelectId(id)
    }

    // get department type
    const getDepartment = (data, id) => {
        setDepartment(data)
        setSelectId(id)
    }

    // get department type
    const getPriority = (data) => {
        setPriority(data)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        // update handler   
        if (id) {

            let body = {
                "id": 38,
                "tokenNumber": TokenNo,
                "cityType": null,
                "entryType": documentType,
                "priority": Priority,
                "file_number": fileNo,
                "comments": note,
                "letterReleaseDate": date,
                "letterType": {
                    "id": selectedId,
                    "name": latterType,
                },
                "receiveBy": {
                    "id": 193,
                    "uniqueId": "ABC000193",
                    "firstName": deliveryFormName,
                    "middleName": deliveryFormMiddleName,
                    "lastName": deliveryFormLastName,
                    "phone": deliveryFormMobile,
                    "gender": deliveryFormGender,
                    "occupation": deliveryFormoccupation,
                    "pancard": deliveryFormpan,
                    "aadhar": deliveryFormaddhar,
                    "rationCard": deliveryFormRationCard,
                    "voterID": deliveryFormvoter,
                    "dob": deliveryFormdob,
                    "education": deliveryFormEducation,
                },
                "documentFor": {
                    "id": 194,
                    "uniqueId": "ABC000194",
                    "firstName": docFormName,
                    "middleName": docFormMiddleName,
                    "lastName": docFormLastName,
                    "phone": docFormMobile,
                    "gender": docFormGender,
                    "occupation": docFormoccupation,
                    "pancard": docFormpan,
                    'aadhar:': docFormaddhar,
                    "rationCard": docFormRationCard,
                    "dob": docFormdob,
                    "voterID": docFormvoter,
                    "education": docFormEducation,
                },
                "prabhagArea": null,
                "department": {
                    "id": selectedId,
                    "name": department,
                }
            }
            console.log(body);
            axios.put(`${CREATE_REGISTER_EDIT}/${id}?join=assembly&join=gat_number&join=gan_number&join=gaon`, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,

                }
            })
                .then(response => {
                    navigate('/register/list')

                }).catch(error => {
                    console.log({ error })
                })
        }
        // create handler
        else {
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
                'recordStatus': "CREATED",
                "receiveBy": {
                    "addressFields": {},
                    "extraFields": {},
                    "firstName": deliveryFormName,
                    "middleName": deliveryFormMiddleName,
                    "gender": deliveryFormGender,
                    "lastName": deliveryFormLastName,
                    "phone": deliveryFormMobile,
                    "occupation": deliveryFormoccupation,
                    "office": 1,
                    "pancard": deliveryFormpan,
                    "aadhar": deliveryFormaddhar,
                    "rationCard": deliveryFormRationCard,
                    "voterID": deliveryFormvoter,
                    "dob": deliveryFormdob,
                    "education": deliveryFormEducation,
                },
                "documentFor": {
                    "addressFields": {},
                    "extraFields": {},
                    "firstName": docFormName,
                    "middleName": docFormMiddleName,
                    "gender": docFormGender,
                    "lastName": docFormLastName,
                    "phone": docFormMobile,
                    "occupation": docFormoccupation,
                    "office": 1,
                    "pancard": docFormpan,
                    'aadhar:': docFormaddhar,
                    "rationCard": docFormRationCard,
                    "dob": docFormdob,
                    "voterID": docFormvoter,
                    "education": docFormEducation,
                },
                "priority": Priority,
                "cityType": null
            }
            axios.post(CREATE_REGISTER, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    navigate('/register/list')

                }).catch(error => {
                    console.log({ error })
                })
        }
    }


    const getApi = (URL, SETLIST) => {
        axios.get(URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                SETLIST(response.data)
                setLoading(false)

            }).catch(error => {
                console.log({ error })
                setLoading(false)
            })
    }

    useEffect(() => {
        getApi(LATTER_TYPES, SetLetterTypeList)
        getApi(DEPARTMENT_LIST, setDepartmentList)
        getApi(CREATE_REGISTER_EDIT + '/' + id, setupdateList)
    }, []);



    useEffect(() => {
        if (id) {
            try {
                setDate(moment(updateList.letterReleaseDate).format('YYYY-MM-DD'))
                setNote(updateList.comments)
                setFileNo(updateList.file_number)
                setPriority(updateList.priority)
                SetLetterType(updateList.letterType?.name)
                setDepartment(updateList.department?.name)

                setupdateDocumentCommanForm(updateList.documentFor)
                setupdatedeliveryCommanForm(updateList.receiveBy)

                setDocFromName(updateList.documentFor.firstName)
                setDocFromMiddleName(updateList.documentFor.middleName)
                setDocFromLastName(updateList.documentFor.lastName)
                setDocFromMobile(updateList.documentFor.phone)
                setDocFromGender(updateList.documentFor.gender)
                setDocFromOccupation(updateList.documentFor.occupation)
                setDocFromAddhar(updateList.documentFor.aadhar)
                setDocFormPan(updateList.documentFor.pancard)
                setDocFromVoter(updateList.documentFor.voterID)
                setDocFromEducation(updateList.documentFor.education)
                setDocFromRationCard(updateList.documentFor.rationCard)
                setDocFromDOB(moment(updateList.documentFor.dob).format('YYYY-MM-DD'))

                setDeliveryFromName(updateList.receiveBy.firstName)
                setDeliveryFromMiddleName(updateList.receiveBy.middleName)
                setDeliveryFromLastName(updateList.receiveBy.lastName)
                setDeliveryFromMobile(updateList.receiveBy.phone)
                setDeliveryFromGender(updateList.receiveBy.gender)
                setDeliveryFromOccupation(updateList.receiveBy.occupation)
                setDeliveryFromAddhar(updateList.receiveBy.aadhar)
                setDeliveryFormPan(updateList.receiveBy.pancard)
                setDeliveryFromVoter(updateList.receiveBy.voterID)
                setDeliveryFromEducation(updateList.receiveBy.education)
                setDeliveryFromRationCard(updateList.receiveBy.rationCard)
                setDeliveryFromDOB(moment(updateList.receiveBy.dob).format('YYYY-MM-DD'))

                setTokenNo(updateList.tokenNumber)
                if (updateList.documentType === "OUTWARD") {
                    setChecked(true)
                } else {
                    setChecked(false)
                }

            } catch (error) {
                console.log(error)
            }

        }
    }, [updateList])

    return (
        <div className={showMenu ? "toggle" : " "}>
            {loading && <div className="spinner"><Spinner animation="border" /> </div>}
            <Header getToggle={getToggleData} />
            <Sidebar />
            <div className="Layout">
                <div className="w-100 p-2">
                    <Card body className="mt-3">
                        <Form onSubmit={submitHandler}>
                            {
                                !id ?
                                    <h4>Add Register</h4> :
                                    <h4>Edit Entry: {updateList.tokenNumber}</h4>
                            }
                            <Row>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Document Type</label>
                                    <div className="switch">
                                        <div className="switch-button">
                                            <input className="switch-button-checkbox" type="checkbox"
                                                onChange={changeType} checked={checked}></input>
                                            <label className="switch-button-label mb-0" ><span className="switch-button-label-span">Outward</span></label>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Latter Release Date</label>
                                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>LetterType<sup>*</sup></label>
                                    <Select updateValue={updateList?.letterType?.name} getSelectedValue={getLetterType} placeholder={'Select Letter Type'} options={latterTypeList} isReq={false} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Department</label>
                                    <Select updateValue={updateList?.department?.name} getSelectedValue={getDepartment} placeholder={'Select Letter Type'} options={departmentList} isReq={false} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>File Type</label>
                                    <input type="text" placeholder="Enter File Type" value={fileNo} onChange={(e) => setFileNo(e.target.value)} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Priority</label>
                                    <Select updateValue={updateList.priority} getSelectedValue={getPriority} placeholder={'Select Priority'} options={PriorityList} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="my-3">
                                    <label>Note</label>
                                    <textarea placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)}>

                                    </textarea>
                                </Form.Group>

                            </Row>
                            <hr />
                            <label>
                                <h5>Document {documentType != "INWARD" ? "From" : "For"}</h5>
                            </label>
                            <CommonForm
                                updateCommanForm={updateDocumentCommanForm}
                                getFormName={getDocumentFormName}
                                getFormMiddleName={getDocumentFormMiddleName}
                                getFormLastName={getDocumentFormLastName}
                                getFormMobile={getDocumentFormMobile}
                                getFormGender={getDocumentFormGender}
                                RadioName={"gender"}
                                getFormDOB={getDocumentFormDOB}
                                getFormAge={getDocumentFormAge}
                                getFormOccupation={getDocumentFormOccupation}
                                getFormAddhar={getDocumentFormAddhar}
                                getFormPan={getDocumentFormPan}
                                getFormVoter={getDocumentFormVoter}
                                getFormEducation={getDocumentEducation}
                                getFormRationCard={getDocumentRationCard}
                            />

                            <hr />
                            <label>
                                <h5>{documentType != "INWARD" ? "Deliverd By" : "Received By"}</h5>
                            </label>
                            <CommonForm

                                updateCommanForm={updatedeliveryCommanForm}
                                getFormName={getDeliveryFormName}
                                getFormMiddleName={getDeliveryFormMiddleName}
                                getFormLastName={getDeliveryFormLastName}
                                getFormMobile={getDeliveryFormMobile}
                                getFormGender={getDeliveryFormGender}
                                RadioName={"gender2"}
                                getFormDOB={getDeliveryFormDOB}
                                getFormAge={getDeliveryFormAge}
                                getFormOccupation={getDeliveryFormOccupation}
                                getFormAddhar={getDeliveryFormAddhar}
                                getFormPan={getDeliveryFormPan}
                                getFormVoter={getDeliveryFormVoter}
                                getFormEducation={getDeliveryEducation}
                                getFormRationCard={getDeliveryRationCard}
                            />
                            <Row>
                                <Col md={5} className="mt-4">
                                    <Row>
                                        <Col md={6} >
                                            {!id ?
                                                <button type="submit" className="btn btn-danger">
                                                    Submit
                                                </button> :
                                                <button type="submit" className="btn btn-danger">
                                                    Update
                                                </button>
                                            }
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
