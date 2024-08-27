import React, { useState } from 'react';
import { Button, Typography, Box, Sheet } from '@mui/joy';
import Task from './Task';
import { useDrop } from 'react-dnd';
import CreateTaskModal from '../modals/CreateTaskModal';
import { Add } from '@mui/icons-material';

interface ColumnProps {
    id: string;
    title: string;
    tasks: { id: string, content: string, subtasks: string[] }[];
    moveCard: (fromColumnId: string, toColumnId: string, taskId: string, subtaskIndex?: number) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, tasks, moveCard }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item: { type: string; content: string; fromColumnId: string; taskId: string; subtaskIndex?: number }) => {
            if (item.fromColumnId !== id) {
                moveCard(item.fromColumnId, id, item.taskId, item.subtaskIndex);
            }
        },
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <Sheet ref={drop} style={{ width: '300px', padding: '16px', borderRadius: '4px' }}>
            <Typography level='title-lg'>{title} | {tasks.length}</Typography>
            <Button
                fullWidth
                onClick={handleOpenModal}
                sx={{
                    my: 1,
                }}
            >
                <Add />
            </Button>
            {tasks.map((task) => (
                <Box>
                    <Task key={task.id} task={task} fromColumnId={id} moveCard={moveCard} />
                </Box>
            ))}
            <CreateTaskModal open={isModalOpen} onClose={handleCloseModal} />
        </Sheet>

    );
};

export default Column;