import { useEffect } from "react";

interface Task {
    idTask: string;
    task: string;
  }
  
interface TaskHook {
    tasksArray: Task[];
    setTaskNumber: (taskNumber: number) => void;
}

const useTaskNumberUpdate = ({ tasksArray, setTaskNumber }: TaskHook): void => {

    useEffect(() => {
        const onChangeTaskNumber = () => {
            let taskNumber = tasksArray.length
            setTaskNumber(taskNumber);
        };

        onChangeTaskNumber();

    }, [tasksArray, setTaskNumber]);

};

export default useTaskNumberUpdate;