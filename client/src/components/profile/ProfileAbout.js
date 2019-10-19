import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {

    render() {
        const {profile} = this.props;
        const firstName = profile.user.name.trim().split(' ')[0];
        const skills = profile.skills.slice(0,4).map((skill,index)=>(
                <div key={index} className="p-3">
                    <i className="fa fa-check"/>
                    {skill}
                </div>
            ));
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                        <h3 className="text-info text-center">
                            {firstName}'s bio
                        </h3>
                        <p className="lead">
                            {isEmpty(profile.bio) ?(
                                <span>{firstName} does not have bio</span>
                            ) : (
                                <span>{profile.bio}</span>
                            )}
                        </p>
                        <hr/>
                        <h3 className="text-info text-center">
                            Skill Set
                        </h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {skills}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileAbout;