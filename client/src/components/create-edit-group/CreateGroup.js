import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {createGroup} from "../../actions/groupActions";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      description:"",
      interestedin:"",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const groupData = {
      name: this.state.name,
      interestedin: this.state.interestedin,
      description: this.state.description,
    };
    console.log(groupData);
    this.props.createGroup(groupData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;


    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Group</h1>
              <p className="lead text-center">
                Let's get some information to make your Group stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* group name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextAreaFieldGroup
                  placeholder="Description..."
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us a little about your group"
                />
                <TextFieldGroup
                  placeholder="Interested In"
                  name="interestedin"
                  value={this.state.interestedin}
                  onChange={this.onChange}
                  error={errors.interestedin}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
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

CreateGroup.propTypes = {
  errors: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  group: state.group,
});

export default connect(mapStateToProps, { createGroup })(
  withRouter(CreateGroup)
);