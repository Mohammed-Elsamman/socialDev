import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {deletePost, addLike, removeLike} from "../../actions/postActions";
import CommentFeed from "../post/CommentFeed";

class PostItem extends Component {

    onClickDelete(post_id) {
        this.props.deletePost(post_id)

    }

    onClickLike(postId) {
        this.props.addLike(postId)
    }

    onClickUnlike(postId) {
        this.props.removeLike(postId)
    }

    findUserLike(likes) {
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true
        } else {
            return false
        }
    }

    render() {
        const {post, auth, showActions} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row mb-3">
                    <div className="col-md-2">
                        <Link to="">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={post.avatar}
                                alt=""
                            />
                        </Link>
                        <br/>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {post.text}
                        </p>
                        {showActions ? (
                            <span>
                        <button type="button"
                                className="btn btn-light mr-1"
                                onClick={this.onClickLike.bind(this, post._id)}
                        >
                            <i className={classnames("fas fa-thumbs-up", {
                                "text-info": this.findUserLike(post.likes)
                            })}/>
                            <span className="badge badge-light">
                                {post.likes.length}
                            </span>
                        </button>
                        <button type="button" className="btn btn-light mr-1"
                                onClick={this.onClickUnlike.bind(this, post._id)}
                        >
                            <i className="text-secondary fas fa-thumbs-down"/>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                                {post.user === auth.user.id ? (
                                    <button className="btn btn-danger mr-1"
                                            onClick={this.onClickDelete.bind(this, post._id)}
                                    >
                                        <i className="fas fa-times"/>
                                    </button>
                                ) : null}

                            </span>
                        ) : null}
                    </div>

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