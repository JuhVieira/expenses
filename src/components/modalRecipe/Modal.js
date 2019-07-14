import React from 'react';

import { 
    Modal,
    Typography,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Button,
    Paper,
    TextField,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment';
import './Modal.scss';

const ModalEdit = ({ is_open, close, item, handleChange, save }) => (
    <Modal
        open={is_open}
        onClose={() => close()}
        className="modal"
    >
        <Paper className="paper">
            <Typography variant="h6" id="tableTitle" className="header">
                Edição de Despesas
        </Typography>
            <form className="form" onSubmit={(e) => save(e)}>
                <TextField
                    label="Descrição"
                    id="description"
                    fullWidth
                    onChange={({ target }) => handleChange(target.value, 'description')}
                    value={item.description}
                    required
                />
                {/* <TextField
                    label="With normal TextField"
                    id="simple-start-adornment"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                    }}
                /> */}
                <TextField
                    id="simple-start-adornment"
                    label="Valor"
                    value={item.value}
                    onChange={({ target }) => handleChange(Number(target.value), 'value')}
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    margin="normal"
                    style={{ marginTop: 25 }}
                    required
                />
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.received}
                                onChange={() => handleChange(!item.received, 'received')}
                                color="primary"
                            />
                        }
                        label="Recebido"
                        style={{ marginTop: 25 }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="mui-pickers-date"
                            label="Data"
                            value={moment(item.date)}
                            onChange={(value) => handleChange(value, 'date')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            format="dd/MM/yyyy"
                            style={{ marginTop: 25 }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <Button variant="contained" color="primary" type="submit" style={{ marginLeft: "auto", marginTop: 25 }}>
                    Salvar
                </Button>
            </form>
        </Paper>
    </Modal>
)

export default ModalEdit