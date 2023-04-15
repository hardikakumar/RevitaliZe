import React, { useState, useEffect } from "react"
import axios from "axios"
import { TextField, MenuItem } from "@mui/material";
import { Form, FormGroup } from 'reactstrap';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers';
import { useLocation } from 'react-router-dom';
import Navbar from '../Dashboard/NavBar';
import Sidebar from '../Dashboard/SideBar';
import './Reminders.css'

function Reminders() {
    let id = useLocation();
    const member_id = id.state.id;

    const [reminderMsg, setReminderMsg] = useState("")
    const [remindAt, setRemindAt] = useState()
    const [reminderList, setReminderList] = useState([])
    const [reminderFreq, setReminderFreq] = useState()


    useEffect(() => {
        if (member_id != null)
            axios.post("http://localhost:5000/getAllReminder", { member_id }).then(res => setReminderList(res.data))
    }, [])

    const addReminder = () => {
        axios.post("http://localhost:5000/addReminder", { reminderMsg, remindAt, reminderFreq, member_id })
            .then(res => setReminderList(res.data))
        setReminderMsg("")
        axios.post("http://localhost:5000/getAllReminder", { member_id }).then(res => setReminderList(res.data))
    }

    const deleteReminder = (reminder_id) => {
        axios.post("http://localhost:5000/deleteReminder", { reminder_id, member_id })
            .then(res => setReminderList(res.data))
    }

    return (
        <div>
            <Navbar />
            <div class="container-fluid reminderBG" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar member_id={id.state.id} member_name={id.state.name} />

                    <div className="col main pt-5 mt-3">
                        <div className="reminder_homepage">
                            <div className="reminder_homepage_header">
                                <h1>Remind Me 🕰️</h1>
                                <Form>
                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                sx={{ width: 270 }}
                                                label='Reminder Note'
                                                placeholder='Reminder notes here...'
                                                value={reminderMsg}
                                                onChange={e => setReminderMsg(e.target.value)}

                                            />
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-frequency"
                                                select
                                                label="Frequency"
                                                placeholder="Frequency of reminder"
                                                sx={{ width: 270 }}
                                                value={reminderFreq}
                                                onChange={e => setReminderFreq(e.target.value)}
                                            >
                                                <MenuItem key={'Eday'} value={24}>Everyday</MenuItem>
                                                <MenuItem key={'Eweek'} value={168}>Every Week</MenuItem>
                                                <MenuItem key={'Ehour'} value={1}>Every Hour</MenuItem>
                                                <MenuItem key={'Esix'} value={6}>Every 6 hours</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>
                                </Form>

                                <FormGroup row>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                // defaultValue={dayjs('2022-04-17T15:30')} 
                                                label='Starting date & time'
                                                value={remindAt}
                                                onChange={setRemindAt}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </FormGroup>

                                <div className="button" onClick={addReminder}>Add Reminder</div>
                            </div>


                            {reminderList.length > 0 ?
                                <div className="reminder_homepage_body">
                                    {
                                        reminderList.map(reminder => (
                                            <div className="reminder_card" key={reminder._id}>
                                                <h2>{reminder.reminderMsg}</h2>
                                                <h3>Next reminder at:</h3>
                                                <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
                                                <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reminders;