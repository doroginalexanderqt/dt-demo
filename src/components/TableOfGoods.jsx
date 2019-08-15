import React, { PureComponent } from 'react';
import { Table, Button, Container, Row, Spinner } from 'react-bootstrap';

import { map } from 'lodash';
import axios from 'axios';
import { formatters } from '../helpers';

const GOODS_URL = 'http://34.98.87.87/goods';

const tableStyles = { height: '800px', overflow: 'auto' };
const buttonStyles = { margin: '20px 0' };

class TableOfGoods extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.getItems();
    }
    getItems = () => this.setState(
        { isLoading: true },
        () => axios.get(GOODS_URL)
            .then(({ data }) => this.setState({ items: data.goods }))
            .catch(this.handleError)
            .finally(
                () => this.setState({ isLoading: false })
            )
    );
    addItems = () => this.setState(
        { isLoading: true },
        () => axios.put(`${GOODS_URL}/create/1`)
            .then(this.getItems)
            .catch(this.handleError)
            .finally(() => this.setState({ isLoading: false }))
    );
    handleError = e => alert(e);

    render() {
        const { isLoading, items } = this.state;
        return (
            <Container>
                <Row style={buttonStyles}>
                    <Button onClick={this.addItems} disabled={isLoading}>
                        { isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> }
                        Add one item
                    </Button>
                </Row>
                { isLoading
                    ? <Spinner animation="border" variant="primary" />
                    : (
                        <Table striped bordered hover size="sms" style={tableStyles}>
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
                                    map(items, item => (
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
                    )}
            </Container>
        );
    }
}

export default TableOfGoods;
