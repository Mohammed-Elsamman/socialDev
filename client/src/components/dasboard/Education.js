import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Moment from "react-moment"
import {connect} from 'react-redux';
import PropTypes from "prop-types"
import {deleteEducation} from "../../actions/profileActions";

class Education extends Component {
    onDeleteClick(exp_id) {
        this.props.deleteEducation(exp_id)
    }

    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.fieldofstudy}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === "" ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                </td>
                <td>
                    <button className="btn btn-dangr"
                            onClick={this.onDeleteClick.bind(this, edu._id)}
                    >
                        Delete
                    </button>
                </td>

            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Education Cardential</h4>
                <table className="table">
                    <thead>
                    {education.length > 0 ? (
                        <tr>
                            <th>School</th>
                            <th>Field Of Study</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th>Action</th>
                        </tr>
                    ) : (
                        <tr>
                            <th>there is no education cardential do you want to add one ?</th>
                        </tr>
                    )}
                    </thead>
                    <tbody>
                    {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}
export default connect(
    mapStateToProps,
    {deleteEducation}
)(withRouter(Education));