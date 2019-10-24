import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {geGroupManagers,} from "../../actions/groupActions";


class GroupManagers extends Component {
    componentDidMount() {
        this.props.geGroupManagers(this.props.match.params.id)
    }

    render() {
        const {group, loading} = this.props.group
        const {auth} = this.props
        let groupAbout;
        let groupMembers;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            groupAbout = <GroupAbout group={group}/>
            if (group.managers.length > 0) {
                let adminIds = group.managers.map(manager => manager.user);
                let isUserIsAdmin = adminIds.indexOf(auth.user.id);
                if (group.user._id === auth.user.id) {
                    console.log(5);
                    groupMembers = group.managers.map(manager => (
                            <div className="row mb-1">
                                <div className="col-md-2">
                                    <Link to="">
                                        <img
                                            className="rounded-circle d-none d-md-block"
                                            src={manager.user.avatar}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className="col-md-2">
                                    <h3>{manager.user.name}</h3>name
                                </div>
                                <div className="col-md-4">
                                    <Link to={`/profile/${manager.user.handle}`}
                                          className="col-8 btn btn-lg btn-info mr-1">
                                        Profile
                                    </Link>
                                </div>
                                {group.user._id === manager.user._id ? (
                                    <div className="col-md-4">
                                        <Link to={`/profile/${manager.user.handle}`}
                                              className="col-8 btn btn-lg btn-danger mr-1">
                                            Delete Admin
                                        </Link>
                                    </div>
                                ) : null}

                            </div>
                        )
                    )
                } else {
                    console.log(88);
                    groupMembers = group.managers.map(manager => (
                            <div className="row mb-1">
                                <div className="col-md-2">
                                    <Link to="">
                                        <img
                                            className="rounded-circle d-none d-md-block"
                                            src={manager.user.avatar}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className="col-md-2">
                                    <h3>{manager.user.name}</h3>name
                                </div>
                                <div className="col-md-3">
                                    <Link to={`/profile/${manager.user.handle}`}
                                          className="col-8 btn btn-lg btn-info mr-1">
                                        Profile
                                    </Link>
                                </div>
                            </div>
                        )
                    )
                }
            } else {
                groupMembers = (
                    <div>
                        No Members
                    </div>
                )
            }
        }
        return (
            <div>
                {groupAbout}
                {groupMembers}
            </div>
        );
    }
}


GroupManagers.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    geGroupManagers: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {geGroupManagers}
)(GroupManagers);