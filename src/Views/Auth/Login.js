import React from 'react'
import { Form, Input, Button, Alert } from 'reactstrap'
import { Formik } from 'formik';
import './Login.css'
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../services/utils';

const default_value = {
    email: '',
    password: ''
}

const default_alert = {
    type: '',
    message: '',
}

export const Login = () => {
    const navigate = useNavigate()
    const [loginPayload, setLoginPayload] = React.useState(default_value)
    const [alertMessage, setAlertMessage] = React.useState(default_alert);

    const onSubmit = async (values) => {
        try {
            const res = await login(values.email, values.password);
            if (res) {
                setAlertMessage({
                    type: 'success',
                    message: 'Login Successful'
                });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 400);
            }
        } catch (error) {
            console.log(error)
            if (error && error.error.toLowerCase() == 'unauthorized') {
                setAlertMessage({
                    type: 'danger',
                    message: 'Email or Password is incorrect'
                });
            }
        }
    }

    React.useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard');
        }
    }, [])
    return (
        <div className='login-container'>
            <div className='form-signin'>
                <Formik
                    initialValues={loginPayload}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <h1 className='text-center'>Customer Management System</h1>
                            <br />
                            <h4 className="h4 mb-3 fw-normal text-center">Please sign in</h4>
                            {alertMessage.message && (
                                <Alert
                                    color={alertMessage.type}
                                    toggle={function noRefCheck() { }}
                                >
                                    {alertMessage.message}
                                </Alert>
                            )}
                            <div className="form-floating">
                                <Input
                                    name='email'
                                    type="email"
                                    id="inputEmail"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <Input
                                    name="password"
                                    type="password"
                                    id="inputPassword"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                            </div>
                            <Button className="w-100 mb-3" color="primary" type="submit">Sign in</Button>
                            <Button className="w-100" color="secondary" outline type='button' onClick={() => navigate('/register')}>Sign Up</Button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2021 Customer Management System</p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}