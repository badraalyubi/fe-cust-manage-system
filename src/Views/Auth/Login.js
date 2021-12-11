import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Alert, FormFeedback, Spinner } from 'reactstrap'
import { login, register } from '../../services/api';
import { isLoggedIn } from '../../services/utils';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from "yup";
import React from 'react'
import './Login.css'

const default_value = {
    fullname: '',
    email: '',
    password: '',
    role: [],
}

const default_alert = {
    type: '',
    message: '',
}

const roles = [
    { value: "super_admin", label: 'SUPER ADMIN' },
    { value: "customer_service", label: 'CUSTOMER SERVICE' },
    { value: "maintainer", label: 'MAINTAINER' },
]

const validationForm = Yup.object().shape({
    email: Yup.string().email("Masukan email").required("Email harus diisi"),
    password: Yup.string().min(8, "Minimal password 8 digit").required("Password harus diisi")
})

const validationRegister = Yup.object().shape({
    fullname: Yup.string().required("Nama harus diisi"),
    email: Yup.string().email("Masukan email").required("Email harus diisi"),
    password: Yup.string().min(8, "Minimal password 8 digit").required("Password harus diisi"),
    role: Yup.array().min(1, "Role harus diisi")
})

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: 0,
        height: '3.5rem'
    }),
}

export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname;
    const isRegister = path === ('/register')
    const [loginPayload, setLoginPayload] = React.useState(default_value)
    const [alertMessage, setAlertMessage] = React.useState(default_alert);
    const [busy, setBusy] = React.useState(false);
    const [validation, setValidation] = React.useState(null);

    const onSubmit = async (values) => {
        // console.log(values)
        let payload;
        if (isRegister) {
            payload = {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                role: values.role.map(item => item.value),
            }
        }
        setBusy(true)
        try {
            const res = isRegister ? await register('auth/signup', payload) : await login(values.email, values.password);
            if (res) {
                if (isRegister) {
                    setAlertMessage({
                        type: 'success',
                        message: res.message
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 400);
                } else {
                    setAlertMessage({
                        type: 'success',
                        message: 'Login Successful'
                    });
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 400);
                }
            }
        } catch (error) {
            if (isRegister) {
                setAlertMessage({
                    type: 'danger',
                    message: error.message
                });
            } else {
                if (error && error.error.toLowerCase() == 'unauthorized') {
                    setAlertMessage({
                        type: 'danger',
                        message: 'Email or Password is incorrect'
                    });
                }
            }
        } finally {
            setBusy(false)
        }
    }

    React.useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard');
        }
        if (isRegister) {
            setValidation(validationRegister)
        } else {
            setValidation(validationForm)
        }
    }, [])

    return (
        <div className='login-container'>
            <div className='form-signin'>
                <Formik
                    enableReinitialize={true}
                    initialValues={loginPayload}
                    validationSchema={validation}
                    validateOnChange={true}
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
                        setFieldValue,
                        setFieldTouched,
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
                            {isRegister && (
                                <div className="form-floating">
                                    <Input
                                        name='fullname'
                                        type="text"
                                        id="inputFullname"
                                        invalid={errors.fullname}
                                        valid={!errors.fullname}
                                        error={errors.fullname}
                                        placeholder="Ex: John Doe"
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    <label htmlFor="inputFullname">Fullname</label>
                                    <FormFeedback invalid={errors.fullname ? true : false}>
                                        {errors.fullname ?? ''}
                                    </FormFeedback>
                                </div>
                            )}
                            <div className="form-floating">
                                <Input
                                    name='email'
                                    type="text"
                                    id="inputEmail"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    invalid={errors.email}
                                    valid={!errors.email}
                                    error={errors.email}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                                <FormFeedback invalid={errors.email ? true : false}>
                                    {errors.email ?? ''}
                                </FormFeedback>
                            </div>
                            {isRegister && (
                                <div className='form-floating'>
                                    <Select
                                        name="role"
                                        id="role"
                                        options={roles}
                                        placeholder="Role"
                                        value={values.role}
                                        onChange={(option) => setFieldValue('role', option)}
                                        onBlur={handleBlur}
                                        styles={customStyles}
                                        isMulti
                                        isClearable />
                                    {errors.role && (
                                        <div class="invalid-feedback d-block">
                                            {errors.role ?? ''}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="form-floating">
                                <Input
                                    name="password"
                                    type="password"
                                    id="inputPassword"
                                    className={
                                        errors.password ? "text-input is-invalid" : ""
                                    }
                                    placeholder="Password"
                                    onChange={handleChange}
                                    valid={!errors.password}
                                    error={errors.password}
                                    onBlur={handleBlur} />
                                <label htmlFor="floatingPassword">Password</label>
                                <FormFeedback invalid={errors.password ? true : false} valid={!errors.password ? true : false}>
                                    {errors.password ?? ''}
                                </FormFeedback>
                            </div>

                            {/* <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                            </div> */}
                            {isRegister ? (
                                <>
                                    <Button className="w-100 mb-3" color="primary" type="submit">Sign up</Button>
                                    <Button className="w-100" color="secondary" outline type='button' onClick={() => navigate('/login')}>Sign in</Button>
                                </>
                            ) : (
                                <>
                                    <Button className="w-100 mb-3" color="primary" type="submit">
                                        {busy ? (
                                            <Spinner color="light" />
                                        ) : (
                                            <span>Sign in</span>
                                        )}
                                    </Button>
                                    <Button className="w-100" color="secondary" outline type='button' onClick={() => navigate('/register')}>Sign up</Button>
                                </>
                            )}
                            <p className="mt-5 mb-3 text-muted">&copy; 2021 Customer Management System</p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}