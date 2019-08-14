import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messageActions } from '../actions';

const mapStateToProps = state => ({ ...state }); // todo: reselect
const mapDispatchToProps = dispatch => ({
    messageReceive: bindActionCreators(messageActions.messageReceive, dispatch)
});

class Skeleton extends PureComponent {
    messageReceive = () => this.props.messageReceive(); // eslint-disable-line
    render() {
        return <div onClick={this.messageReceive}> Container </div>;
    }
}

export default Skeleton;

// export default connect(mapStateToProps, mapDispatchToProps)(Skeleton);
