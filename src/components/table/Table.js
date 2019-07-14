import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { Typography } from '@material-ui/core';
import { formatMoney } from '../../utils'
import moment from 'moment'

moment().locale('pt-br')

const TableList = ({ items, openModal, deleteItem }) => (
    <Paper style={{
        width: '100%',
        marginTop: 15,
        overflowX: 'auto'
    }}>
        <Typography variant="h6" id="tableTitle" style={{ margin: 10 }}>
            Lista de Despesas
        </Typography>
        <IconButton onClick={() => openModal()} size="small" aria-label="Delete" style={{ margin: 10 }}>
            <DeleteIcon />
        </IconButton>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Pago?</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item, i) => (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                            {item.description}
                        </TableCell>
                        <TableCell align="center">{formatMoney(item.value)}</TableCell>
                        <TableCell align="center">{moment(item.date.toDate()).format('DD/MM/YYYY')}</TableCell>
                        <TableCell align="center">
                            {item.paid ?
                                <CheckIcon style={{ color: "green", fontWeight: 600 }} /> :
                                null
                            }
                        </TableCell>
                        <TableCell align="right">
                            <IconButton onClick={() => deleteItem(item.id)} size="small" aria-label="Delete" style={{ margin: 10 }}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => openModal(item)} size="small" aria-label="Edit">
                                <CreateIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
)

export default TableList