import React from 'react'
import { Button, Input } from 'reactstrap'
import { FaPlus } from 'react-icons/fa'
import { CardList } from '../Components/CardList'

export const Tasks = () => {
    return (
        <div className='p-4'>
            <h3 className='border-bottom pb-2'>Tasks</h3>
            <div className='d-flex justify-content-between'>
                <div>
                    <Input placeholder='Search ticket' />
                </div>
                <div>
                    <Button className="btn btn-success">
                        <FaPlus className="me-2"  />
                        Create Ticket
                    </Button>
                </div>
            </div>
            <div>
                <CardList />
            </div>
        </div>
    )
}