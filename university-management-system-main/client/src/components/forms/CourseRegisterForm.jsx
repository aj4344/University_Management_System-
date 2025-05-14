import React from "react";

export default function CourseRegisterForm({
  signupDetails,
  setSignupDetails,
  handleSubmit,
}) {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label className="form-label">Title <span className="text-danger">*</span></label>
      <input
        className="form-control mb-4"
        type="text"
        placeholder="Enter course title"
        value={signupDetails.title}
        onChange={(event) =>
          setSignupDetails({
            ...signupDetails,
            title: event.target.value,
          })
        }
        required
      />
      <label className="form-label">Credit Hours</label>
      <input
        className="form-control mb-4"
        type="number"
        placeholder="Enter credit hours"
        value={signupDetails.creditHours}
        onChange={(event) =>
          setSignupDetails({
            ...signupDetails,
            creditHours: event.target.value,
          })
        }
      />
      <label className="form-label">Fee <span className="text-danger">*</span></label>
      <input
        className="form-control mb-4"
        type="number"
        placeholder="Enter course fee"
        value={signupDetails.fee}
        onChange={(event) =>
          setSignupDetails({
            ...signupDetails,
            fee: event.target.value,
          })
        }
        required
      />
      <label className="form-label">Type <span className="text-danger">*</span></label>
      <select
      className="form-select mb-4"
      value={signupDetails.type}
      onChange={(event) =>
        setSignupDetails({
          ...signupDetails,
          type: event.target.value,
        })
      }
      required
      >
        <option value="">Select</option>
        <option value="Core">Core</option>
        <option value="Elective">Elective</option>
        <option value="Lab">Lab</option>
        <option value="Project">Project</option>
      </select>
      <label className="form-label">Code <span className="text-danger">*</span></label>
      <input
        className="form-control mb-4"
        type="text"
        placeholder="Enter course code (e.g. CS101)"
        value={signupDetails.code}
        onChange={(event) =>
          setSignupDetails({
            ...signupDetails,
            code: event.target.value,
          })
        }
        required
      />
      
      <label className="form-label">Description</label>
      <textarea
        className="form-control mb-4"
        rows="3"
        placeholder="Enter course description"
        value={signupDetails.description}
        onChange={(event) =>
          setSignupDetails({
            ...signupDetails,
            description: event.target.value,
          })
        }
      />
      
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary">Register Course</button>
      </div>
    </form>
  );
}
