import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseStyle from '../components/CourseStyle';
import { showCourses } from '../redux/action/Course.action';
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';
import { loadAdmin } from '../redux/action/Auth.action';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Course = () => {
    const { course } = useSelector((state => state.courseReducer));
    const { admin } = useSelector((state => state.authReducer));
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(showCourses())
        dispatch(loadAdmin())
    }, [])

    if (course === null) {
        return (
            <Box mt={20} sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                {admin ? <h2>Welcome, You are an Admin</h2> : <h2>Welcome, You are a Viewer</h2>}

                <button type="button" class="btn btn-info" onClick={handleOpen}>Create Course</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>

            </div>
            {course && course.map(crs => <CourseStyle crs={crs}></CourseStyle>)}
        </div>
    );
};

export default Course;