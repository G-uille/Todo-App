import React from "react";
import { TaskAlt } from '@mui/icons-material/';

const CardCompletedTasks: React.FC = () => {
    return(
        <div className="container-completed-tasks">
            <TaskAlt sx={{ fontSize: "60px", marginBottom: "10px" }} />
            <span>You have no pending tasks</span>
        </div>
    )
};
export default CardCompletedTasks;