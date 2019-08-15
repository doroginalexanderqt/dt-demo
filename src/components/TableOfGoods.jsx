import React, { PureComponent } from 'react';
import { Table, Button, Container, Row, Alert } from 'react-bootstrap';
import { map } from 'lodash';
import axios from 'axios';
import { formatters } from '../helpers';

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
        () => axios.get('http://34.98.87.87/goods')
            .then(({ data }) => this.setState({ items: data.goods }))
            .catch(e => alert(e))
            .finally(
                () => this.setState({ isLoading: false })
            )
    );
    addItems = () => this.setState(
        { isLoading: true },
        () => axios.put('http://34.98.87.87/goods/create/1')
            .then(this.getItems)
            .catch(e => alert(e))
            .finally(() => this.setState({ isLoading: false }))
    );
    render() {
        const { isLoading, items = [] } = this.state;
        return (
            <Container>
                <Row style={{ margin: '20px 0' }}>
                    <Button onClick={this.addItems}>Add one item</Button>
                </Row>
                { isLoading
                    ? <Alert variant="info">Is loading...</Alert>
                    : (
                        <Row style={{ height: '800px', overflow: 'auto' }}>
                            <Table striped bordered hover size="sms">
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
                        </Row>
                    )}
            </Container>
        );
    }
}

export default TableOfGoods;
