import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from '@mui/material';
import { FormikValues } from 'formik';
import React, { FC, useState } from 'react';

export interface QueryParamsInputProps {
    formikProps: FormikValues
}

const QueryParamsInput: FC<QueryParamsInputProps> = ({ formikProps }) => {

    const [showDel, setShowDel] = useState(-1)

    const addRow = () => {
        formikProps.setFieldValue('params', [...formikProps.values.params, { key: '', value: '' }]);
    };

    const deleteRow = (index: number) => {
        formikProps.setFieldValue('params', formikProps.values.params.filter((_: any, i: number) => i !== index));
    };

    const handleKeyChange = (index: number, e: React.SyntheticEvent) => {
        if (index === formikProps.values.params.length - 1) {
            addRow();
        }
        formikProps.handleChange(e);
    };

    return (
        <table style={{ "width": '100%' }} >
            <tbody>
                <tr style={{ display: 'flex' }} >
                    <td style={{ flex: 1 }} >Key</td>
                    <td style={{ flex: 1 }}>Value</td>
                </tr>
                    {formikProps.values.params.map((param: any, index: number) => (
                        <tr
                            onMouseEnter={() => { setShowDel(index) }}
                            onMouseLeave={() => { setShowDel(-1) }}
                            style={{ display: 'flex', position: 'relative' }} key={index}  >
                            <td style={{ flex: 1 }}>
                                <TextField
                                    fullWidth
                                    name={`params[${index}].key`}
                                    value={param.key}
                                    onChange={(e) => handleKeyChange(index, e)}
                                    size='small'
                                    placeholder='Key'
                                />
                            </td>
                            <td style={{ flex: 1 }}>
                                <TextField
                                    fullWidth
                                    name={`params[${index}].value`}
                                    value={param.value}
                                    onChange={formikProps.handleChange}
                                    size='small'
                                    placeholder='Value'
                                />
                            </td>
                            <td>
                                {
                                    index === showDel && index < (formikProps.values.params.length - 1) ?
                                        <IconButton style={{ position: 'absolute', right: '6px', top: '6px' }} size='small' onClick={() => deleteRow(index)}>
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                        : null
                                }
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default QueryParamsInput