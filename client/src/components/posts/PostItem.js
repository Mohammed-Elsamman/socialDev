import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {deletePost, addLike, removeLike} from "../../actions/postActions";

class PostItem extends Component {

    onClickDelete(post_id) {
        this.props.deletePost(post_id)

    }

    onClickLike(postId, groupId) {
        this.props.addLike(postId, groupId)
    }

    onClickUnlike(postId, groupId) {
        this.props.removeLike(postId, groupId)
    }

    findUserLike(likes, auth) {
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true
        } else {
            return false
        }
    }

    render() {
        const {post, auth, showActions} = this.props;
        let groupId = false;
        let groupName = false;
        let postedeTime = new Date(post.date)
        let tmiePost = postedeTime.toDateString()
        console.log(tmiePost);
        console.log(post.date);

        if (post.group) {
            console.log(typeof post.group.date);
            groupId = post.group
            console.log(post);
            groupName = (
                <div className='row mb-2'>
                    <div className="col-md-4">
                        <span>Posted By {post.name} in </span>
                        <Link to={`/groups/${post.group._id}`}>
                            {post.group.name}
                        </Link>
                    </div>

                </div>
            )
        }
        return (
            <div className="card card-body mb-3">
                {groupName}
                <div className="row mb-3">
                    <div className="col-md-12 row">
                        <div className="row col-md-2">
                            <div className="col-md-6">
                                <Link to="">
                                    <img
                                        className="rounded-circle d-none d-md-block"
                                        src={post.avatar}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="row col-md-9">
                            <div className="col-md-12">
                                <h4>{post.name}</h4>
                            </div>
                            <div className="col-md-12">
                                posted on {tmiePost}
                            </div>
                        </div>
                        <div className="col-md-1 ml-5">
                            {showActions ? (
                                <div>
                                    {post.user === auth.user.id ? (
                                        <button className="btn btn-danger mr-1"
                                                onClick={this.onClickDelete.bind(this, post._id)}
                                        >
                                            <i className="fas fa-times"/>
                                        </button>
                                    ) : null}
                                </div>

                            ) : null}
                        </div>
                    </div>

                </div>
                <div>
                    <div>
                        <p className="lead">
                            {post.text}
                        </p>
                    </div>
                    {showActions ? (
                        <div className="row">
                            <div className="col-md-2">
                                <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={this.onClickLike.bind(this, post._id, groupId)}>
                                    <i className={classnames("fas fa-thumbs-up", {
                                        "text-info": this.findUserLike(post.likes, auth)
                                    })}/>
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>

                                <button type="button" className="btn btn-light mr-1"
                                        onClick={this.onClickUnlike.bind(this, post._id, groupId)}>
                                    <i className="text-secondary fas fa-thumbs-down"/>
                                </button>
                            </div>

                            <div className='col-md-6'>


                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                    Comments
                                </Link>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth,

});

PostItem.defaultProps = {
    showActions: true
}
export default connect(
    mapStateToProps,
    {deletePost, addLike, removeLike}
)(PostItem);