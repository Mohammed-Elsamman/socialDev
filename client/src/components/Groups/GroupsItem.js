import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from "../../validation/is-empty";

class GroupsItem extends Component {

    render() {
        const {group, auth} = this.props;
        let joinButton;
        let memperIDs = group.members.map(member => member.user);
        let requestIDs = group.requests.map(member => member.user);
        if (group.user === auth.user.id) {
            joinButton = (
                <button
                    // onClick={this.props.followingUser.bind(this, auth.user.id, group.user._id)}
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
            joinButton = null
        } else {
            joinButton = (
                <button
                    // onClick={this.props.followingUser.bind(this, auth.user.id, group.user._id)}
                    className="btn btn-info">
                    Join The Group
                </button>
            )
        }

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>Name:
                           <Link to={"/"}>
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
                        <p>Members: {group.members.length}</p>
                        <p>Managers: {group.managers.length}</p>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
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
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})
GroupsItem.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(GroupsItem);