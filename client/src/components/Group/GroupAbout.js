import React, {Component} from 'react';
import {Link} from "react-router-dom";

class GroupAbout extends Component {

    render() {
        const {group, auth,man} = this.props;

        let isUserIsAdmin;
        if (man) {
            isUserIsAdmin = group.managers.map(manager => manager.user._id).indexOf(auth.user.id)
        }else{
            isUserIsAdmin = group.managers.map(manager => manager.user).indexOf(auth.user.id)
        }
        let interestedin = group.interestedin.slice(0, 4).map((skill, index) => (
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
                    <div className="mb-2 mt-2">
                        <Link to={`/groups/${group._id}/members`}
                              className="btn btn-md btn-success"
                        >
                            Members: {group.members.length}
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link to={`/groups/${group._id}/managers`}
                              className="btn btn-md btn-success"
                        >
                            Managers: {group.managers.length}
                        </Link>
                    </div>
                    {isUserIsAdmin >= 0 ? (
                        <div className="mb-2">
                            <Link to={`/groups/${group._id}/requests`}
                                  className="btn btn-md btn-success"
                            >
                                Requests: {group.requests.length}
                            </Link>
                        </div>
                    ) : null}
                </div>

            </div>
        );
    }
}

export default GroupAbout;