import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { TextField } from "@mui/material";
import axios from 'axios';

function Feedback({ member_id, member_name }) {
    const [feedbackMsg, setMsg] = useState();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:5000/UserFeedbacks', { member_id, feedbackMsg });
            alert('Feedback successfully posted');
            setMsg("")
        }
        catch (error) {
            console.error(error);
            alert('Login failed');

        }
    };

    return (
        <div>
            <Form>
                <FormGroup row>
                    <div>
                        <TextField
                            disabled
                            fullWidth
                            id="outlined-name"
                            variant="filled"
                            label="Name"
                            defaultValue={member_name}
                        />
                    </div>
                </FormGroup>

                <FormGroup row>
                    <div>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            id="outlined-feedback"
                            label="Feedback"
                            value={feedbackMsg}
                            placeholder="Write your feedback here..."
                            onChange={e => setMsg(e.target.value)}
                        />
                    </div>
                </FormGroup>

                <p></p>
                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                    SUBMIT
                </button>
            </Form>
        </div>
    )
}

export default Feedback
