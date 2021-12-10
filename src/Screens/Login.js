import React, { useState } from 'react'
import { Form, Button, Container, FloatingLabel, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { LOGIN_URL } from '../constants/login'
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [res, setRes] = useState()
    const [error, setError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)

    // submit handler
    const submitHandler = (e) => {
        e.preventDefault();

        if (!userName) {
            setUserNameError(true)
        }
        if (!password) {
            setPasswordError(true)
            return
        }
        else {
            setUserNameError(false)
            setPasswordError(false)

        }

        const body = { "username": userName, "password": password, "deviceId": "dapxDzCySkg:APA91bFte8-oCXMYKJp016cUG7DcGprawTKhzxOSVXA7B55TzYTuYPTPZ6QLAT3Ei8wu0WKc0eIbBlQJosDq50s_fn66Bu0RRla2sPKNEBorqRJfTwTAlC_ssuCSb6Fur7PgqnMHeseo" };
        setLoading(true)
        axios.post(LOGIN_URL, body)
            .then(response => {
                setRes(response.data)
                localStorage.setItem("login", JSON.stringify(response.data))
                localStorage.setItem("authToken", JSON.stringify(response.data?.accessToken))
                localStorage.setItem("userName", JSON.stringify(response.data.firstName + " " + response.data.lastName))
                setLoading(false)

                navigate("/dashboard")
            }

            )
            .catch(err => {
                setError(true)
                console.log({ err });
                setLoading(false)
            })


    }
    return (
        <div>
            <Container>
                {loading && <div className="spinner"><Spinner animation="border" /> </div>}
                <Form className="loginForm" onSubmit={submitHandler}>
                    <h1>Login</h1>
                    <Form.Group controlId="formFile" className="mb-3">
                        <FloatingLabel controlId="floatinguser" label="User name">
                            <Form.Control type="text" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    {userNameError && <p className="text-danger">User Name is required</p>}
                    <Form.Group controlId="formFile" className="mb-3">
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    {passwordError && <p className="text-danger">Password is required</p>}
                    {error && <p className="text-danger">Invalid username/password</p>}
                    <Button variant="warning" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login
