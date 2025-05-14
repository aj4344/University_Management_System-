// Additional status fix for University Management System marks display
// This flag forces marks of 100% to always show as Pass

// Place this file in the university-management-system-main/client/src/utility directory
// and import it in the Marks.jsx file

/**
 * Determines if a mark should be considered passing
 * @param {number} obtainedMarks - Marks obtained by the student
 * @param {number} totalMarks - Maximum possible marks for the assignment
 * @returns {boolean} - True if the marks should be considered as passing
 */
export function isPassingMark(obtainedMarks, totalMarks) {
  // Calculate percentage
  const percentage = (obtainedMarks / totalMarks) * 100;
  
  // Any of these conditions means a pass:
  // 1. Got 100% (full marks)
  // 2. Got at least 90% of the marks
  // 3. Got at least 50% of the marks
  return obtainedMarks === totalMarks || percentage >= 50;
}

/**
 * Gets a styled Pass/Fail badge component
 * @param {number} obtainedMarks - Marks obtained by the student
 * @param {number} totalMarks - Maximum possible marks for the assignment
 * @returns {JSX.Element} - A span element with appropriate styling
 */
export function getPassFailBadge(obtainedMarks, totalMarks) {
  const isPassing = isPassingMark(obtainedMarks, totalMarks);
  
  if (isPassing) {
    return <span className="badge bg-success">Pass</span>;
  } else {
    return <span className="badge bg-danger">Fail</span>;
  }
}
