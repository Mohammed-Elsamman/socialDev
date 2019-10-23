import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class GroupAbout extends Component {

    render() {
        const {group} = this.props;
        const interestedin = group.interestedin.slice(0, 4).map((skill, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check"/>
                {skill}
            </div>
        ));
        return (
            <div className=" bg-light mb-3 row">
                <div className="col-md-4">
                    <h3>
                        Name: {group.name}
                    </h3>
                    <p className="lead">
                        Description: {group.description}
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>
                        Interested In
                    </h3>
                    <div className="d-flex">
                        {interestedin}
                    </div>
                </div>
                <div className="col-md-4">
                    <p>
                        Members: {group.members.length}
                    </p>
                    <p>
                        Managers: {group.managers.length}
                    </p>
                </div>

            </div>
        );
    }
}

export default GroupAbout;