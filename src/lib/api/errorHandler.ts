import { ProblemDetails } from "../../types/common.types";
import { enqueueSnackbar } from "notistack";

export function handleApiError(error: unknown): void {
  if (isProblemDetails(error)) {
    const problemDetails = error as ProblemDetails;

    switch (problemDetails.status) {
      case 400:
        enqueueSnackbar(problemDetails.detail || "Bad Request", {
          variant: "error",
        });
        break;
      case 401:
        enqueueSnackbar("Unauthorized. Please login again.", {
          variant: "error",
        });
        // Redirect to login
        window.location.href = "/auth/login";
        break;
      case 403:
        enqueueSnackbar("Forbidden. You do not have permission.", {
          variant: "error",
        });
        break;
      case 404:
        enqueueSnackbar("Resource not found.", { variant: "error" });
        break;
      case 409:
        enqueueSnackbar(
          problemDetails.detail || "Conflict. Resource already exists.",
          { variant: "error" },
        );
        break;
      case 429:
        enqueueSnackbar("Too many requests. Please try again later.", {
          variant: "warning",
        });
        break;
      case 500:
        enqueueSnackbar("Internal server error. Please try again later.", {
          variant: "error",
        });
        break;
      default:
        enqueueSnackbar(problemDetails.detail || "An error occurred.", {
          variant: "error",
        });
    }
  } else {
    enqueueSnackbar("An unexpected error occurred.", { variant: "error" });
  }
}

function isProblemDetails(error: unknown): error is ProblemDetails {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    "title" in error &&
    "status" in error
  );
}
