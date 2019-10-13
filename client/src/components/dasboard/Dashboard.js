import React, {Component} from 'react';
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Spinner from "../common/Spinner";
import {getCurrentProfile} from "../../actions/profileActions";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        let dasboardContent;
        if (profile === null || loading) {
            dasboardContent = <Spinner/>
        } else {
            // cheack if logged in and user has profile data
            if (Object.keys(profile).length > 0) {
                dasboardContent = <h4>TODO: DISPLAY PROFILE</h4>
            } else {
                //user logged in but has no profile data
                dasboardContent = (
                    <div>
                        <p className="lead text-muted">Welcom {user.name}</p>
                        <p>you have not yet setup a profile, please add some data</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            create profile
                        </Link>
                    </div>
                )
            }
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <col-md-12>
                            <h1 className="display-4">Dashboard</h1>
                            {dasboardContent}
                        </col-md-12>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);