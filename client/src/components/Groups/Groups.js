import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupsItem from './GroupsItem';
import {getGroups, getMyGroups} from "../../actions/groupActions";
import {Link} from "react-router-dom";

class Groups extends Component {
    componentDidMount() {
        this.props.getGroups();
    }

    render() {
        const {groups, loading} = this.props.group;
        const {auth} = this.props;
        let groupItems;
        if (groups === null || loading) {
            groupItems = <Spinner/>;
        } else {
            if (groups.length > 0) {
                groupItems = groups.map(group => (
                    <GroupsItem key={group._id} group={group}/>
                ));
            } else {
                groupItems = <h4>No profiles found...</h4>;
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div>
                        <button className="btn btn-info mr-2"
                                onClick={this.props.getGroups.bind(this)}
                        >
                            All Group
                        </button>
                        <button className="btn btn-info mr-2"
                                onClick={this.props.getMyGroups.bind(this, auth.user.id)}
                        >
                            My Group
                        </button>
                        <Link to="/create-group" className="btn btn-info">
                            Create Group
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-1">
                            {groupItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Groups.propTypes = {
    getGroups: PropTypes.func.isRequired,
    getMyGroups: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {getGroups, getMyGroups})
(Groups);