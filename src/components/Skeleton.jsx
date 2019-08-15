import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { map } from 'lodash';
import axios from 'axios';
import moment from 'moment';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { messageActions } from '../actions';

// const mapStateToProps = state => ({ ...state }); // todo: reselect
// const mapDispatchToProps = dispatch => ({
//     messageReceive: bindActionCreators(messageActions.messageReceive, dispatch)
// });

const formatTime = ({ date, timezone, timezone_type }) =>
    `${moment(date).format('MMMM Do YYYY, H:mm:ss')} (${timezone} ${timezone_type})`;

class Skeleton extends PureComponent {
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
            // .catch(e => alert(e))
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
                { isLoading && <div>Is loading...</div> }
                <Row style={{ margin: '20px 0' }}>
                    <Button onClick={this.addItems}>Add one item</Button>
                </Row>
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
                                        <td>{formatTime(item.created_at)}</td>
                                        <td>{formatTime(item.updated_at)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    }
}

export default Skeleton;

// export default connect(mapStateToProps, mapDispatchToProps)(Skeleton);
