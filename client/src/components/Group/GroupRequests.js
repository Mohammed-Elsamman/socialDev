import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {getGroupRequests, acceptJoin, refuseJoin} from "../../actions/groupActions";


class GroupRequests extends Component {
    componentDidMount() {
        this.props.getGroupRequests(this.props.match.params.id)
    }

    render() {
        const {group, loading} = this.props.group;
        const {auth} = this.props
        let groupAbout;
        let groupRequests;
        let groupPost;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            groupPost = (
                <div className="row">
                    <div className="col-md-12">
                        <Link to={`/groups/${group._id}`} className="btn btn-light mb-3 float-left">
                            Posts
                        </Link>
                    </div>
                    <div className="col-md-6"/>
                </div>
            );
            groupAbout = <GroupAbout group={group} auth={auth}/>
            if (group.requests.length > 0) {
                groupRequests = (
                    <div className="row mb-1">
                        {
                            group.requests.map(request => (
                                    <div key={request._id} className="row col-md-6">
                                        <div className="col-md-5 mt-2">
                                            <Link to="">
                                                <img
                                                    className="rounded-circle d-none d-md-block"
                                                    src={request.user.avatar}
                                                    alt=""
                                                />
                                            </Link>
                                            <div className="mt-4"/>
                                            <h3 className="text-center">{request.user.name}</h3>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mt-3">
                                                <Link to={`/profile/${request.user.handle}`}
                                                      className="col-8 btn btn-lg btn-info mr-1">
                                                    Profile
                                                </Link>
                                            </div>
                                            <div className="mt-3">
                                                <button
                                                    onClick={this.props.acceptJoin.bind(this, group._id, request.user._id)}
                                                    className="col-8 btn btn-lg btn-success mr-1">
                                                    Accept
                                                </button>
                                            </div>
                                            <div className="mt-3">
                                                <button
                                                    onClick={this.props.refuseJoin.bind(this, group._id, request.user._id)}
                                                    className="col-8 btn btn-lg btn-danger mr-1">
                                                    Refuse
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            } else {
                groupRequests = (
                    <div className="row">
                        <div className="col-md-12">
                            <h4>thier is no requests for this group</h4>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div>
                {groupAbout}
                {groupPost}
                <h3>Group Requests</h3>
                {groupRequests}
            </div>
        );
    }
}


GroupRequests.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getGroupRequests: PropTypes.func.isRequired,
    acceptJoin: PropTypes.func.isRequired,
    refuseJoin: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {getGroupRequests, acceptJoin, refuseJoin}
)(GroupRequests);