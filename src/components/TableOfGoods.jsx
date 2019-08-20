import React, { PureComponent } from 'react';
import { Table, Button, Container, Row, Spinner } from 'react-bootstrap';

import { map } from 'lodash';
import axios from 'axios';
import { formatters } from '../helpers';

const GOODS_URL = 'http://aff799b6dc01711e9bbbf0a74a39d85c-202741401.eu-west-2.elb.amazonaws.com/goods';

const buttonRowStyles = { margin: '20px 0' };
const tableContainerStyles = { height: 800, overflow: 'auto' };

class TableOfGoods extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            goods: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.getGoods();
    }
    getGoods = () => this.setState(
        { isLoading: true },
        () => axios.get(GOODS_URL)
            .then(this.handleFetchGoodsSucceed)
            .catch(this.handleError)
            .finally(
                () => this.setState({ isLoading: false })
            )
    );
    handleFetchGoodsSucceed = ({ data }) => this.setState({ goods: data.goods });

    createGoods = () => this.setState(
        { isLoading: true },
        () => axios.put(`${GOODS_URL}/create/1`)
            .then(this.handleCreateGoodsSucceed)
            .catch(this.handleError)
            .finally(() => this.setState({ isLoading: false }))
    );
    handleCreateGoodsSucceed = ({ data }) => this.setState({
        goods: this.state.goods.concat(data.goods)
    });

    handleError = e => alert(e);

    render() {
        const { isLoading, goods } = this.state;
        return (
            <Container>
                <Row style={buttonRowStyles}>
                    <Button onClick={this.createGoods} disabled={isLoading}>
                        { isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> }
                        Add one item
                    </Button>
                </Row>
                <div style={tableContainerStyles}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>price</th>
                                <th>created at</th>
                                <th>updated at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                map(goods, item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{formatters.formatTime(item.created_at)}</td>
                                        <td>{formatters.formatTime(item.updated_at)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        );
    }
}

export default TableOfGoods;
