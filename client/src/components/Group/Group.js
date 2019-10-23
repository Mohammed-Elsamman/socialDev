import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupAbout from "./GroupAbout";
import {geGroup} from "../../actions/groupActions";
import PostForm from "../posts/PostForm";

class Group extends Component {
    componentDidMount() {
        console.log(this.props);
        if (this.props.match.params.name)
            this.props.geGroup(this.props.match.params.name)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group.group === null && this.props.group.loading) {
            this.props.history.push(('/not-found'))
        }
    }

    render() {
        const {group, loading} = this.props.group;
        const {auth} = this.props;
        console.log(group);
        let ProfileContent;
        let myPage;
        if (group === null || loading) {
            ProfileContent = <Spinner/>
        } else {
            {
                group.user._id === auth.user.id ? (
                    myPage =
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
                ) : null
            }
            ProfileContent = (
                <div>
                    {myPage}
                    <GroupAbout group={group}/>
                </div>
            )
        }
        return (
            <div className="group">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {ProfileContent}
                            <PostForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    geGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {geGroup}
)(Group);