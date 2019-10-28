import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {getGroupManagers,deleteAdmin} from "../../actions/groupActions";


class GroupManagers extends Component {
    componentDidMount() {
        this.props.getGroupManagers(this.props.match.params.id)
    }

    render() {
        const {group, loading} = this.props.group
        const {auth} = this.props;
        let groupAbout;
        let groupMembers;
        let man = true;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            groupAbout = <GroupAbout group={group} auth={auth} man={man}/>
            if (group.managers.length > 0) {
                if (group.user._id === auth.user.id) {
                    groupMembers = (
                        <div className="row mb-1">
                            {
                                group.managers.map(manager => (
                                        <div key={manager._id} className="row col-md-6">
                                            <div className="col-md-5 mt-2">
                                                <Link to="">
                                                    <img
                                                        className="rounded-circle d-none d-md-block"
                                                        src={manager.user.avatar}
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="mt-4"/>
                                                <h3 className="text-center">{manager.user.name}</h3>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mt-1">
                                                    <Link to={`/profile/${manager.user.handle}`}
                                                          className="col-8 btn btn-lg btn-info mr-1">
                                                        Profile
                                                    </Link>
                                                </div>
                                                {(group.user._id !== manager.user._id )? (
                                                    <div className="mt-1">
                                                        <button
                                                            onClick={this.props.deleteAdmin.bind(this, group._id, manager.user._id,man)}
                                                            className="col-8 btn btn-lg btn-danger mr-1">
                                                            Delete Admin
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    )

                } else {
                    groupMembers = (
                        <div className="row">
                            {
                                group.managers.map(manager => (
                                        <div key={manager._id} className="row col-md-6">
                                            <div className="col-md-5 mt-2">
                                                <Link to="">
                                                    <img
                                                        className="rounded-circle d-none d-md-block"
                                                        src={manager.user.avatar}
                                                        alt=""
                                                    />
                                                </Link>
                                                <div className="mt-4"/>
                                                <h3 className="text-center">{manager.user.name}</h3>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mt-1">
                                                    <Link to={`/profile/${manager.user.handle}`}
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
    getGroupManagers: PropTypes.func.isRequired,
    deleteAdmin: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {getGroupManagers,deleteAdmin}
)(GroupManagers);