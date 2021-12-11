import React from 'react'
import { Button, FormGroup, Label, Col, Form, Input, Row, FormFeedback } from 'reactstrap'
import Select from 'react-select'
import { FaSave, FaTimes, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import { get, post, put } from '../services/api'
import { Formik } from 'formik'
import * as Yup from "yup";
import { getRole } from '../services/utils'

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]

const statusOptions = [
    { value: 'todo', label: 'Todo' },
    { value: 'on_progress', label: 'On Progress' },
    { value: 'finish', label: 'Finished' },
    { value: 'closed', label: 'Closed' },
]

const defaultValues = {
    room: "",
    email: '',
    phone: '',
    subject: '',
    status: "",
    priority: "",
    departments: [],
    description: '',
}

const validationForm = Yup.object().shape({
    room: Yup.string().required('Room is required'),
})

export const TaskEditor = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [detailValue, setDetailValue] = React.useState(defaultValues);
    const [rooms, setRooms] = React.useState([]);
    const [departments, setDepartments] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [role, setRole] = React.useState('');

    const onClickEdit = (edit) => {
        setIsEdit(edit);
    }
    const onClickClose = (close) => {
        onClickEdit(close);
    }

    const getDetail = async () => {
        try {
            let res = await get(`tasks/${params.id}`);
            let data = { ...detailValue }
            data.room = await getRoomById(res.room.id);
            data.room = {
                label: data.room.customerName,
                value: data.room.id
            }
            data.email = res.room.email
            data.phone = res.room.phoneNumber
            data.subject = res.subject
            data.status = await getSelectedStatus(res.taskStatus)
            data.departments = res.departments.map((d) => ({ label: d.name, value: d.id }))
            data.priority = await getSelectedPriority(res.taskPriority);
            data.description = res.description;
            console.log('data', data);
            setDetailValue(data);
        } catch (error) { }
    }

    const getSelectedStatus = async (val) => {
        const selected = await statusOptions.find((s) => s.value == val);
        return selected;
    }

    const getSelectedPriority = async (val) => {
        const selected = await priorityOptions.find((p) => p.value == val);
        return selected;
    }

    const handleChangeRoom = async (option, setFieldValue) => {
        // console.log(option)
        setFieldValue('room', option);
        const room = await getRoomById(option.value);
        setFieldValue('email', room.email);
        setFieldValue('phone', room.phoneNumber);
    }

    const getRooms = async () => {
        try {
            const res = await get('rooms');
            let formatOptions = []
            if (res) {
                formatOptions = res.map(r => ({
                    label: r.customerName,
                    value: r.id
                }))
                setRooms(formatOptions);
            }
        } catch { }
    }

    const getRoomById = async (id) => {
        const res = await get(`rooms/${id}`)
        if (res) {
            return res;
        }
    }

    const getDepartments = async () => {
        const res = await get('departments')
        let formatOptions = []
        if (res) {
            formatOptions = res.map((r) => ({
                label: r.name,
                value: r.id
            }))
            setDepartments(formatOptions);
        }
    }

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            let data = new FormData();
            if (params.id) data.append('id', params.id);
            data.append('roomId', values.room.value);
            data.append('subject', values.subject);
            data.append('taskStatus', values.status.value);
            data.append('taskPriority', values.priority.value);
            data.append('departments', values.departments.map(d => d.value));
            data.append('description', values.description);
            // data.append('taskMedias', null);
            // let data = {};
            // data["roomId"] = values.room.value;
            // data["departments"] = values.departments.map((d) => d.value);
            // data["taskStatus"] = values.status.value;
            // data["taskPriority"] = values.priority.value;
            // data["subject"] = values.subject;
            // data["description"] = values.description;
            // data["taskMedias"] = null;
            console.log('data', data);
            const res = !params.id ? await post(`tasks`, data) : await put(`tasks/${params.id}`, data);
            if (res) {
                setSubmitting(false);
                navigate('/tasks');
            }
        } catch (error) {
            console.log('error', error);
            setSubmitting(false);
        }
    }

    React.useEffect(() => {
        // console.log('params', params.id);
        getRooms();
        getDepartments();
        getDetail();
        if (getRole().includes('SUPER_ADMIN')) {
            setRole('su')
        } else if (getRole().includes('CUSTOMER_SERVICE')) {
            setRole('cs')
        } else {
            setRole('mt')
        }
    }, [])

    return (
        <div className='p-4'>
            <div className='d-flex justify-content-between border-bottom pb-2'>
                <h3>Create Tasks</h3>
                {!isEdit && params.id && (
                    <div className='text-end' style={{ margin: '-4px' }}>
                        <Button color="secondary" outline className="ms-auto" style={{ margin: '4px' }} onClick={() => navigate('/tasks')}>
                            <FaArrowLeft className="me-2" />
                            Kembali
                        </Button>
                        <div className='vr mx-2'></div>
                        <Button color="primary" className="ms-auto" style={{ margin: '4px' }} onClick={() => onClickEdit(true)}>
                            <FaEdit className="me-2" />
                            Ubah
                        </Button>
                        {/* <Button color='danger' className="ms-auto" style={{ margin: '4px' }} onClick={() => null}>
                            <FaTrash className="me-2" />
                            Hapus
                        </Button> */}
                    </div>
                )}
            </div>
            <div className='py-4'>
                <Formik
                    enableReinitialize={true}
                    initialValues={detailValue}
                    // validationSchema={validationForm}
                    // validateOnChange={true}
                    onSubmit={onSubmit}
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
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup row>
                                <Label for="customer" sm={2}>
                                    Room / Customer
                                </Label>
                                <Col md={2}>
                                    {(!isEdit && params.id) || (isEdit && role == 'mt') ? (
                                        <Input name="room" value={values.room?.label || ''} readOnly={true} />
                                    ) : (
                                        <Select name="room" options={rooms} placeholder="Room / Customer" value={values.room} isClearable onChange={async (option) => await handleChangeRoom(option, setFieldValue)} />
                                    )}
                                    <FormFeedback>
                                        {JSON.stringify(errors)}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" md={2}>
                                    Email
                                </Label>
                                <Col md={2}>
                                    <Input id="email" name="email" type="email" value={values.email} placeholder='Email' readOnly={true} onChange={handleChange} />
                                </Col>
                                <Label for="phone" md={2}>
                                    Phone
                                </Label>
                                <Col md={2}>
                                    <Input id="phone" name="phone" type="text" value={values.phone} placeholder='Phone' readOnly={true} onChange={handleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="subject" md={2}>
                                    Subject
                                </Label>
                                <Col md={6}>
                                    <Input id="subject" name="subject" type="text" placeholder='Subject' value={values.subject} readOnly={(!isEdit && params.id) || (isEdit && role == 'mt')} onChange={handleChange} />
                                </Col>
                            </FormGroup>
                            <Row style={{ marginTop: '36px' }}>
                                <Col md={4}>
                                    <FormGroup row>
                                        <Label for="status" md={6}>
                                            Status
                                        </Label>
                                        <Col md={6}>
                                            {!isEdit && params.id ? (
                                                <Input name="status" value={values.status?.label || ''} readOnly={true} />
                                            ) : (
                                                <Select id="status" name="status" options={statusOptions} value={values.status} isClearable onChange={(option) => setFieldValue('status', option)} />
                                            )}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="deprtments" md={6}>
                                            Assignee
                                        </Label>
                                        <Col md={6}>
                                            {(!isEdit && params.id) || (isEdit && role == 'mt') ? (
                                                <Input name="department" value={values.departments?.map((d) => d.label).join(', ') || ''} readOnly={true} />
                                            ) : (
                                                <Select id="departments" name="departments" options={departments} value={values.departments} isMulti onChange={(option) => setFieldValue('departments', option)} />
                                            )}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="priority" md={6}>
                                            Priority
                                        </Label>
                                        <Col md={6}>
                                            {(!isEdit && params.id) || (isEdit && role == 'mt') ? (
                                                <Input name="priority" value={values.priority?.label || ''} readOnly={true} />
                                            ) : (
                                                <Select id="priority" name="priority" options={priorityOptions} value={values.priority} isClearable onChange={(option) => setFieldValue('priority', option)} />
                                            )}
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input id="description" name="description" type="textarea" placeholder='Deskripsi' rows={6} value={values.description} readOnly={(!isEdit && params.id) || (isEdit && role == 'mt')} onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row>
                                {(isEdit || !params.id) && (
                                    <Col md={8}>
                                        <div className='text-end py-3' style={{ margin: '-4px' }}>
                                            <Button type='submit' className="btn btn-success ms-auto" style={{ margin: '4px' }}>
                                                <FaSave className="me-2" />
                                                Save
                                            </Button>
                                            <Button className="btn btn-danger ms-auto" style={{ margin: '4px' }} onClick={() => onClickClose(false)}>
                                                <FaTimes className="me-2" />
                                                Close
                                            </Button>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}