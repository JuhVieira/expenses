import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Container, CssBaseline, Grid } from '@material-ui/core';

import TableList from '../../components/table/Table';
import Modal from '../../components/modalExpense/Modal'

import { getCollection, deleteItem, saveItem } from '../../providers/firebaseProvider';
import { updateExpenses } from '../../redux/actions/expensesActions';
import { isLoading } from '../../redux/actions/rootActions';

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
        const { updateExpenses, isLoading } = this.props
        isLoading(true)
        await getCollection('expenses', async ({ docs = [] }) => {
            updateExpenses(docs)
            isLoading(false)
        })
    }

    handleModalChange(item) {
        this.setState((state) => ({
            ...state,
            is_open: !state.is_open,
            item_selected: item ?
            { ...item, date: item.date.toDate() } :
            { date: new Date(), description: '', value: '', paid: false }
        }))
    }

    handleChange = (value, key) => {
        this.setState(({ item_selected }) => ({
            item_selected: {
                ...item_selected, ...{ [key]: value }
            }
        }))
    }

    async deleteItem(id) {
        await deleteItem('expenses', id)
    }

    async save(e) {
        e.preventDefault();
        const { item_selected } = this.state
        await saveItem('expenses', item_selected)
        this.handleModalChange()
    }

    render() {
        const { is_open, item_selected } = this.state
        const { expenses, columns, is_loading, is_loading_modal } = this.props
        return (
            <Container>
                <CssBaseline />
                <Grid
                    container
                    direction="row"
                    justify="center"
                >
                    <TableList
                        columns={columns}
                        items={expenses}
                        title="Lista de Despesas"
                        loading={is_loading}
                        openModal={(item) => this.handleModalChange(item)}
                        deleteItem={(id) => this.deleteItem(id)}
                    />
                    <Modal is_open={is_open}
                        close={() => this.handleModalChange()}
                        item={item_selected}
                        loading={is_loading_modal}
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
        columns: state.expenses.columns,
        is_loading: state.root.is_loading,
        is_loading_modal: state.root.is_loading_modal,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateExpenses: docs => dispatch(updateExpenses(docs)),
    isLoading: (value) => dispatch(isLoading(value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ListExpenses)