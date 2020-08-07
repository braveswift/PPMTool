import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/SecurityActions";
import PropTypes from "prop-types";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: [e.target.value] });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    console.log(newUser);

    this.props.createNewUser(newUser, this.props.history);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    // className={classnames("form-control form-control-lg", {
                    //   "is-invalid": errors.fullName,
                    // })}
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {
                    //errors.fullName && (
                    //<div className="invalid-feedback">{errors.fullName}</div>)
                  }
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    // className={classnames("form-control form-control-lg", {
                    //   "is-invalid": errors.username,
                    // })}
                    className="form-control form-control-lg"
                    placeholder="Email Address(Username)"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createNewUser })(Register);
