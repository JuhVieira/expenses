import React from 'react'
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'
import "moment/locale/pt-br";


import './Modal.scss'
moment().locale('pt-br')

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
                <TextField
                    id="standard-number"
                    label="Valor"
                    value={item.value}
                    onChange={({ target }) => handleChange(Number(target.value), 'value')}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    style={{ marginTop: 25 }}
                />
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.paid}
                                onChange={() => handleChange(!item.paid, 'paid')}
                                color="primary"
                            />
                        }
                        label="Pago"
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