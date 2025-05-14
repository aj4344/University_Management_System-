import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { fetchResponse } from "../../api/service";
import { studentEndpoints } from "../../api/endpoints/studentEndpoints";
import { toastErrorObject } from "../../utility/toasts";
import { toast } from "react-toastify";
import DynamicTable from "../../components/tables/DynamicTable";
import ActivityCard from "../../components/cards/ActivityCard";
import SelectField from "../../components/inputs/SelectField";
import { getPassFailBadge } from "../../utility/markUtils";

export default function Marks() {
  const studentId = JSON.parse(localStorage.getItem("student"))._id;

  const [marksData, setMarksData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseAndExamTypeNames() {
      try {
        let res;
        res = await fetchResponse(
          studentEndpoints.getCourseAndExamTypeNames(studentId),
          0,
          null
        );
        const resData = res.data;
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          return;
        }
        console.log("Log data", resData);
        setCourses(resData?.courses || []);
        setExamTypes(resData?.examTypes || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchCourseAndExamTypeNames();
  }, [studentId]);

  async function handleFetchMarks(courseId, examType) {
    if (!courseId || !examType) return;
    
    setIsLoading(true);
    try {
      console.log(`Fetching marks for student: ${studentId}, course: ${courseId}, examType: ${examType}`);
      let res;
      res = await fetchResponse(
        studentEndpoints.getAcademics(studentId, courseId, examType),
        0,
        null
      );
      
      if (!res) {
        toast.error("Failed to fetch academic data", toastErrorObject);
        setIsLoading(false);
        return;
      }
      
      if (!res.success) {
        toast.error(res.message || "Error fetching marks", toastErrorObject);
        setIsLoading(false);
        return;
      }
      
      console.log("Marks data:", res.data);
      setMarksData(res.data);
    } catch (error) {
      console.log("Error fetching marks:", error);
      toast.error("Error fetching marks data", toastErrorObject);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StudentLayout isLoading={isLoading}>
      <div className="row g-3">
        <div className="col-md-6">
          <SelectField
            label={"Select Course"}
            options={courses?.map((course) => ({
              title: course.title + " | " + course.instructor,
              value: course.courseId,
            })) || []}
            value={selectedCourse}
            onChange={(event) => {
              setMarksData(null);
              setSelectedCourse(event.target.value);
              setSelectedExamType("");
            }}
          />
        </div>
        <div className="col-md-6">
          <SelectField
            label={"Select Exam Type"}
            options={examTypes.map((examType) => ({
              title: examType,
              value: examType,
            }))}
            value={selectedExamType}
            onChange={(event) => {
              setMarksData(null);
              setSelectedExamType(event.target.value);
              if (selectedCourse && event.target.value) {
                console.log(`Selection changed - selectedCourse: ${selectedCourse}, examType: ${event.target.value}`);
                handleFetchMarks(selectedCourse, event.target.value);
              }
            }}
          />
        </div>
      </div>

      <div className="pt-3">
        {marksData?.length ? (
          <>
            <h4 className="mb-3">Marks for {selectedExamType}</h4>
            <DynamicTable
              styles={"table-bordered table-striped"}
              headers={["Activity", "Weightage", "Total Marks", "Obtained Marks", "Percentage", "Status"]}
              data={marksData}
              dataAttributes={[
                "activityNumber",
                "weightage",
                "totalMarks",
                "marks",
                (item) => `${((item.marks / item.totalMarks) * 100).toFixed(2)}%`,
                (item) => getPassFailBadge(Number(item.marks), Number(item.totalMarks))
              ]}
            />
            
            {/* Summary Information */}
            <div className="mt-4 p-3 bg-light rounded">
              <h5>Summary</h5>
              <div className="row">
                <div className="col-md-4">
                  <p><strong>Total Activities:</strong> {marksData.length}</p>
                </div>
                <div className="col-md-4">
                  <p><strong>Average Score:</strong> {
                    (marksData.reduce((sum, item) => sum + ((item.marks / item.totalMarks) * 100), 0) / marksData.length).toFixed(2)
                  }%</p>
                </div>
                <div className="col-md-4">
                  <p><strong>Total Weightage:</strong> {
                    marksData.reduce((sum, item) => sum + Number(item.weightage), 0)
                  }%</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          selectedCourse && selectedExamType && (
            <div className="alert alert-info text-center py-4">
              <h4>No marks data available</h4>
              <p className="mt-3">Your instructor hasn't posted any {selectedExamType} marks yet.</p>
            </div>
          )
        )}
      </div>
    </StudentLayout>
  );
}
