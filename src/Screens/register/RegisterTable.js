import React from 'react'
import { Badge, Button, Card, Table } from 'react-bootstrap'

const RegisterTable = (props) => {
    return (
        <Card body className="h-100">
            <Table striped hover className="mt-2 w-100">
                <thead>
                    <tr>
                        {
                            props.tableHeading.map((tHeading, index) => {
                                return (
                                    <th key={index}>{tHeading} </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.list?.length === 0 ? "no data found" :
                            props.list.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.tokenNumber} </td>
                                        <td> {data.file_number} </td>
                                        <td> {data.letterType.name} </td>
                                        <td> {data.createdDate} </td>
                                        <td> {data.createdDate} </td>
                                        <td> {data.entryType} </td>
                                        <td> {data.letterReleaseDate} </td>
                                        <td> {data.status} </td>


                                        <td>
                                            <div className="d-flex">
                                                {
                                                    data.recordStatus === "DELETED" ? <span className="text-danger">DELETED</span> :
                                                        <button onClick={() => props.deleteHandler(data)} className="btn btn-danger">
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </button>
                                                }
                                                {/* <Button variant="primary" className="d-flex ms-2">
                                                    <i className="fa fa-file" aria-hidden="true"></i> <Badge bg="secondary">9</Badge>
                                                </Button> */}
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
