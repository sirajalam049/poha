import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, Tab } from '@mui/material';
import React, { useState } from 'react';
import SortableItem, { TabId } from './Tabs/SortableTab';

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

let counter = 0

const BrowserTabs: React.FC = () => {

    const [tabs, setTabs] = useState<TabId[]>([counter++]);
    const [activeTab, setActiveTab] = useState<TabId>(-1);

    const handleTabChange = (newActiveTab: TabId) => {
        setActiveTab(newActiveTab);
    };

    const handleTabClose = (id: TabId) => {
        setTabs(tabs.filter(t => t != id));
        const index = tabs.findIndex(t => t == id)
        const nextIndex = tabs.length == 1 ? -1 : (index == tabs.length - 1 ? tabs[index - 1] : tabs[index + 1])
        if (id === activeTab) {
            setActiveTab(nextIndex);
        }
    };

    const handleTabAdd = () => {
        const newId = counter++
        setTabs([...tabs, newId]);
        if (activeTab == -1) {
            setActiveTab(newId);
        }
    };


    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTabs((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Box style={{backgroundColor: '#4a4a4a'}} >
            <Box display={'flex'} >
                <Box flex={1} />
                <IconButton onClick={handleTabAdd} aria-label="Add Tab">
                    <AddIcon />
                </IconButton>
            </Box>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
            >
                <SortableContext
                    items={tabs}
                    strategy={horizontalListSortingStrategy}
                >
                    <div style={{ display: "flex", height: 28, position: 'relative' }} >
                        {tabs.map((tab) => (
                            <SortableItem
                                style={{ flex: 1, transition: 'ease-in-out', }}
                                onRemove={handleTabClose}
                                onMouseDown={() => { handleTabChange(tab) }}
                                isActive={tab === activeTab}
                                key={tab}
                                tabId={tab}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </Box>
    );
};

export default BrowserTabs;
