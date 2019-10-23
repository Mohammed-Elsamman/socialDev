import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Moment from "react-moment"
import {connect} from 'react-redux';
import PropTypes from "prop-types"
import {deleteExperience} from "../../actions/profileActions";

class Experience extends Component {
    onDeleteClick(exp_id) {
        this.props.deleteExperience(exp_id)
    }

    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{exp.location}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === "" ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={this.onDeleteClick.bind(this, exp._id)}
                    >
                        Delete
                    </button>
                </td>

            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Experience Cardential</h4>
                <table className="table">
                    <thead>
                    {experience.length > 0 ? (
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Years</th>
                            <th>Action</th>
                        </tr>
                    ) : (
                        <tr>
                            <th>there is no experience cardential do you want to add one ?</th>
                        </tr>
                    )}
                    </thead>
                    <tbody>
                    {experience}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}
export default connect(
    mapStateToProps,
    {deleteExperience}
)(withRouter(Experience));