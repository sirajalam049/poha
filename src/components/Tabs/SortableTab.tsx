import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useState } from 'react';


export type TabId<T extends string | number = number> = T

export interface TabProps<T extends TabId = TabId<number>> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    tabId: T;
    isActive?: boolean;
    onRemove?: (tabId: T) => void;
}

const unselectable:React.CSSProperties = {
    'WebkitTouchCallout': 'none',
    'WebkitUserSelect': 'none',
    'KhtmlUserSelect':'none',
    'MozUserSelect': 'none',
    'msUserSelect': 'none',
    'userSelect': 'none',
}

const SortableItem: FC<TabProps> = ({ tabId, isActive, onRemove, ...restProps }: TabProps) => {

    const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: tabId });
    const [tabHover, setTabHover] = useState(false)
    const [closeHover, setCLoseHover] = useState(false)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...restProps.style,
    };

    const tabStyle:React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: tabHover ? '#383838' : '#282828',
        transition: 'ease-in-out',
        cursor: 'default'
    }

    const textContainer:React.CSSProperties = {
        color: '#bcc3cb',
        fontSize: 12,
        marginLeft: 8,
        wordWrap: 'unset',
        overflow: 'ellipsis',
        flex: 1,
        textAlign: 'center'
    }

    const activeTab = {
        backgroundColor: '#4a4a4a',
        zIndex: 5
    }

    return (
        <div
            {...restProps}
            onMouseEnter={e => setTabHover(true)}
            onMouseLeave={e => setTabHover(false)}
            ref={setNodeRef}
            style={{ ...style, ...tabStyle, ...(isActive ? activeTab : {}), ...unselectable }}
            {...attributes}
            {...listeners}
        >
            <div style={{
                fontSize: 12,
                height: 16, width: 16, borderRadius: 2,
                display: 'flex',
                visibility: tabHover ? 'visible' : 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: closeHover ? '#dee1e5' : 'transparent',
                transition: 'ease-in-out',
                padding: 2,
                marginLeft: 8,
                color: '#bcc3cb'
            }}
                onMouseEnter={e => setCLoseHover(true)}
                onMouseLeave={e => setCLoseHover(false)}

                onClick={() => onRemove?.(tabId)} >&#10005;</div>
            <div style={{ ...textContainer }} >{tabId + " New Tab"}</div>
        </div>
    );
}

export default SortableItem