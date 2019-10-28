import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import {getPosts} from "../../actions/postActions";
import {getSuggestionProfiles} from "../../actions/profileActions";
import PostFeed from "./PostFeed";
import "./sidenave.css"
import {Link} from "react-router-dom";

class Posts extends Component {

    componentDidMount() {
        this.props.getPosts()
        this.props.getSuggestionProfiles()
    }

    render() {
        const {posts, loading} = this.props.post;
        const {profiles} = this.props.profile;
        console.log(profiles);
        let postContent;
        if (posts === null || loading) {
            postContent = <Spinner/>
        } else {
            postContent = <PostFeed posts={posts}/>
        }
        let youmayInteristedIn;
        if (profiles) {
            youmayInteristedIn = profiles.map(profile => (
                    <div className='row mb-4'>
                        <div className="col-md-3">
                            <img src={profile.user.avatar} alt='loading..' className="rounded-circle"/>
                        </div>
                        <div className="col-md-4">
                            {profile.user.name}
                        </div>
                        <div className="col-md-5">
                            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                                Profile
                            </Link>
                        </div>
                    </div>
                )
            )
        }

        return (
            <div className="feed">
                <div>
                    <div className="row">
                        <div className="sidenav">
                            <h3 className='mb-3'>Discover....</h3>
                            {youmayInteristedIn}
                        </div>
                        <div className="col-md-12">
                            <PostForm/>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    getSuggestionProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile,
})

Posts.propTypes = {};
export default connect(
    mapStateToProps,
    {getPosts, getSuggestionProfiles}
)(Posts);