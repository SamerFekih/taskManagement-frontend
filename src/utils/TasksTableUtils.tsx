export const getStatusSeverity = (status: string) => {
  switch (status.toUpperCase()) {
    case "IN PROGRESS":
      return "info";
    case "PENDING":
      return "warning";
    case "BLOCKED":
      return "danger";
    case "COMPLETED":
      return "success";
    default:
      return null;
  }
};
export const getPrioritySeverity = (priority: string) => {
  switch (priority.toUpperCase()) {
    case "HIGH":
      return "danger";
    case "MEDIUM":
      return "warning";
    case "LOW":
      return "info";
  }
};
export const getCategorySeverity = (category: string) => {
  switch (category.toUpperCase()) {
    case "WORK":
      return "info";
    case "PERSONAL":
      return "warning";
    case "BLOCKED":
      return "danger";
    case "COMPLETED":
      return "success";
    default:
      return null;
  }
};
