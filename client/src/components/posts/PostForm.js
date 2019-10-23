import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addPost} from "../../actions/postActions";

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {idPG} = this.props;
        const {user} = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
            group: idPG,
        };
        this.props.addPost(newPost);
        this.setState({text: ''})
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        say something
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="write your post"
                                    onChange={this.onChange}
                                    name="text"
                                    value={this.state.text}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {addPost}
)(PostForm);