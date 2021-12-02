import React from 'react'
import { Button, FormGroup, Label, Col, Form, Input, Row } from 'reactstrap'
import Select from 'react-select'
import { FaSave, FaTimes } from 'react-icons/fa'

const assigneeOptions = [
    {  value: '1', label: 'John Doe' },
    {  value: '2', label: 'Jane Doe' },
    {  value: '3', label: 'Joe Doe' },
]

const priorityOptions = [
    {  value: '1', label: 'Low' },
    {  value: '2', label: 'Medium' },
    {  value: '3', label: 'High' },
]

const statusOptions = [
    {  value: '1', label: 'Todo' },
    {  value: '2', label: 'On Progress' },
    { value: '3', label: 'Finished' },
    { value: '4', label: 'Closed' },
]

const customerOptions = [
    {  value: '1', label: 'John Doe' },
    {  value: '2', label: 'Jane Doe' },
    {  value: '3', label: 'Joe Doe' },
]

export const TaskEditor = () => {
    return (
        <div className='p-4'>
            <div className='d-flex justify-content-between border-bottom pb-2'>
                <h3>Create Tasks</h3>
            </div>
            <div className='py-4'>
                <Form>
                    <FormGroup row>
                        <Label for="customer" sm={2}>
                            Room / Customer
                        </Label>
                        <Col md={2}>
                            <Select id="customer" options={customerOptions} placeholder="Room / Customer" isClearable />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" md={2}>
                            Email
                        </Label>
                        <Col md={2}>
                            <Input id="email" name="email_field" type="email" placeholder='Email' />
                        </Col>
                        <Label for="phone" md={2}>
                            Phone
                        </Label>
                        <Col md={2}>
                            <Input id="phone" name="phone_field" type="text" placeholder='Phone' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="subject" md={2}>
                            Subject
                        </Label>
                        <Col md={6}>
                            <Input id="subject" name="subject_field" type="text" placeholder='Subject' />
                        </Col>
                    </FormGroup>
                    <Row style={{ marginTop: '36px' }}>
                        <Col md={4}>
                            <FormGroup row>
                                <Label for="status" md={6}>
                                    Status
                                </Label>
                                <Col md={6}>
                                    <Select id="status" options={statusOptions} isClearable />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="assignee" md={6}>
                                    Assignee
                                </Label>
                                <Col md={6}>
                                    <Select id="assignee" options={assigneeOptions} isMulti />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="priority" md={6}>
                                    Priority
                                </Label>
                                <Col md={6}>
                                    <Select id="priority" options={priorityOptions} isClearable />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Input id="desc" name="desc_field" type="textarea" placeholder='Deskripsi' rows={6} />    
                        </Col>   
                    </Row>
                    <Row>
                        <Col md={8}>
                            <div className='text-end py-3' style={{ margin: '-4px' }}>
                                <Button className="btn btn-success ms-auto" style={{ margin: '4px' }} onClick={() => null}>
                                    <FaSave className="me-2" />
                                    Save
                                </Button>
                                <Button className="btn btn-danger ms-auto" style={{ margin: '4px' }} onClick={() => null}>
                                    <FaTimes className="me-2" />
                                    Close
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}