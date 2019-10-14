import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import {createProfile} from "../../actions/profileActions";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInpts: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githupusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instgram: "",
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githupusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instgram: this.state.instgram,
        };
        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    };


    render() {
        const {errors, displaySocialInpts} = this.state;
        let socialInputs;
        if (displaySocialInpts) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />

                </div>
            )
        }
        const options = [
            {label: "* Select Professional Status", value: 0},
            {label: "Developer", value: "Developer"},
            {label: "Junior Developer", value: "Junior Developer"},
            {label: "Senior Developer", value: "Senior Developer"},
            {label: "Manager", value: 'Manager'},
            {label: "Student Or Learning", value: "Student Or Learning"},
            {label: "Instructor Or Teacher", value: "Instructor Or Teacher"},
            {label: "Intern", value: "Intern"},
            {label: "Other", value: "Other"},
        ]
        return (
            <div className="create_profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="dispaly-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">let's get some information to create your profile</p>
                            <small className="d-block pd-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* profile handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    options={options}
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or company one"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state"
                                />
                                <TextFieldGroup
                                    placeholder="skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use a comma separated value (eg. HTML,CSS,JS)"
                                />
                                <TextFieldGroup
                                    placeholder="Githup Username"
                                    name="githupusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="if you want your latest repos and a Githup link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about your self"
                                />
                                <div className="mb-3">
                                    <button onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialInpts: !prevState.displaySocialInpts
                                        }))
                                    }}>
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optioal</span>
                                    {socialInputs}
                                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    {createProfile}
)(withRouter(CreateProfile));