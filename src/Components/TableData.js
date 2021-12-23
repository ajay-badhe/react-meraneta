import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteHandler } from '../actions';

const TableData = (props) => {
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const { CallList } = useSelector(state => state.CallList)


    const deleteItem = (data) => {
        deleteHandler(data, dispatch)
        setList(CallList[0]);
    }

    useEffect(() => {
        setList(CallList[0] || []);
    }, [])

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
                        list?.length === 0 ? "no data found" :
                            list.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {moment(data.date).format('DD/MM/YYYY')}
                                        </td>
                                        <td>{data.callFrom?.firstName} {data.callFrom?.lastName}</td>
                                        <td>{data.callFrom?.phone}</td>
                                        <td>{data.callFrom?.email || '---'}</td>
                                        <td>{data?.priority}</td>
                                        <td>
                                            {
                                                data.recordStatus === "DELETED" ? <span className="text-danger">DELETED</span> :
                                                    <button onClick={() => deleteItem(data)} className="btn btn-danger">
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
