import { Button, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { FormikValues } from 'formik';
import React, { FC } from 'react';

export interface QueryParamsInputProps {
    formikProps: FormikValues
}

const QueryParamsInput: FC<QueryParamsInputProps> = ({ formikProps }) => {

    const addRow = () => {
        formikProps.setValues({
            params: [...formikProps.values.params, { key: '', value: '' }],
        });
    };

    const deleteRow = (index: number) => {
        formikProps.setValues({
            params: formikProps.values.params.filter((_: any, i: number) => i !== index),
        });
    };

    const handleKeyChange = (index: number, e: React.SyntheticEvent) => {
        if (index === formikProps.values.params.length - 1) {
            addRow();
        }
        formikProps.handleChange(e);
    };

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {formikProps.values.params.map((param: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    name={`params[${index}].key`}
                                    value={param.key}
                                    onChange={(e) => handleKeyChange(index, e)}
                                    label="Key"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    name={`params[${index}].value`}
                                    value={param.value}
                                    onChange={formikProps.handleChange}
                                    label="Value"
                                />
                            </TableCell>
                            <TableCell>
                                {
                                    formikProps.values.params.length > 1 ?
                                        <Button variant="contained" color="secondary" onClick={() => deleteRow(index)}>
                                            Delete
                                        </Button>
                                        : null
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default QueryParamsInput