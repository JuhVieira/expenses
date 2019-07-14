import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Container, CssBaseline, Grid } from '@material-ui/core';

import TableList from '../../components/table/Table';
import Modal from '../../components/modalRecipe/Modal'

import { getCollection, deleteItem, saveItem } from '../../providers/firebaseProvider';
import { updateRevenue } from '../../redux/actions/revenueActions';


class ListRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open: false,
            item_selected: {}
        }
        this.save = this.save.bind(this)
    }

    async componentDidMount() {
        const { updateRevenue } = this.props
        await getCollection('revenue', async ({ docs }) => {
            updateRevenue(docs)
        })
    }

    handleModalChange(item) {
        this.setState({
            ...this.state,
            is_open: !this.state.is_open,
            item_selected: item ?
             { ...item, date: item.date.toDate() } :
             { date: new Date(), description: '', value: '', received: false }
        })
    }

    handleChange = (value, key) => {
        this.setState(({ item_selected }) => ({
            item_selected: {
                ...item_selected, ...{ [key]: value }
            }
        }))
    }

    async deleteItem(id) {
        await deleteItem('revenue', id)
    }

    async save(e) {
        e.preventDefault();
        const { item_selected } = this.state
        await saveItem('revenue', item_selected)
        this.handleModalChange()
    }

    render() {
        const { is_open, item_selected } = this.state
        const { revenue, columns } = this.props
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
                        items={revenue}
                        title="Lista de Receitas"
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
        revenue: state.revenue.values,
        columns: state.revenue.columns
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateRevenue: docs => dispatch(updateRevenue(docs))
})


export default connect(mapStateToProps, mapDispatchToProps)(ListRevenue)