import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messageActions } from '../actions';

const mapStateToProps = state => ({ ...state }); // reselect
const mapDispatchToProps = dispatch => ({
    // messageReceive: bindActionCreators(messageActions.messageReceive, dispatch)
});

class Skeleton extends PureComponent {
    render() {
        return <div> Container </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skeleton);
