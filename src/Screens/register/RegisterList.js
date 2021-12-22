import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Pagination, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import { LATTER_TYPES } from '../../constants/letterType';
import { REGISTER_LIST, REGISTER_LIST_DELETE } from '../../constants/register';
import RegisterTable from './RegisterTable';

const RegisterList = () => {
    const [showMenu, setShowMenu] = useState();
    const [search, setSearch] = useState('');
    const [priority, setPriority] = useState('');
    const [entryType, setEntryType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showClear, setShowClear] = useState(false);
    const [registerList, setRegisterList] = useState([]);
    const [latterType, setLatterType] = useState([]);
    const [latterTypeList, setLatterTypeList] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)

    const tableHeading = ['Token Number', 'File Number', 'Letter Type', 'Department', 'Added on	', ' Entry Type', 'Letter Release Date	', 'Status', 'Actions']
    const token = JSON.parse(localStorage.getItem('authToken'));
    const getToggleData = (toggle) => {
        setShowMenu(toggle)
    }


    let pagination = [];
    for (var i = 0; i < Math.ceil(count / 10); i++) {
        pagination.push(i);
    }




    // api call
    const apiCall = (API, listBody) => {
        setLoading(true)
        axios.post(API, listBody, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setRegisterList(response.data[0])
            setCount(response.data[1])
            setLoading(false)

        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    // getList
    const getList = () => {
        const body = { 'page': { 'number': 0, 'size': 10 } }
        apiCall(REGISTER_LIST, body)
    }

    // delete Handler
    const deleteHandler = (deletedData) => {
        deletedData.recordStatus = 'DELETED'
        const body = deletedData;
        axios.put(REGISTER_LIST_DELETE + '/' + deletedData.id, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                let list = [...registerList]
                let newList = list.map((item) => {
                    if (item.id === deletedData.id) {
                        item.recordStatus = 'DELETED'
                    }
                    return item
                })
                setRegisterList(newList)
            }).catch(err => {
                console.log({ err })
            })
    }

    // edit Handler
    // const editHandler = (editData) => {
    //     // console.log(editData)
    //     navigate("/addRegister")
    // }

    // pagination
    const paginationRout = (pageNumber) => {
        const body = { "page": { "number": pageNumber, "size": 10 } };
        apiCall(REGISTER_LIST, body)
        setCurrentPage(pageNumber)
        console.log(pageNumber)
    }

    const NextPage = () => {
        let next = currentPage + 1
        setCurrentPage(next)
        const body = { "page": { "number": next, "size": 10 } };
        apiCall(body, REGISTER_LIST)
    }
    const PrevPage = () => {
        let prev = currentPage - 1
        setCurrentPage(prev)
        const body = { "page": { "number": prev, "size": 10 } };
        apiCall(body, REGISTER_LIST)
    }
    const firstPage = () => {
        let first = pagination[0]
        setCurrentPage(first)
        const body = { "page": { "number": first, "size": 10 } };
        apiCall(body, REGISTER_LIST)
    }
    const lastPage = () => {
        let last = pagination[pagination.length - 1]
        setCurrentPage(last)
        const body = { "page": { "number": last, "size": 10 } };
        apiCall(body, REGISTER_LIST)
    }

    // search Handler
    const FilterHandler = () => {
        let entryTypeFilter
        if (entryType) {
            entryTypeFilter = { label: "", value: entryType }
        }
        else {
            entryTypeFilter = ""
        }

        let latterTypeFilter
        if (latterType) {
            latterTypeFilter = { "id": latterType }
        }
        else {
            latterTypeFilter = ""
        }

        const body = {
            "dateFrom": startDate,
            "dateTo": endDate,
            "search": search,
            "letterType": latterTypeFilter,
            'entryType': entryTypeFilter,
            "page": {
                "number": 0,
                "size": 10
            },
            "priority": priority
        }
        apiCall(REGISTER_LIST, body)
        setShowClear(true)
    }

    const clearFilterHandler = () => {
        setSearch('')
        setPriority('')
        setStartDate('')
        setEndDate('')
        setEntryType('')
        setLatterType('')
        setShowClear(false)
        getList();
    }

    useEffect(() => {
        getList();

        //  get assemblies
        axios.get(LATTER_TYPES, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setLatterTypeList(response.data)

            }).catch(error => {
                console.log({ error })
            })

    }, [])
    return (
        <div>
            <div className={showMenu ? "toggle" : " "}>
                <Header getToggle={getToggleData} />
                <Sidebar />
                <div className="Layout">
                    <div className="text-end mt-2 pe-3">
                        <Link to={'/addRegister'} className="btn btn-warning">Add</Link>
                    </div>
                    <div className="w-100 p-2">
                        <div className="d-flex justify-content-between">
                            <h3>Register List ({count})</h3>
                            <div className="align-items-center d-flex">
                                <div className="searchGroup">
                                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <button onClick={FilterHandler}><i className="fa fa-search"></i></button>
                                </div>
                                {showClear && <button className="btn btn-outline-warning mx-2" onClick={clearFilterHandler}>Clear</button>}
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className="mx-2">
                                        Filter
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Row>
                                            <Col className="mb-2" md={6}>
                                                <label>Select Priority</label>
                                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                                    <option value=""> Select Priority  </option>
                                                    <option value="VIP">  VIP </option>
                                                    <option value="IMPORTANT">  Important </option>
                                                    <option value="REGULAR">  Regular </option>
                                                </select>

                                            </Col>
                                            <Col className="mb-2" md={6}>
                                                <label>Latter Type</label>
                                                <select value={latterType} onChange={(e) => setLatterType(e.target.value)}>
                                                    <option value="">  Latter Type </option>
                                                    {
                                                        latterTypeList.map((items) => (
                                                            <option key={items.id} value={items.id}>  {items.name}</option>
                                                        ))
                                                    }
                                                </select>

                                            </Col>
                                            <Col className="mb-2" md={6}>
                                                <label>Entry Type</label>
                                                <select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
                                                    <option value="">  Entry Type </option>
                                                    <option value="INWARD">  INWARD </option>
                                                    <option value="OUTWARD">  OUTWARD </option>
                                                </select>

                                            </Col>
                                            <Col md={6}></Col>
                                            <Col className="mb-2" md={6}>
                                                <label>Start Date</label>
                                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                            </Col>
                                            <Col className="mb-2" md={6}>
                                                <label>End Date</label>
                                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            </Col>
                                            <Col>
                                                <button className="btn btn-success" onClick={FilterHandler}>Submit</button>
                                            </Col>
                                        </Row>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        {loading ? <div className="spinner"><Spinner animation="border" /> </div> :
                            <>
                                <RegisterTable list={registerList} deleteHandler={deleteHandler} tableHeading={tableHeading} />
                                <Pagination>
                                    <Pagination.First onClick={firstPage} disabled={pagination[0] === currentPage} />
                                    <Pagination.Prev onClick={PrevPage} disabled={pagination[0] === currentPage} />
                                    {
                                        pagination.map((page, index) => (
                                            <Pagination.Item key={index} onClick={() => paginationRout(page)} active={page === currentPage} >{page + 1}</Pagination.Item>
                                        ))
                                    }
                                    <Pagination.Next onClick={NextPage} disabled={pagination[pagination.length - 1] === currentPage} />
                                    <Pagination.Last onClick={lastPage} disabled={pagination[pagination.length - 1] === currentPage} />
                                </Pagination>
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterList
