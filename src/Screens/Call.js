import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CALL_LIST, DELETE_CALL_LIST } from '../constants/callList'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import TableData from '../Components/TableData'
import { Col, Dropdown, Pagination, Row, Spinner } from 'react-bootstrap'
// import { ASSEMBLIES_URL } from '../constants/assembies'
import { Link } from 'react-router-dom'

const Call = () => {
    const [callList, setCallList] = useState([])
    const [showMenu, setShowMenu] = useState()
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [clearFilter, setClearFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [priority, setPriority] = useState("")
    // const [assembliesList, setAssembliesList] = useState([])
    const [assemblies, setAssemblies] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [currentPage, setCurrentPage] = useState(0)


    const token = JSON.parse(localStorage.getItem('authToken'))

    let pagination = [];
    for (var i = 0; i < Math.ceil(count / 10); i++) {
        pagination.push(i);
    }

    const tableHeading = ["Date", "Name", "Mobile Number", "Email", 'Priority', 'Actions']
    const getToggleData = (toggle) => {
        setShowMenu(toggle)
    }

    // Call list api call
    const apiCall = (API, listbody) => {
        setLoading(true)
        axios.post(API, listbody, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCallList(response.data[0])
                setCount(response.data[1])
                setLoading(false)
            })
            .catch(err => {
                console.log({ err });
                setLoading(false)

            })
    }


    // Delete Handler
    const deleteHandler = (deltedData) => {
        deltedData.recordStatus = 'DELETED'
        const body = deltedData;
        const token = JSON.parse(localStorage.getItem('authToken'))
        axios.put(DELETE_CALL_LIST + '/' + deltedData.id, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                let list = [...callList]
                let newList = list.map((item) => {
                    if (item.id === deltedData.id) {
                        item.recordStatus = 'DELETED'
                    }
                    return item
                })
                setCallList(newList)
            }).catch(err => {
                console.log({ err })
            })
    }


    // search handler
    const searchHandler = () => {
        let priorityFilter
        if (priority) {
            priorityFilter = { label: "", value: priority }
        }
        else {
            priorityFilter = ""
        }
        const body = {
            "dateFrom": startDate,
            "dateTo": endDate,
            "search": search,
            "priority": priorityFilter,
            "assembly": assemblies,
            "page": {
                "number": 0,
                "size": 10
            }
        }
        apiCall(body, CALL_LIST)
        setClearFilter(true)
    }


    // pagination
    const paginationRout = (pageNumber) => {
        const body = { "page": { "number": pageNumber, "size": 10 } };
        apiCall(body, CALL_LIST)
        setCurrentPage(pageNumber)
        console.log(pageNumber)
    }

    const NextPage = () => {
        let next = currentPage + 1
        setCurrentPage(next)
        const body = { "page": { "number": next, "size": 10 } };
        apiCall(body, CALL_LIST)
    }
    const PrevPage = () => {
        let next = currentPage - 1
        setCurrentPage(next)
        const body = { "page": { "number": next, "size": 10 } };
        apiCall(body, CALL_LIST)
    }
    const firstPage = () => {
        let first = pagination[0]
        setCurrentPage(first)
        const body = { "page": { "number": first, "size": 10 } };
        apiCall(body, CALL_LIST)
    }
    const lastPage = () => {
        let last = pagination[pagination.length - 1]
        setCurrentPage(last)
        const body = { "page": { "number": last, "size": 10 } };
        apiCall(body, CALL_LIST)
    }

    // get list from api
    const getList = () => {
        const body = { "page": { "number": 0, "size": 10 } };
        apiCall(body, CALL_LIST)
    }

    const clearFilterHandler = () => {
        getList()
        setSearch("")
        setPriority("")
        setStartDate("")
        setEndDate("")
        setClearFilter(false)
    }




    useEffect(() => {
        getList();

        // get assemblies
        // axios.get(ASSEMBLIES_URL, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        //     .then(response => {
        //         setAssembliesList(response.data)

        //     }).catch(error => {
        //         console.log({ error })
        //     })

    }, [])




    return (
        <>

            <div className={showMenu ? "toggle" : " "}>
                <Header getToggle={getToggleData} />
                <Sidebar />
                <div className="Layout">
                    <div className="text-end mt-2 pe-3">
                        <Link to={'/addCall'} className="btn btn-warning">Add</Link>
                    </div>
                    <div className="w-100 p-2">
                        <div className="d-flex justify-content-between">
                            <h3>Call List ({count})</h3>
                            <div className="align-items-center d-flex">
                                <div className="searchGroup">
                                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <button onClick={searchHandler} ><i className="fa fa-search"></i></button>
                                </div>
                                {clearFilter && <button className="btn btn-outline-warning mx-2" onClick={clearFilterHandler}>Clear</button>}
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className="mx-2">
                                        Filter
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Row>
                                            <Col className="mb-2" md={6}>
                                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                                    <option value=""> Select Priority  </option>
                                                    <option value="HIGH">  High </option>
                                                    <option value="MEDIUM">  Medium </option>
                                                    <option value="LOW">  Low </option>
                                                </select>

                                            </Col>
                                            <Col className="mb-2" mad={6}>
                                            </Col>
                                            <Col className="mb-2" md={6}>
                                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                            </Col>
                                            <Col className="mb-2" md={6}>
                                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            </Col>
                                            <Col>
                                                <button onClick={searchHandler} className="btn btn-success">Submit</button>
                                            </Col>

                                        </Row>


                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </div>
                        {loading ? <div className="spinner"><Spinner animation="border" /> </div> :
                            <>
                                <TableData list={callList} deleteHandler={deleteHandler} tableHeading={tableHeading} />
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
        </>
    )
}

export default Call
