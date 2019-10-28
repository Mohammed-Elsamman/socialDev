import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from "../common/Spinner";
import {getFollowing,unFollowingUserPage} from "../../actions/followActions";

class Following extends Component {
    componentDidMount() {
        const {auth} = this.props;
        this.props.getFollowing(auth.user.id)
    }

    render() {
        const {following,loading} = this.props.follow;
        const {auth} = this.props;
        let followongItem;
        if (following === null || loading) {
            followongItem = <Spinner/>
        } else {
            if (following.length > 0) {
                followongItem = following.map(follow => {
                    return (
                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <Link to="">
                                        <img
                                            className="rounded-circle d-none d-md-block"
                                            src={follow.avatar}
                                            alt=""
                                        />
                                    </Link>
                                    <br/>
                                </div>
                                <div className="col-md-10">
                                    <p className="lead">
                                        {follow.name}
                                    </p>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Link to={`/profile/${follow.handle}`} className="btn btn-lg btn-info mr-1">
                                                profile
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to={`/post/${follow._id}`} className="btn btn-lg btn-info mr-1">
                                                posts
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to={"/following"} className="btn btn-lg btn-danger mr-1"
                                                  onClick={this.props.unFollowingUserPage.bind(this, auth.user.id, follow._id)}
                                            >
                                                unfollow
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                })
            } else {
                followongItem = (
                    <div>
                        no following
                    </div>
                )
            }
        }
        return (
            <div>
                {followongItem}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    follow: state.follow
})

Following.propTypes = {
    auth: PropTypes.object.isRequired,
    follow: PropTypes.object.isRequired,
    getFollowing: PropTypes.func.isRequired,
    unFollowingUserPage: PropTypes.func.isRequired
};
export default connect(
    mapStateToProps,
    {getFollowing,unFollowingUserPage}
)(Following);