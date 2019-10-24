import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {geGroupRequests,} from "../../actions/groupActions";


class GroupRequests extends Component {
    componentDidMount() {
        this.props.geGroupRequests(this.props.match.params.id)
    }

    render() {
        const {group, loading} = this.props.group;
        console.log(group);
        const {auth} = this.props
        let groupAbout;
        let groupMembers;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            groupAbout = <GroupAbout group={group}/>
            if (group.requests.length > 0) {
                groupMembers = (
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
                                                <Link to={`/profile/${request.user.handle}`}
                                                      className="col-8 btn btn-lg btn-success mr-1">
                                                    Accept
                                                </Link>
                                            </div>
                                            <div className="mt-3">
                                                <Link to={`/profile/${request.user.handle}`}
                                                      className="col-8 btn btn-lg btn-danger mr-1">
                                                    Refuse
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                )


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


GroupRequests.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    geGroupRequests: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {geGroupRequests}
)(GroupRequests);