import React, { useState } from 'react'
import { Form, Button, Container, FloatingLabel, Spinner } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { signin } from '../actions/loginAction';
import { useDispatch, useSelector } from 'react-redux';


const Login = (props) => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const { loading } = useSelector(state => state.userSignin)


    const dispatch = useDispatch()

    // submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        signin(userName, password, dispatch)
        navigate("/dashboard")
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
