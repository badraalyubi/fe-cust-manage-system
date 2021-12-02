import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Badge, Button } from 'reactstrap'
import './CardTicket.css'

export const CardTicket = ({ data }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {`${data.sequence_id} - ${data.ticket_name}`}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted truncate"
                    tag="h6"
                >
                    {`${data.ticket_desc}`}
                </CardSubtitle>
                <div className='d-flex' style={{ margin: '-4px' }}>
                    <Badge color="info" style={{ margin: '4px' }}>
                        {`${data.customer_name}`}
                    </Badge>
                    <Badge color={data.status.toLowerCase() == 'todo' ? 'warning' : data.status.toLowerCase() == 'on progress' ? 'primary' : data.status.toLowerCase() == 'finished' ? 'success' : 'secondary'} style={{ margin: '4px' }}>
                        {`${data.status}`}
                    </Badge>
                    <div className='ms-auto text-link'>{`Detail >`}</div>
                </div>
            </CardBody>
        </Card>
    )
}