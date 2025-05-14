import React from "react";

export default function SignupForm({
  signupDetails,
  setSignupDetails,
  signup,
  update
}) {
  console.log(signupDetails)
  return (
    <form onSubmit={(event) => signup(event)} className="p-4 bg-white rounded shadow">
      <h2 className="text-center mb-4">{update ? "Update Profile" : "Create Account"}</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter first name"
              value={signupDetails.fname}
              onChange={(event) =>
                setSignupDetails({
                  ...signupDetails,
                  fname: event.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter last name"
              value={signupDetails.lname}
              onChange={(event) =>
                setSignupDetails({
                  ...signupDetails,
                  lname: event.target.value,
                })
              }
              required
            />
          </div>
        </div>
      </div>
      
      <div className="form-group mt-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          placeholder="Enter email address"
          value={signupDetails.email}
          onChange={(event) =>
            setSignupDetails({ ...signupDetails, email: event.target.value })
          }
          required
        />
      </div>
      
      <div className="form-group mt-3">
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          placeholder="Enter password"
          value={signupDetails.password}
          onChange={(event) =>
            setSignupDetails({
              ...signupDetails,
              password: event.target.value,
            })
          }
          required
        />
      </div>
      
      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-primary btn-lg">{update ? "Update Profile" : "Register"}</button>
      </div>
    </form>
  );
}
