import React from 'react'
import { Button, Input } from 'reactstrap'
import { FaPlus } from 'react-icons/fa'
import { CardList } from '../Components/CardList'
import { useNavigate } from 'react-router-dom'
import { get } from '../services/api'
import { getRole } from '../services/utils'
var _ = require('lodash');

export const Tasks = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [role, setRole] = React.useState('');

    function compare(a, b) {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }
        return 0;
    }

    const getTasks = async () => {
        try {
            let res = await get('tasks');
            res = res.map((r) => ({
                ...r,
                ticket_name: `Tickets ${r.id}`
            }))
            console.log(res)
            setTasks(res.sort(compare));
            setFiltered(res.sort(compare));
        } catch (error) {}
    }

    const onSearch = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = tasks.filter(task => task.ticket_name.toLowerCase().includes(value));
        console.log(filtered)
        return filtered.length > 0 ? setFiltered(filtered) : setFiltered(tasks);
    }

    const search = _.debounce(onSearch, 800)

    React.useEffect(() => {
        getTasks();
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
            <h3 className='border-bottom pb-2'>Tasks</h3>
            <div className='d-flex justify-content-between'>
                <div>
                    <Input placeholder='Search ticket' onChange={search} />
                </div>
                <div>
                    {role !== 'mt' && (
                        <Button className="btn btn-success" onClick={() => navigate('/tasks/create')}>
                            <FaPlus className="me-2" />
                            Create Ticket
                        </Button>
                    )}
                </div>
            </div>
            <div>
                <CardList data={filtered} />
            </div>
        </div>
    )
}