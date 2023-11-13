import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, InputBase, Typography, styled } from '@mui/material';
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
        <div>
            <Box style={{ display: 'flex' }} >
                <TabelCell style={{ borderRight: 0, }}  >
                    <Typography variant='body1' fontWeight={500} >Key</Typography>
                </TabelCell>
                <TabelCell >
                    <Typography variant='body1' fontWeight={500} >Value</Typography>
                </TabelCell>
            </Box>
                    {formikProps.values.params.map((param: any, index: number) => (
                        <Box
                            onMouseEnter={() => { setShowDel(index) }}
                            onMouseLeave={() => { setShowDel(-1) }}
                            style={{ display: 'flex', position: 'relative', height: 32, }} key={index}  >
                            <TabelCell style={{ borderTop: 0, borderRight: 0, }} >
                                <InputBase
                                    sx={{ fontSize: 14 }}
                                    fullWidth
                                    name={`params[${index}].key`}
                                    value={param.key}
                                    onChange={(e) => handleKeyChange(index, e)}
                                    size='small'
                                    placeholder='Key'
                                />
                            </TabelCell>
                            <TabelCell style={{ borderTop: 0 }}>
                                <InputBase
                                    sx={{ fontSize: 14 }}
                                    fullWidth
                                    name={`params[${index}].value`}
                                    value={param.value}
                                    onChange={formikProps.handleChange}
                                    size='small'
                                    placeholder='Value'
                                />
                            </TabelCell>

                                {
                                index === showDel && index < (formikProps.values.params.length - 1) ?
                                    <Box>
                                        <IconButton style={{ position: 'absolute', right: '6px', top: '6px' }} size='small' onClick={() => deleteRow(index)}>
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </Box>
                                        : null
                                }

                        </Box>
                    ))}
        </div>
    )
}

export default QueryParamsInput

const TabelCell = styled(Box)(({ theme }) => ({
    flex: 1,
    height: 32,
    border: '1px solid var(--Default-Grey-2, #C7C7CC)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 16
}))