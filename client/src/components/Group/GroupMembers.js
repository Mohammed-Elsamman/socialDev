import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {getGroupMembers, createAdmin, deleteAdmin, removeMember} from "../../actions/groupActions";

class GroupMembers extends Component {
    componentDidMount() {
        this.props.getGroupMembers(this.props.match.params.id)
    }

    render() {
        const {group, loading} = this.props.group;
        const {auth} = this.props;
        let groupAbout;
        let groupMembers;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            groupAbout = <GroupAbout group={group} auth={auth}/>
            if (group.members.length > 0) {
                let adminIds = group.managers.map(manager => manager.user);
                let isUserIsAdmin = adminIds.indexOf(auth.user.id);
                if (isUserIsAdmin < 0) {
                    groupMembers = (
                        <div className="row">
                            {
                                group.members.map(member => (
                                        <div key={member._id} className="row col-md-6">
                                            <div className="col-md-5 mt-2">
                                                <Link to="">
                                                    <img
                                                        className="rounded-circle d-none d-md-block"
                                                        src={member.user.avatar}
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="mt-4"/>
                                                <h3 className="text-center">{member.user.name}</h3>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mt-1">
                                                    <Link to={`/profile/${member.user.handle}`}
                                                          className="col-8 btn btn-lg btn-info mr-1">
                                                        Profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    )
                }
                if (isUserIsAdmin >= 0) {
                    if (group.user._id === auth.user.id) {
                        groupMembers = (
                            <div className="row">
                                {
                                    group.members.map(member => {
                                        let isMemberAdmin = adminIds.indexOf(member.user._id)
                                        if ((group.user._id === member.user._id)) {
                                            return (
                                                <div key={member._id} className="row col-md-6">
                                                    <div className="col-md-5 mt-2">
                                                        <Link to="">
                                                            <img
                                                                className="rounded-circle d-none d-md-block"
                                                                src={member.user.avatar}
                                                                alt=""
                                                            />
                                                        </Link>
                                                        <div className="mt-4"/>
                                                        <h3 className="text-center">{member.user.name}</h3>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mt-1">
                                                            <Link to={`/profile/${member.user.handle}`}
                                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                                Profile
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else if (isMemberAdmin < 0) {
                                            return (
                                                <div key={member._id} className="row col-md-6">
                                                    <div className="col-md-5 mt-2">
                                                        <Link to="">
                                                            <img
                                                                className="rounded-circle d-none d-md-block"
                                                                src={member.user.avatar}
                                                                alt=""
                                                            />
                                                        </Link>
                                                        <div className="mt-4"/>
                                                        <h3 className="text-center">{member.user.name}</h3>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mt-1">
                                                            <Link to={`/profile/${member.user.handle}`}
                                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                                Profile
                                                            </Link>
                                                        </div>

                                                        <div className="mt-1">
                                                            <button
                                                                onClick={this.props.createAdmin.bind(this, group._id, member.user._id)}
                                                                className="col-8 btn btn-lg btn-info mr-1">
                                                                Make Admin
                                                            </button>
                                                        </div>
                                                        <div className="mt-1">
                                                            <button
                                                                onClick={this.props.removeMember.bind(this, group._id, member.user._id)}
                                                                className="col-8 btn btn-lg btn-danger mr-1">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={member._id} className="row col-md-6">
                                                    <div className="col-md-5 mt-2">
                                                        <Link to="">
                                                            <img
                                                                className="rounded-circle d-none d-md-block"
                                                                src={member.user.avatar}
                                                                alt=""
                                                            />
                                                        </Link>
                                                        <div className="mt-4"/>
                                                        <h3 className="text-center">{member.user.name}</h3>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mt-1">
                                                            <Link to={`/profile/${member.user.handle}`}
                                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                                Profile
                                                            </Link>
                                                        </div>
                                                        <div className="mt-1">
                                                            <button
                                                                onClick={this.props.deleteAdmin.bind(this, group._id, member.user._id)}
                                                                className="col-8 btn btn-lg btn-danger mr-1">
                                                                Delete Admin
                                                            </button>
                                                        </div>
                                                        <div className="mt-1">
                                                            <button
                                                                onClick={this.props.removeMember.bind(this, group._id, member.user._id)}
                                                                className="col-8 btn btn-lg btn-danger mr-1">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        )
                    } else {
                        groupMembers = (
                            <div className="row mb-1">
                                {
                                    group.members.map(member => {
                                        let isMemberAdmin = adminIds.indexOf(member.user._id)
                                        if (isMemberAdmin < 0) {
                                            return (
                                                <div key={member._id} className="row col-md-6">
                                                    <div className="col-md-5 mt-2">
                                                        <Link to="">
                                                            <img
                                                                className="rounded-circle d-none d-md-block"
                                                                src={member.user.avatar}
                                                                alt=""
                                                            />
                                                        </Link>
                                                        <div className="mt-4"/>
                                                        <h3 className="text-center">{member.user.name}</h3>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mt-1">
                                                            <Link to={`/profile/${member.user.handle}`}
                                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                                Profile
                                                            </Link>
                                                        </div>

                                                        <div className="mt-1">
                                                            <button
                                                                onClick={this.props.removeMember.bind(this, group._id, member.user._id)}
                                                                className="col-8 btn btn-lg btn-danger mr-1">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="row col-md-6">
                                                    <div className="col-md-5 mt-2">
                                                        <Link to="">
                                                            <img
                                                                className="rounded-circle d-none d-md-block"
                                                                src={member.user.avatar}
                                                                alt=""
                                                            />
                                                        </Link>
                                                        <div className="mt-4"/>
                                                        <h3 className="text-center">{member.user.name}</h3>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mt-1">
                                                            <Link to={`/profile/${member.user.handle}`}
                                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                                Profile
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        )
                    }

                }
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


GroupMembers.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getGroupMembers: PropTypes.func.isRequired,
    createAdmin: PropTypes.func.isRequired,
    deleteAdmin: PropTypes.func.isRequired,
    removeMember: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {getGroupMembers, createAdmin, deleteAdmin, removeMember}
)(GroupMembers);