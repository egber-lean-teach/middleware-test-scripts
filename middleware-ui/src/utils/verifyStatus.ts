export const verifyStatus = (status: string) => {
  if (status === "working") {
    return "success";
  }
  if (status === "no working") {
    return "destructive";
  }
  if (status === "In progress") {
    return "warning";
  }
  return "secondary";
};
