import React, { useEffect, useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout'
import { fetchResponse } from '../../api/service';
import { courseEndpoints } from '../../api/endpoints/courseEndpoints';
import { toastErrorObject, toastSuccessObject } from '../../utility/toasts';
import { toast } from 'react-toastify';
import RegisterCourseTable from '../../components/tables/RegisterCourseTable';

export default function RegisterCourse() {
    const studentId = JSON.parse(localStorage.getItem("student"))._id;

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchOfferedCoursesData() {
        try {
          console.log("Fetching offered courses...");
          let res;
          res = await fetchResponse(
            courseEndpoints.getOfferedCourses(),
            0,
            null
          );
          
          if (!res || !res.success) {
            toast.error(res?.message || "Failed to fetch courses", toastErrorObject);
            setIsLoading(false);
            return;
          }
          
          const resData = res.data || [];
          console.log("Offered courses data:", resData);
          
          if (resData.length === 0) {
            console.log("No offered courses found");
            toast.info("No courses available for registration", toastErrorObject);
          }
          
          const sortedCourses = resData.sort((a, b) => {
            const titleComparison = a.title.localeCompare(b.title);
            if (titleComparison !== 0) {
              return titleComparison;
            }
            return a.instructorName.localeCompare(b.instructorName);
          });
          
          setCourses(sortedCourses);
        } catch (error) {
          console.log("Error fetching courses:", error);
          toast.error("Error fetching courses", toastErrorObject);
        } finally {
          setIsLoading(false);
        }
      }
      fetchOfferedCoursesData();
    }, [studentId]);
  
    async function registerCourse(item) {
      let result = window.confirm("Are you sure you want to register for this course?");
      if (!result) return;
      
      setIsLoading(true);
      try {
        console.log("Registering for course:", item);
        console.log("Using endpoint:", courseEndpoints.registerCourseByStudent());
        
        const res = await fetchResponse(
          courseEndpoints.registerCourseByStudent(),
          1,
          {
            courseId: item.courseId,
            instructorId: item.instructorId,
            studentId,
          }
        );
        
        if (!res) {
          toast.error("Failed to connect to server", toastErrorObject);
          setIsLoading(false);
          return;
        }
        
        if (!res.success) {
          toast.error(res.message || "Error registering for course", toastErrorObject);
          setIsLoading(false);
          return;
        }
        
        toast.success(res.message, toastSuccessObject);
        console.log("Course registered successfully:", res.data);
        
        // Remove the registered course from the available courses list
        const updatedCourses = courses.filter(
          (course) => course.courseId !== item.courseId
        );
        setCourses(updatedCourses);
      } catch (error) {
        console.log("Error registering for course:", error);
        toast.error("Error registering for course: " + (error.message || "Unknown error"), toastErrorObject);
      } finally {
        setIsLoading(false);
      }
    }
  
    return (
      <StudentLayout isLoading={isLoading}>
        <h4 className="mb-3">Available Courses for Registration</h4>
        {courses.length === 0 && !isLoading && (
          <div className="alert alert-info">
            No courses are available for registration. Please check with your administrator.
          </div>
        )}
        <RegisterCourseTable
          headers={["Course", "Instructor", "Code", "Type", "Action"]}
          data={courses}
          dataAttributes={[
            "title",
            "instructorName",
            "code",
            "type",
            (item) => (
              <button
                className="btn btn-primary"
                onClick={() => registerCourse(item)}
              >
                Register
              </button>
            ),
          ]}
        />
      </StudentLayout>
    );
}
