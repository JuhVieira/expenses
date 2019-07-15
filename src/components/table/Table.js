import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Fab,
    Paper,
    Typography,
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';

import { formatMoney } from '../../utils';
import Loading from '../loading/Loading';
import moment from 'moment';

const TableList = ({ columns, items, title, loading, openModal, deleteItem }) => (
    <>
        {loading ?
            <Loading />
            :
            <Paper style={{
                width: '100%',
                marginTop: 15,
                overflowX: 'auto'
            }}>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: 15,
                }}>
                    <Typography variant="h6" id="tableTitle" style={{ margin: 10 }}>
                        {title}
                    </Typography>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="Add"
                        style={{ margin: 10 }}
                        onClick={() => openModal()}>
                        <AddIcon style={{ marginRight: 5 }} />
                        Adicionar
                    </Fab>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell align={i === 0 ? "left" : "center"} key={i}>
                                    {column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {item.description}
                                </TableCell>
                                <TableCell align="center">{moment(item.date.toDate()).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="center">{formatMoney(item.value)}</TableCell>
                                <TableCell align="center">
                                    {item.paid || item.received ?
                                        <CheckIcon style={{ color: "green", fontWeight: 600 }} /> :
                                        null
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => openModal(item)} size="small" aria-label="Edit">
                                        <CreateIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteItem(item.id)} size="small" color="secondary" aria-label="Delete" style={{ margin: 10 }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        }
    </>
)

export default TableList