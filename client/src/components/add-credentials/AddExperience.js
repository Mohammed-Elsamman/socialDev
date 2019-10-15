import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from "prop-types"
import TextFieldGroup from "../common/TextFieldGroup";
import {addExperience} from "../../actions/profileActions";

class AddExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: "",
            title: "",
            location: "",
            from: "",
            to: "",
            cyrrent: false,
            description: "",
            errors: {},
            disabled: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.errors);
        if (nextProps.errors) {
            console.log(nextProps.errors);
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const ExperienceData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            cyrrent: this.state.cyrrent,
            description: this.state.description,
        };
        this.props.addExperience(ExperienceData, this.props.history)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            cyrrent: !this.state.cyrrent,
        })

    }

    render() {
        const {errors} = this.state;
        console.log(errors);
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job or position that you have in the past or
                                current</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    placeholder="* Jop Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="* location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? "disabled" : ""}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Jop
                                    </label>
                                </div>
                                <TextFieldGroup
                                    placeholder="Jop Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the position"
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    {addExperience}
)(withRouter(AddExperience));