import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback, useState } from "react";

interface TaskProps {
    task: string;
    handleClick: () => void;
}

const CardTask: React.FC<TaskProps> = ({ task, handleClick }) => {

    const [showDelete, setShowDelete] = useState<boolean>(false);

    const onEnter = useCallback(() => { 
        setShowDelete(true);
    }, [setShowDelete]);

    const onLeave = useCallback(() => {
        setShowDelete(false);
    }
    , [setShowDelete]);

    return (
        <div className="container-card-task"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave} >
            <span className="card-task__text">{task}</span>
            <IconButton
                className={`card-task__icon ${showDelete ? "show" : ""}`}
                onClick={handleClick} >
                <Delete />
            </IconButton>
        </div>
    )
}

export default CardTask;