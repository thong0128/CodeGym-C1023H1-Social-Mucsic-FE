import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
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
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div className={"container1"}>
                            <div className="wrapper bg-white">
                                <div className="h2 text-center">MP3</div>
                                <div className="h4 text-muted text-center pt-2">Enter your login details</div>
                                <form className="pt-3">
                                    <div className="form-group py-2">
                                        <div className="input-field"><span className="far fa-user p-2"></span>
                                            <input id="login-name" name={"username"} type="text"
                                                   placeholder="Enter your username" required className=""
                                                   />
                                        </div>
                                    </div>
                                    <div className="form-group py-1 pb-2">
                                        <div className="input-field"><span className="fas fa-lock p-2"></span>
                                            <input id="login-pass" type="password" name={"password"}
                                                   placeholder="Enter your Password" required className=""
                                                  />
                                            <button className="btn bg-white text-muted"><span
                                                className="far fa-eye-slash"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start">
                                        <div className="ml-auto"><a href="#" id="forgot">Forgot Password?</a></div>
                                    </div>
                                    <button className="btn btn-block text-center my-3" >Log
                                        in
                                    </button>
                                    <div className="text-center pt-3 text-muted">Not a member?</div>
                                </form>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
