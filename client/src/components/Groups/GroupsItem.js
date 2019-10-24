import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteGroup, getGroup,askToJoinGroup,cancelToJoinGroup} from "../../actions/groupActions";
import isEmpty from "../../validation/is-empty";

class GroupsItem extends Component {

    render() {
        const {group, auth} = this.props;
        let joinButton;
        let memperIDs = [];
        let requestIDs = [];
        let managerIDs = [];
        if (group.members) {
            memperIDs = group.members.map(member => member.user);
        }
        if (group.managers) {
            managerIDs = group.managers.map(member => member.user);
        }
        if (group.requests) {
            requestIDs = group.requests.map(member => member.user);
        }
        if (group.user === auth.user.id) {
            joinButton = (
                <button
                    onClick={this.props.deleteGroup.bind(this, group._id)}
                    className="btn btn-danger">
                    Delete The Group
                </button>
            )
        } else if (memperIDs.indexOf(auth.user.id) >= 0) {
            joinButton = (
                <button
                    // onClick={this.props.followingUser.bind(this, auth.user.id, group.user._id)}
                    className="btn btn-danger">
                    Leve The Group
                </button>
            )
        } else if (requestIDs.indexOf(auth.user.id) >= 0) {
            joinButton = (
                <button
                    onClick={this.props.cancelToJoinGroup.bind(this,  group._id,auth.user.id)}
                    className="btn btn-danger">
                    cancel the request
                </button>
            )
        } else {
            joinButton = (
                <button
                    onClick={this.props.askToJoinGroup.bind(this,  group._id,auth.user.id)}
                    className="btn btn-info">
                    Join The Group
                </button>
            )
        }

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>
                            Name: <Link to={`/groups/${group._id}`} onClick={this.props.getGroup.bind(this, group._id)}>
                            {group.name}
                        </Link>
                        </h3>
                        <p>
                            Description: {group.description}
                        </p>
                        <div>
                            {joinButton}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <p>Members: {memperIDs.length}</p>
                        <p>Managers: {managerIDs.length}</p>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        {group.interestedin ? (
                            <div>
                                <h4>Interestedin</h4>
                                <ul className="list-group">
                                    {group.interestedin.slice(0, 4).map((skill, index) => (
                                        <li key={index} className="list-group-item">
                                            <i className="fa fa-check pr-1"/>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})
GroupsItem.propTypes = {
    deleteGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
    askToJoinGroup: PropTypes.func.isRequired,
    cancelToJoinGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    {deleteGroup, getGroup,askToJoinGroup,cancelToJoinGroup}
)(GroupsItem);