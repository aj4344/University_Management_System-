import React, { useState } from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { useNavigate } from 'react-router-dom';
import { fetchResponse } from '../../../api/service';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject, toastSuccessObject } from '../../../utility/toasts';
import GeneralCard from '../../../components/cards/GeneralCard';
import CourseRegisterForm from '../../../components/forms/CourseRegisterForm';

export default function RegisterCourse() {
  const adminId = JSON.parse(localStorage.getItem("admin"))._id;

  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    title: "",
    code: "",
    type: "",
    fee: "",
    creditHours: "",
    description: "", // Added description field
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegisteration(event) {
    event.preventDefault();
    
    // Validate required fields
    if (!signupDetails.title || !signupDetails.code || !signupDetails.fee) {
      toast.error("Please fill out all required fields", toastErrorObject);
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Registering course:", signupDetails);
      const res = await fetchResponse(
        courseEndpoints.registerCourse(),
        1,
        {...signupDetails, adminId}
      );
      
      if (!res || !res.success) {
        toast.error(res?.message || "Failed to register course", toastErrorObject);
        setIsLoading(false);
        return;
      }
      
      toast.success(res.message, toastSuccessObject);
      console.log("Course registered successfully:", res.data);
      navigate("/admin/courses/action");
    } catch (error) {
      console.error("Error registering course:", error);
      toast.error("Something went wrong while registering the course", toastErrorObject);
      setIsLoading(false);
    }
  }

  return (
    <AdminLayout isLoading={isLoading}>
      <div className="d-flex align-items-center justify-content-center">
        <GeneralCard header={"Register Course"}>
          <CourseRegisterForm
            signupDetails={signupDetails}
            setSignupDetails={setSignupDetails}
            handleSubmit={handleRegisteration}
          />
        </GeneralCard>
      </div>
    </AdminLayout>
  );
}
