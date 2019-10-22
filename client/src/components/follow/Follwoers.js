import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from "../common/Spinner";
import {getFollowers} from "../../actions/followActions";
import {Link} from "react-router-dom";



class Follwers extends Component {
    componentDidMount() {
        const {auth} = this.props
        this.props.getFollowers(auth.user.id)
    }

    render() {
        const {followers,loading}=this.props.follow
        console.log(this.props);
        console.log(followers);
        let followersItem
        if (followers === null || loading) {
            followersItem = <Spinner/>
        } else {
            if (followers.length > 0) {
                followersItem = followers.map(follower => {
                    console.log(follower);
                    return (
                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <Link to="">
                                        <img
                                            className="rounded-circle d-none d-md-block"
                                            src={follower.avatar}
                                            alt=""
                                        />
                                    </Link>
                                    <br/>
                                </div>
                                <div className="col-md-10">
                                    <p className="lead">
                                        {follower.name}
                                    </p>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Link to={`/profile/${follower.handle}`} className="btn btn-lg btn-info mr-1">
                                                profile
                                            </Link>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to={`/post/${follower._id}`} className="btn btn-lg btn-info mr-1">
                                                posts
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                })
            } else {
                followersItem = (
                    <div>
                        no following
                    </div>
                )
            }
        }
        return (
            <div>
                {followersItem}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    follow: state.follow
})

Follwers.propTypes = {
    auth: PropTypes.object.isRequired,
    follow: PropTypes.object.isRequired,
    getFollowers: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    {getFollowers}
)(Follwers);