import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from "../../validation/is-empty";
import {followingUser, unFollowingUser} from "../../actions/followActions";

class ProfileItem extends Component {

    render() {
        const {profile, auth} = this.props;
        let followButton;
        if (profile.user.follwoers.map(follower => follower.user.toString()).indexOf(auth.user.id) < 0) {
            followButton = (
                <button
                    onClick={this.props.followingUser.bind(this, auth.user.id, profile.user._id)}
                    className="btn btn-info">
                    follow
                </button>
            )
        } else {
            console.log(1);
            followButton = (
                < button
                         onClick={this.props.unFollowingUser.bind(this, auth.user.id, profile.user._id)}
                         className="btn btn-danger">
                    unfollow
                </button>
            )
        }
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">

                        <div className="mb-5">
                            <img src={profile.user.avatar} alt={profile.user.name} className="rounded-circle"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name}</h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : (<span>
                            at {profile.company}
                        </span>)}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : (<span>
                            at {profile.location}
                        </span>)}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                            View Profile
                        </Link>
                        {profile.user._id === auth.user.id ? null : (
                            <div className="mt-3">
                                {followButton}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Skills Set</h4>
                        <ul className="list-group">
                            {profile.skills.slice(0, 4).map((skill, index) => (
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
ProfileItem.propTypes = {
    followingUser: PropTypes.func.isRequired,
    unFollowingUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    {followingUser, unFollowingUser}
)(ProfileItem);