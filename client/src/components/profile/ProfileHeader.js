import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {

    render() {
        const {profile} = this.props
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img src={profile.user.avatar} alt={profile.user.name} className="rounded-circle"/>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">
                                {profile.user.name}
                            </h1>
                            <p className="lead text-center">
                                {profile.status} {isEmpty(profile.company) ? null : (
                                <span>at {profile.company}</span>
                            )}
                            </p>
                            <p>
                                {isEmpty(profile.location) ? null : (
                                    <span>at {profile.location}</span>
                                )}
                            </p>
                            <p>
                                {isEmpty(profile.website) ? null : (
                                    <a href={profile.website} className="text-white p-2">
                                        <i className="fas fa-globe fa-2x/"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.twitter) ? null : (
                                    <a href={profile.social.twitter} className="text-white p-2">
                                        <i className="fas fa-twitter fa-2x/"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.facebook) ? null : (
                                    <a href={profile.social.facebook} className="text-white p-2">
                                        <i className="fas fa-facebook fa-2x/"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.linkdin) ? null : (
                                    <a href={profile.social.linkedin} className="text-white p-2">
                                        <i className="fas fa-linkdin fa-2x/"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.youtube) ? null : (
                                    <a href={profile.social.youtube} className="text-white p-2">
                                        <i className="fas fa-youtube fa-2x/"></i>
                                    </a>
                                )}
                                {isEmpty(profile.social && profile.social.instagram) ? null : (
                                    <a href={profile.social.instagram} className="text-white p-2">
                                        <i className="fas fa-instagram fa-2x/"></i>
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;