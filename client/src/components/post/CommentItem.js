import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {deleteComment} from "../../actions/postActions";

class CommentItem extends Component {

    onClickDelete(postId, commetId) {
        this.props.deleteComment(postId, commetId)
    }

    render() {
        const {comment, postId, auth} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2 row">
                        <div className="col-md-12 row">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <Link to="">
                                    <img
                                        className="rounded-circle d-none d-md-block"
                                        src={comment.avatar}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="row col-md-12">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <h4 className="text-center">{comment.name}</h4>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-10 row">
                        <div className="col-11">
                            <p className="lead">
                                {comment.text}
                            </p>
                        </div>
                        {comment.user === auth.user.id ? (
                            <div>
                                <button className="btn btn-danger  mr-1"
                                        onClick={this.onClickDelete.bind(this, postId, comment._id)}
                                >
                                    <i className="fas fa-times"/>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,

});

export default connect(
    mapStateToProps,
    {deleteComment}
)(CommentItem);