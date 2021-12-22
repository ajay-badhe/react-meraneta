import moment from 'moment'
import React, { Fragment, useState } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterTable = ({ tableHeading, list, deleteHandler }) => {
    const [collapse, setCollapse] = useState(false)
    const handelCollapse = () => {
        setCollapse(!collapse)
    }
    return (
        <Card body className="h-100">
            <Table striped hover className="mt-2 w-100">
                <thead>
                    <tr>
                        <th></th>
                        {
                            tableHeading.map((tHeading, index) => {
                                return (
                                    <th key={index}>{tHeading} </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list?.length === 0 ? "no data found" :
                            list.map((data, index) => {
                                return (
                                    < Fragment key={index}>
                                        <tr >
                                            <td>
                                                <button className="btn collapsed"
                                                    data-toggle="collapse"
                                                    data-target={".multi-collapse" + index}
                                                    aria-controls={"multiCollapseExample" + index}
                                                    onClick={handelCollapse}
                                                >
                                                    <i className='fa fa-chevron-down' aria-hidden="true"></i>
                                                </button>
                                            </td>
                                            <td>
                                                {data.tokenNumber}
                                            </td>
                                            <td> {data.file_number} </td>
                                            <td> {data.letterType.name} </td>
                                            <td> {data?.department?.name || "NA"} </td>
                                            <td> {moment(data.createdDate).format('DD/MM/YYYY')} </td>
                                            <td> {data.entryType} </td>
                                            <td> {data?.letterReleaseDate ? moment(data.letterReleaseDate).format('DD/MM/YYYY') : "NA"} </td>
                                            <td> {data.status} </td>


                                            <td>
                                                <div className="d-flex">

                                                    {
                                                        data.recordStatus === "DELETED" ? <span className="text-danger">DELETED</span> :
                                                            <>
                                                                <Link to={`/register/edit/${data.id}`} className="me-2 btn btn-info">
                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                </Link>
                                                                <button onClick={() => deleteHandler(data)} className="btn btn-danger">
                                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                </button>
                                                            </>
                                                    }

                                                </div>
                                            </td>
                                        </tr>
                                        <tr class={"collapse multi-collapse" + index} id={"multiCollapseExample" + index}>
                                            <td colSpan="10">
                                                <Card body style={{ background: "#F5F6FA" }}>
                                                    <Row>
                                                        <Col style={{ border: "1px solid #ddd", background: '#fff' }} >
                                                            <label>Personal Info</label>
                                                            <br />
                                                            <Row>
                                                                <Col>
                                                                    <p className="text-info mb-1">
                                                                        {data.entryType === "INWARD" ? 'Delivered By' : "Received By"}
                                                                    </p>
                                                                    <p className="mb-0">{data?.receiveBy?.firstName} {data?.receiveBy?.lastName}</p>
                                                                    <p>{data?.receiveBy?.phone}</p>
                                                                </Col>
                                                                <Col>
                                                                    <p className="text-info mb-1">
                                                                        {data.entryType === "INWARD" ? 'Document From' : "Document For"}
                                                                    </p>
                                                                    <p className="mb-0">{data?.documentFor?.firstName} {data?.documentFor?.lastName}</p>
                                                                    <p>{data?.documentFor?.phone} </p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md="1"></Col>
                                                        <Col md="4" style={{ border: "1px solid #ddd", background: '#fff' }} >
                                                            <label>Note</label>
                                                            <br />
                                                            <p>{data.comments || "----"}</p>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            })

                    }
                </tbody>
            </Table>
        </Card>
    )
}

export default RegisterTable
