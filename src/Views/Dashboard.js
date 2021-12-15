import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Input, Row, Col } from 'reactstrap'
import { FaTasks, FaClipboardCheck, FaBusinessTime, FaClipboardList, FaCalendarTimes } from 'react-icons/fa'
import { get } from '../services/api';
import { bulan } from '../services/constants';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Report of Complains',
        },
    },
    scale: {
        ticks: {
            precision: 0
        }
    }
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const default_data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export const Dashboard = () => {
    const [statData, setStatData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [chartData, setChartData] = React.useState(default_data);
    const [search, setSearch] = React.useState('');
    const [labels, setLabels] = React.useState([]);

    const getStatistic = async () => {
        const res = await get(`dashboard`);
        if (res) {
            setStatData(res);
        }
    }

    const getTotalTask = async () => {
        const res = await get(`tasks/task-total`);
        if (res) {
            setTotal(res);
        }
    }

    const getPerMonth = async () => {
        const res = await get(`tasks/filter-month`);
        if (res) {
            const labels = res.map((r) => bulan[r.bulan]);
            const data = {
                labels,
                datasets: [
                    {
                        label: 'Task',
                        data: res.map((r) => r.jumlah_bulanan),
                        backgroundColor: 'rgb(177, 208, 224)',
                    },
                ],
            };
            setLabels(labels)
            setChartData(data);
        }
    }

    React.useEffect(() => {
        getStatistic();
        getTotalTask();
        getPerMonth();
    }, [])

    return (
        <div className='p-4'>
            <h3 className='border-bottom pb-2'>Dashboard</h3>
            <div className='py-3'>
                <Row>
                    <Col md={4} className='pb-3'>
                        <Card>
                            <CardBody>
                                <CardTitle tag="small">
                                    {`Total Tasks`}
                                </CardTitle>
                                <div className='d-flex justify-content-between mt-2'>
                                    <FaTasks style={{ fontSize: 32 }} />
                                    <h3>{total}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={2} className='pb-3'>
                        <Card className='bg-info text-white'>
                            <CardBody>
                                <CardTitle tag="small">
                                    {`Total Todo`}
                                </CardTitle>
                                <div className='d-flex justify-content-between mt-2'>
                                    <FaClipboardList style={{ fontSize: 32 }} />
                                    <h3>{statData.todo ?? 0}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={2} className='pb-3'>
                        <Card className='bg-warning text-white'>
                            <CardBody>
                                <CardTitle tag="small">
                                    {`Total On Progress`}
                                </CardTitle>
                                <div className='d-flex justify-content-between mt-2'>
                                    <FaBusinessTime style={{ fontSize: 32 }} />
                                    <h3>{statData.on_progress ?? 0}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={2} className='pb-3'>
                        <Card className='bg-success text-white'>
                            <CardBody>
                                <CardTitle tag="small">
                                    {`Total Finish`}
                                </CardTitle>
                                <div className='d-flex justify-content-between mt-2'>
                                    <FaClipboardCheck style={{ fontSize: 32 }} />
                                    <h3>{statData.finish ?? 0}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={2} className='pb-3'>
                        <Card className='bg-danger text-white'>
                            <CardBody>
                                <CardTitle tag="small">
                                    {`Total Closed`}
                                </CardTitle>
                                <div className='d-flex justify-content-between mt-2'>
                                    <FaCalendarTimes style={{ fontSize: 32 }} />
                                    <h3>{statData.closed ?? 0}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Col>
                    <div style={{ padding: '0 50px', width: 'auto', height: '500px' }}>
                        <Bar options={options} data={chartData} />
                    </div>
                </Col>
            </div>
        </div>
    )
}