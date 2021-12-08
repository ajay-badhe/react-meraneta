import React from 'react'
import { Card, Table } from 'react-bootstrap'

const TableData = (props) => {
    // console.log("list" + JSON.stringify(props.list))
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
                                        <td>
                                            {data.date}
                                        </td>
                                        <td>{data.callFrom.firstName}</td>
                                        <td>{data.callFrom.phone}</td>
                                        <td>{data.callFrom.email}</td>
                                        <td>{data.priority}</td>
                                        <td>
                                            {
                                                data.recordStatus === "DELETED" ? <span className="text-danger">DELETED</span> :
                                                    <button onClick={() => props.deleteHandler(data)} className="btn btn-danger">
                                                        Delete
                                                    </button>
                                            }
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

export default TableData