import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Badge, Button } from 'reactstrap'
import { get } from '../services/api'
import './CardTicket.css'
import { useNavigate } from 'react-router-dom'

const statusList = {
    'todo': "Todo",
    'on_progress': "On Progress",
    'finish': "Finished",
    'closed': "Closed"
}
export const CardTicket = ({ data }) => {
    const navigate = useNavigate()
    
    const showDetailTask = async (id) => {
        navigate(`/tasks/${id}`)
    }
    
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {`${data.ticket_name}`}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted truncate"
                    tag="h6"
                >
                    {`${data.description}`}
                </CardSubtitle>
                <div className='d-flex' style={{ margin: '-4px' }}>
                    <Badge color="info" style={{ margin: '4px' }}>
                        {`${data.room?.customerName || ''}`}
                    </Badge>
                    <Badge color={data.taskStatus.toLowerCase() == 'todo' ? 'warning' : data.taskStatus.toLowerCase() == 'on_progress' ? 'primary' : data.taskStatus.toLowerCase() == 'finish' ? 'success' : 'secondary'} style={{ margin: '4px' }}>
                        {`${statusList[data.taskStatus.toLowerCase()]}`}
                    </Badge>
                    <div className='ms-auto text-link' onClick={() => showDetailTask(data.id)}>{`Detail >`}</div>
                </div>
            </CardBody>
        </Card>
    )
}