export const verifyStatus = (status: string) => {
  if (status === "active" || status === "working") {
    return "success";
  }
  if (status === "inactive" || status === "no working") {
    return "destructive";
  }
  if (status === "in progress" || status === "In progress") {
    return "warning";
  }
  return "secondary";
};
