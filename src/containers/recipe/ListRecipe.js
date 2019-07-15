import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Container, CssBaseline, Grid } from '@material-ui/core';

import TableList from '../../components/table/Table';
import Modal from '../../components/modalRecipe/Modal'

import { getCollection, deleteItem, saveItem } from '../../providers/firebaseProvider';
import { updateRevenue } from '../../redux/actions/revenueActions';
import { isLoading } from '../../redux/actions/rootActions';


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
        const { updateRevenue, isLoading, auth } = this.props
        isLoading(true)
        await getCollection('revenue', async ({ docs }) => {
            updateRevenue(docs)
            isLoading(false)
        }, auth.uid)
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
        const { auth } = this.props
        await saveItem('revenue', item_selected, auth.uid)
        this.handleModalChange()
    }

    render() {
        const { is_open, item_selected } = this.state
        const { revenue, columns, is_loading, is_loading_modal } = this.props
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
                        loading={is_loading}
                        title="Lista de Receitas"
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


const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    revenue: state.revenue.values,
    columns: state.revenue.columns,
    is_loading: state.root.is_loading,
    is_loading_modal: state.root.is_loading_modal
})


export default connect(mapStateToProps, { updateRevenue, isLoading })(ListRevenue)