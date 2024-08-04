import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
    openModal: boolean;
    handleDelete: () => void;
    setOpenModal: (open: boolean) => void;
}

const ModalDeleteTask: React.FC<ModalProps> = ({ openModal, setOpenModal, handleDelete }) => {

    const [open, setOpen] = useState<boolean>(false);

    const modalStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff !important"
    };

    const handleClose = useCallback(() => {
        setOpen(false)
        setOpenModal(false)
    }, []);

    useEffect(() => { setOpen(openModal) }, [openModal]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you delete all the tasks?"}
            </DialogTitle>
            <DialogActions sx={modalStyle}>
                <Button onClick={handleDelete} sx={{ color: "#ffffff" }}>Delete All</Button>
            </DialogActions>
        </Dialog>
    )
};

export default ModalDeleteTask;