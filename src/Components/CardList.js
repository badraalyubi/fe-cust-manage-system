import React from 'react'
import { Row, Col } from 'reactstrap'
import { CardTicket } from './CardTicket'

const dummyData = [
    {
        sequence_id: '001',
        ticket_name: 'Ticket 1',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Eget arcu dictum varius duis at consectetur lorem donec. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Nam libero justo laoreet sit amet cursus sit amet dictum.',
        customer_name: 'Customer 1',
        status: 'Todo',
    },
    {
        sequence_id: '002',
        ticket_name: 'Ticket 2',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tristique nulla aliquet enim tortor at auctor urna nunc id. Et malesuada fames ac turpis egestas sed tempus. Magna ac placerat vestibulum lectus mauris ultrices eros.',
        customer_name: 'Customer 2',
        status: 'On Progress',
    },
    {
        sequence_id: '003',
        ticket_name: 'Ticket 3',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tristique nulla aliquet enim tortor at auctor urna nunc id. Et malesuada fames ac turpis egestas sed tempus. Magna ac placerat vestibulum lectus mauris ultrices eros.',
        customer_name: 'Customer 3',
        status: 'On Progress',
    },
    {
        sequence_id: '004',
        ticket_name: 'Ticket 4',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tristique nulla aliquet enim tortor at auctor urna nunc id. Et malesuada fames ac turpis egestas sed tempus. Magna ac placerat vestibulum lectus mauris ultrices eros.',
        customer_name: 'Customer ',
        status: 'Todo',
    },
    {
        sequence_id: '001',
        ticket_name: 'Ticket 1',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Eget arcu dictum varius duis at consectetur lorem donec. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Nam libero justo laoreet sit amet cursus sit amet dictum.',
        customer_name: 'Customer 1',
        status: 'Todo',
    },
    {
        sequence_id: '002',
        ticket_name: 'Ticket 2',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tristique nulla aliquet enim tortor at auctor urna nunc id. Et malesuada fames ac turpis egestas sed tempus. Magna ac placerat vestibulum lectus mauris ultrices eros.',
        customer_name: 'Customer 2',
        status: 'On Progress',
    },
    {
        sequence_id: '003',
        ticket_name: 'Ticket 3',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tristique nulla aliquet enim tortor at auctor urna nunc id. Et malesuada fames ac turpis egestas sed tempus. Magna ac placerat vestibulum lectus mauris ultrices eros.',
        customer_name: 'Customer 3',
        status: 'On Progress',
    },
    {
        sequence_id: '004',
        ticket_name: 'Ticket 4',
        ticket_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tristique nulla aliquet enim tortor at auctor urna nunc id. Et malesuada fames ac turpis egestas sed tempus. Magna ac placerat vestibulum lectus mauris ultrices eros.',
        customer_name: 'Customer ',
        status: 'Todo',
    }
]
export const CardList = (props) => {
    return (
        <div className='py-3'>
            <Row>
                {dummyData.map((data, index) => (
                    <Col key={index} md={3} className='pb-3'>
                        <CardTicket data={data} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}