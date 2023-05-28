import React, { useState } from 'react';
import { Tabs, Tab, IconButton, Box } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

interface DraggableTabProps {
    label: string;
    onDelete: () => void;
    onDragStart: React.DragEventHandler<HTMLDivElement>;
    onDrop: React.DragEventHandler<HTMLDivElement>;
    value: number;
    onClick: any
}

const DraggableTab: React.FC<DraggableTabProps> = (props) => {
    const { label, onDelete, onDragStart, onDrop, value, onClick } = props;

    return (
        <Tab
            onClick={onClick}
            value={value}
            component="div"
            label={
                <Box display={'flex'} >
                    {label}
                    <IconButton aria-label="Close" size="small" onClick={onDelete}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            }
            draggable
            onDragStart={onDragStart}
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
        />
    );
};
const BrowserTabs: React.FC = () => {
    const [tabs, setTabs] = useState<string[]>(['Tab 1']);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newActiveTab: number) => {
        setActiveTab(newActiveTab);
    };

    const handleTabClose = (index: number) => {
        const newTabs = [...tabs];
        newTabs.splice(index, 1);
        setTabs(newTabs);
        if (index === activeTab && newTabs.length > 0) {
            setActiveTab(Math.min(index, newTabs.length - 1));
        }
    };

    const handleTabAdd = () => {
        const newTabs = [...tabs, `Tab ${tabs.length + 1}`];
        setTabs(newTabs);
        setActiveTab(newTabs.length - 1);
    };

    const handleTabReorder = (event: React.DragEvent<HTMLDivElement>, tabIndex: number, newIndex: number) => {
        const newTabs = [...tabs];
        const movedTab = newTabs.splice(tabIndex, 1)[0];
        newTabs.splice(newIndex, 0, movedTab);
        setTabs(newTabs);
        setActiveTab(newIndex);
    };

    return (
        <Box display={'flex'} >
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Browser Tabs"
            >
                {tabs.map((tab, index) => (
                    <DraggableTab
                        onClick={(e: any) => handleTabChange(e, index)}
                        key={index}
                        label={tab}
                        onDelete={() => handleTabClose(index)}
                        onDragStart={(event) => event.dataTransfer.setData('text/plain', '')}
                        onDrop={(event) => handleTabReorder(event, index, activeTab)}
                        value={index}
                    />
                ))}
            </Tabs>
            <IconButton onClick={handleTabAdd} color="primary" aria-label="Add Tab">
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default BrowserTabs;
