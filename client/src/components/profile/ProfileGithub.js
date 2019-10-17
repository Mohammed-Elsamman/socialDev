import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

class ProfileGithub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId: "a9d82c07eef75744ec20",
            clientSecret: "8340dcb50b3a3cc60f984b32359589116e1abe63",
            count: 5,
            sort: "created: asc",
            repos: []
        }

    }

    componentDidMount() {
        const {username} = this.props;
        const {clientId, clientSecret, count, sort} = this.state
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(!data.message)
                    this.setState({repos: data})
            }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const {repos} = this.state;
        console.log(repos);
        const repoItems = repos.map(repo => (
                <div key={repo.id} className="card card-body mb-2">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>
                                <Link to={repo.html_url} className="text_info" target="_blank">
                                    {repo.name}
                                </Link>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div className="col-md-6">
                            <span className="badge badge-info mr-1">
                                Stars: {repo.stargazer_count}
                            </span>
                            <span className="badge badge-info mr-1">
                                Watchers: {repo.watchers_count}
                            </span>
                            <span className="badge badge-info mr-1">
                                Forks: {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </div>
            )
        );

        return (
            <div>
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username:PropTypes.string.isRequired
};

export default ProfileGithub;