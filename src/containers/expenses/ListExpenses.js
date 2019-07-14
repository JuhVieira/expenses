import React, { Component } from 'react';
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Typography } from '@material-ui/core';

import TableList from '../../components/table/Table';
import Modal from '../../components/modalExpense/Modal'

import { getCollection, deleteExpense, saveExpense, addExpense } from '../../providers/firebaseProvider';
import { updateExpenses } from '../../redux/actions/expensesActions';


class ListExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            is_open: false,
            item_selected: {}
        }
        this.save = this.save.bind(this)
    }

    async componentDidMount() {
        const { updateExpenses } = this.props
        await getCollection('expenses', async ({ docs }) => {
            updateExpenses(docs)
        })
    }

    handleModalChange(item) {
        this.setState({
            ...this.state,
            is_open: !this.state.is_open,
            item_selected: item ? { ...item, date: item.date.toDate() } : { date: new Date() }
        })
    }

    handleChange = (value, key) => {
        console.log(value)
        this.setState(({ item_selected }) => ({
            item_selected: {
                ...item_selected, ...{ [key]: value }
            }
        }))
    }

    async deleteItem(id) {
        await deleteExpense(id)
    }

    async save(e) {
        e.preventDefault();
        const { item_selected } = this.state
        await saveExpense(item_selected)
        this.handleModalChange()
    }

    render() {
        const { is_open, item_selected } = this.state
        const { expenses } = this.props
        return (
            <Container style={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    // alignItems="top"
                >
                    <TableList items={expenses}
                        openModal={(item) => this.handleModalChange(item)}
                        deleteItem={(id) => this.deleteItem(id)}
                    />
                    <Modal is_open={is_open}
                        close={() => this.handleModalChange()}
                        item={item_selected}
                        handleChange={this.handleChange}
                        save={this.save}
                    />
                </Grid>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        expenses: state.expenses.values,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateExpenses: docs => dispatch(updateExpenses(docs))
})


export default connect(mapStateToProps, mapDispatchToProps)(ListExpenses)