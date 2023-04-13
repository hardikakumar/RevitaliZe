import './Reminders.css'
import React, { useState, useEffect } from "react"
import axios from "axios"
import { TextField, MenuItem } from "@mui/material";
import { Form, FormGroup } from 'reactstrap';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers';
import { useLocation } from 'react-router-dom';

function Reminders() {
    let id = useLocation();

    const [reminderMsg, setReminderMsg] = useState("")
    const [remindAt, setRemindAt] = useState()
    const [reminderList, setReminderList] = useState([])
    const [reminderFreq, setReminderFreq] = useState()


    useEffect(() => {
        axios.get("http://localhost:5000/getAllReminder").then(res => setReminderList(res.data))
    }, [])

    const addReminder = () => {
        axios.post("http://localhost:5000/addReminder", { reminderMsg, remindAt, reminderFreq })
            .then(res => setReminderList(res.data))
        setReminderMsg("")
        setRemindAt()
        setReminderFreq()
        axios.get("http://localhost:5000/getAllReminder").then(res => setReminderList(res.data))
    }

    const deleteReminder = (id) => {
        axios.post("http://localhost:5000/deleteReminder", { id })
            .then(res => setReminderList(res.data))
    }


    return (
        <div className="Reminder">
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
            </div>
        </div>
    )
}
export default Reminders;