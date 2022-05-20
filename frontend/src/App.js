import './App.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table, ButtonGroup, Modal } from 'react-bootstrap';

export default function App() {

    const [name, setName] = useState('');
    const [desig, setDesig] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [officetime, setOfficetime] = useState('');
    const [offday, setOffday] = useState('');
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [singleData, setSingleData] = useState({});

    const handleClose = () => setShow(false);

    const handleShow = async (userid) => {
        const { data } = await axios.get(`http://localhost:8000/user/${userid}`);
        setName(data.name);
        setDesig(data.desig);
        setNumber(data.number);
        setEmail(data.email);
        setOfficetime(data.officeTime);
        setOffday(data.offDay);
        setSingleData(data);
        setShow(true)
    };

    const handleFormButton = (event) => {
        // event.preventDefault();

        axios.post('http://localhost:8000/user', {
            name: name,
            desig: desig,
            number: number,
            email: email,
            officeTime: officetime,
            offDay: offday,
        });
    }

    const handleDeleteButton = (userid) => {
        axios.delete(`http://localhost:8000/user/${userid}`);
    }

    const handleEditButton = (userid) => {
        axios.put(`http://localhost:8000/user/${userid}`, {
            name: name,
            desig: desig,
            number: number,
            email: email,
            officeTime: officetime,
            offDay: offday,
        });
    }

    useEffect(() => {
        async function userData() {
            const { data } = await axios.get('http://localhost:8000/user');
            setUser(data);
        }
        userData();
    }, []);

    return (
        <>
            <div className="py-5 px-5 container-fluid">
                <h1 className="app-title">crud operation</h1>
                <ul className="app-list">
                    <li>React</li>
                    <li>Node</li>
                    <li>Express</li>
                    <li>Mongodb</li>
                </ul>
                <Form className="app-form">
                    <Row>
                        <Col lg={4}><Form.Control type="text"   placeholder="Full Name"     onChange={(event) => setName(event.target.value)}       /></Col>
                        <Col lg={4}><Form.Control type="text"   placeholder="Designation"   onChange={(event) => setDesig(event.target.value)}      /></Col>
                        <Col lg={4}><Form.Control type="number" placeholder="Phone Number"  onChange={(event) => setNumber(event.target.value)}     /></Col>
                        <Col lg={4}><Form.Control type="email"  placeholder="Email Address" onChange={(event) => setEmail(event.target.value)}      /></Col>
                        <Col lg={4}><Form.Control type="text"   placeholder="Office Time"   onChange={(event) => setOfficetime(event.target.value)} /></Col>
                        <Col lg={4}><Form.Control type="text"   placeholder="Day Off"       onChange={(event) => setOffday(event.target.value)}     /></Col>
                        <Col lg={12}><Button variant="primary" type="submit" onClick={handleFormButton}>Submit</Button></Col>
                    </Row>
                </Form>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Full Name</th>
                            <th>Designation</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Office Time</th>
                            <th>Offday</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.desig}</td>
                                    <td>{item.number}</td>
                                    <td>{item.email}</td>
                                    <td>{item.officeTime}</td>
                                    <td>{item.offDay}</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button variant="success" onClick={()=> handleShow(item._id)}>Edit</Button>
                                            <Button variant="danger" onClick={()=> handleDeleteButton(item._id)}>Delete</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <Form className="app-form mb-0">
                            <Row>
                                <Col lg={12}><h1 className="modal-title">change the details</h1></Col>
                                <Col lg={6}><Form.Control type="text"   placeholder="Full Name"     value={name}       onChange={(event) => setName(event.target.value)}       /></Col>
                                <Col lg={6}><Form.Control type="text"   placeholder="Designation"   value={desig}      onChange={(event) => setDesig(event.target.value)}      /></Col>
                                <Col lg={6}><Form.Control type="number" placeholder="Phone Number"  value={number}     onChange={(event) => setNumber(event.target.value)}     /></Col>
                                <Col lg={6}><Form.Control type="email"  placeholder="Email Address" value={email}      onChange={(event) => setEmail(event.target.value)}      /></Col>
                                <Col lg={6}><Form.Control type="text"   placeholder="Office Time"   value={officetime} onChange={(event) => setOfficetime(event.target.value)} /></Col>
                                <Col lg={6}><Form.Control type="text"   placeholder="Day Off"       value={offday}     onChange={(event) => setOffday(event.target.value)}     /></Col>
                                <Col lg={12}>
                                    <div className="modal-btns">
                                        <Button variant="primary"   onClick={()=> handleEditButton(singleData._id)}>Save Changes</Button>
                                        <Button variant="secondary" onClick={handleClose}>Close popup</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

