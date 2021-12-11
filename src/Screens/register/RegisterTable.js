import moment from 'moment'
import React from 'react'
import { Badge, Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterTable = ({ tableHeading, list, deleteHandler, editHandler }) => {
    return (
        <Card body className="h-100">
            <Table striped hover className="mt-2 w-100">
                <thead>
                    <tr>
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
                                    <tr key={index}>
                                        <td>{data.tokenNumber} </td>
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
                                                            <Link to={`/register/edit/${data.id}`} className="me-2 btn btn-info" onClick={() => editHandler(data)}>
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
                                )
                            })

                    }
                </tbody>
            </Table>
        </Card>
    )
}

export default RegisterTable
