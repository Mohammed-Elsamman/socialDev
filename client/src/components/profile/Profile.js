import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByHandel} from "../../actions/profileActions";
import Spinner from '../common/Spinner';
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle)
            this.props.getProfileByHandel(this.props.match.params.handle)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push(('/not-found'))
        }
    }

    render() {
        const {profile, loading} = this.props.profile;
        const {auth} = this.props;


        let ProfileContent;
        let myPage;
        if (profile === null || loading) {
            ProfileContent = <Spinner/>
        } else {
            {
                profile.user._id === auth.user.id ? (
                    myPage = (
                        <div className="row">
                            <div className="col-md-4 mb-3 ">
                                <div className="card">
                                    <Link to="/follwoers" className="btn btn-info">
                                        follwoers
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3 "></div>
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <Link to="/follwoing" className="btn btn-info">
                                        follwoing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                ) : null
            }
            ProfileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
                            </Link>
                        </div>
                        <div className="col-md-6"/>
                    </div>

                    <ProfileHeader profile={profile}/>
                    {myPage}
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds education={profile.education} experience={profile.experience}/>
                    {profile.githubusername ? (
                            <ProfileGithub username={profile.githubusername}/>
                        ) :
                        null
                    }
                </div>
            )

        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {ProfileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileByHandel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {getProfileByHandel}
)(Profile);