import React from 'react'
import { Row, Col } from 'reactstrap'
import { CardTicket } from './CardTicket'

const dummyData = [
    {
        sequence_id: '001',
        ticket_name: 'Ticket 1',
        ticket_desc: '',
        customer_name: 'Customer 1',
        status: 'Pending',
    },
    {
        sequence_id: '002',
        ticket_name: 'Ticket 2',
        customer_name: 'Customer 2',
        status: 'Progress',
    }
]
export const CardList = (props) => {
    return (
        <div>
            <Row>
                {dummyData.map((data, index) => (
                    <Col key={index} md={3}>
                        <CardTicket data={data} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}