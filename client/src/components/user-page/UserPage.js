import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getUserPosts} from "../../actions/postActions";
import {getCurrentProfile} from "../../actions/profileActions";
import PostFeed from "../posts/PostFeed";
import {Link} from "react-router-dom";
import ProfileHeader from "../profile/ProfileHeader";
import PostForm from "../posts/PostForm";

class UserPage extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
        this.props.getUserPosts()
    }

    render() {
        const {posts, loading} = this.props.post;
        const {profile} = this.props.profile;
        console.log(posts);
        console.log(profile);
        let myPageContent
        if (posts === null || profile === null || loading) {
            myPageContent = <Spinner/>
        } else {
            myPageContent = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ProfileHeader profile={profile}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm/>
                            <PostFeed posts={posts}/>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {myPageContent}
            </div>
        );
    }
}

UserPage.propTypes = {
    getUserPosts: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {getUserPosts, getCurrentProfile}
)(UserPage);