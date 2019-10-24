import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import PostFeed from "../posts/PostFeed";
import {geGroup, getGroupPosts, askToJoinGroup, cancelToJoinGroup} from "../../actions/groupActions";
import PostForm from "../posts/PostForm";

class Group extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.geGroup(this.props.match.params.id)
            this.props.getGroupPosts(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group.group === null && this.props.group.loading) {
            this.props.history.push(('/not-found'))
        }
    }

    render() {
        const {auth} = this.props;
        const {group, loading} = this.props.group;
        const {posts} = this.props.post;
        let isUserIsMember;
        let groupAbout;
        let groupPosts;
        let isUserRequest;
        let joinButton;
        let getgroup = true;
        if (group === null || loading) {
            groupAbout = <Spinner/>
        } else {
            groupAbout = <GroupAbout group={group} auth={auth}/>
            isUserIsMember = group.members.map(member => member.user).indexOf(auth.user.id)
            isUserRequest = group.requests.map(member => member.user).indexOf(auth.user.id);
            if (isUserRequest >= 0) {
                joinButton = (
                    <button
                        onClick={this.props.cancelToJoinGroup.bind(this, group._id, auth.user.id,getgroup)}
                        className="btn btn-danger">
                        cancel the request
                    </button>
                )
            } else {
                joinButton = (
                    <button
                        onClick={this.props.askToJoinGroup.bind(this, group._id, auth.user.id,getgroup)}
                        className="btn btn-info">
                        Join The Group
                    </button>
                )
            }
            {
                isUserIsMember >= 0 ? (
                    groupPosts = (
                        <div>
                            <PostForm idPG={this.props.match.params.id}/>
                            <PostFeed posts={posts}/>
                        </div>
                    )
                ) : groupPosts = (
                    <div>
                        <h3>Sorry: You are not a member in that group</h3>
                        {joinButton}
                    </div>
                )
            }
        }
        return (
            <div className="group">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {groupAbout}
                            {groupPosts}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getGroupPosts: PropTypes.func.isRequired,
    geGroup: PropTypes.func.isRequired,
    askToJoinGroup: PropTypes.func.isRequired,
    cancelToJoinGroup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    group: state.group,
    post: state.post,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {geGroup, getGroupPosts, askToJoinGroup, cancelToJoinGroup}
)(Group);