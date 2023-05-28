import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

export interface EditorProps {
    data: any
}

export const Editor: React.FC<EditorProps> = ({ data }) => {
    const divEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let editor: monaco.editor.IStandaloneCodeEditor;
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: undefined,
                language: 'json',
                minimap: {
                    enabled: false
                },
                scrollBeyondLastLine: false
            });
            const formattedJson = JSON.stringify(data, null, 4);
            const model = monaco.editor.createModel(formattedJson, 'json');
            editor.setModel(model);
            monaco.editor.getModels()[0].updateOptions({ tabSize: 4 });
        }
        return () => {
            editor.dispose();
        };
    }, [data]);
    return <div style={{ height: '500px' }} ref={divEl}></div>;
};