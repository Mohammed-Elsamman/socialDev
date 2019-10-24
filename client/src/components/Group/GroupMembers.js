import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {geGroupMembers,} from "../../actions/groupActions";


class GroupMembers extends Component {
    componentDidMount() {
        this.props.geGroupMembers(this.props.match.params.id)
    }

    render() {
        const {group, loading} = this.props.group
        const {auth} = this.props
        let groupAbout;
        let membersContent;
        let groupMembers;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            // console.log(group.user._id);
            groupAbout = <GroupAbout group={group}/>
            console.log(group.user);
            console.log(group.members);
            if (group.members.length > 0) {
                let adminIds = group.managers.map(manager => manager.user);
                let isUserIsAdmin = adminIds.indexOf(auth.user.id);
                if (isUserIsAdmin < 0) {
                    console.log(isUserIsAdmin, "< 0  ===");
                    console.log(1);
                    groupMembers = group.members.map(member => (
                            <div className="row mb-1">
                                <div className="col-md-2">
                                    <Link to="">
                                        <img
                                            className="rounded-circle d-none d-md-block"
                                            src={member.user.avatar}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <p className="lead">
                                    {member.user.name}
                                </p>

                                <div className="col-md-4">
                                    <Link to={`/profile/${member.user.handle}`}
                                          className="col-8 btn btn-lg btn-info mr-1">
                                        Profile
                                    </Link>
                                </div>
                            </div>
                        )
                    )
                }
                if (isUserIsAdmin >= 0) {
                    if (group.user._id === auth.user.id) {
                        groupMembers = group.members.map(member => {
                            let isMemberAdmin = adminIds.indexOf(member.user._id)
                            if ((group.user._id === member.user._id)) {
                                return membersContent = (
                                    <div className="row mb-1">
                                        <div className="col-md-2">
                                            <Link to="">
                                                <img
                                                    className="rounded-circle d-none d-md-block"
                                                    src={member.user.avatar}
                                                    alt=""
                                                />
                                            </Link>

                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                Profile
                                            </Link>
                                        </div>
                                    </div>
                                )
                            } else if (isMemberAdmin < 0) {
                                return membersContent = (
                                    <div className="row mb-1">
                                        <div className="col-md-2">
                                            <Link to="">
                                                <img
                                                    className="rounded-circle d-none d-md-block"
                                                    src={member.user.avatar}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                Profile
                                            </Link>
                                        </div>

                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                Make Admin
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-danger mr-1">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                )
                            } else {
                                return membersContent = (
                                    <div className="row mb-1">
                                        <div className="col-md-2">
                                            <Link to="">
                                                <img
                                                    className="rounded-circle d-none d-md-block"
                                                    src={member.user.avatar}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                Profile
                                            </Link>
                                        </div>

                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-danger mr-1">
                                                Delete Admin
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-danger mr-1">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }


                        })
                    } else {
                        group.members.map(member => {
                            let isMemberAdmin = adminIds.indexOf(member.user._id)
                            if (isMemberAdmin < 0) {
                                return membersContent = (
                                    <div className="row mb-1">
                                        <div className="col-md-2">
                                            <Link to="">
                                                <img
                                                    className="rounded-circle d-none d-md-block"
                                                    src={member.user.avatar}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                Profile
                                            </Link>
                                        </div>

                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-danger mr-1">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                )
                            } else {
                                return membersContent = (
                                    <div className="row mb-1">
                                        <div className="col-md-2">
                                            <Link to="">
                                                <img
                                                    className="rounded-circle d-none d-md-block"
                                                    src={member.user.avatar}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to={`/profile/${member.user.handle}`}
                                                  className="col-8 btn btn-lg btn-info mr-1">
                                                Profile
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }

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


GroupMembers.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    geGroupMembers: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {geGroupMembers}
)(GroupMembers);