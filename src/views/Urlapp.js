import React, { Component } from 'react'
import axios from 'axios';
import validator from 'validator';

class UrlApp extends Component {
    constructor() {
        super();

        this.state = {
            url: '',
            link: ''
        };
    }
    handleChange = (e) => {
        this.setState({ url: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const validUrl = validator.isURL(this.state.url, {
            require_protocol: true
        });
        if (!validUrl) {
            alert("Please ensure this url is valid and includes the http(s) protocol")
        } else {
            axios.post('http://localhost:5000/api/shorten', {
                url: this.state.url
            })
                .then(res => {
                    if (res.data.status === 400) {
                        this.setState({
                            link: `https://fathomless-spire-29873.herokuapp.com/${res.data.hash}`,
                            url: ''
                        })
                        alert("This URL was already shortened once");
                    }
                    this.setState({
                        link: `https://fathomless-spire-29873.herokuapp.com/${res.data.hash}`,
                        url: ''
                    })
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div>
                <section id="app-section">
                    <div className="container">
                        <div className="col-md-6 offset-md-3 box">
                            <div className="title text-center">
                                <h3>URL Shortner APP</h3>
                            </div>
                            <div className="Form">
                                <form onSubmit={this.handleSubmit} autoComplete="off">
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="url" label="Your Url" onChange={this.handleChange} value={this.state.url} />
                                    </div>
                                    <button type="submit" className="btn btn-success">SHORTEN</button>
                                </form>
                                <div className="shorten-wrapper">
                                    <h5 className="text-info text-center">Your Short Link will be visible here</h5>
                                    <div className="redirect-url">
                                        <a target="_blank" rel="noopener noreferrer" href={this.state.link}>{this.state.link}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default UrlApp
