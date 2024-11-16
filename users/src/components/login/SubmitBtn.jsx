import { useNavigation } from "react-router-dom";

function SubmitBtn({ text }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className="btn btn-primary w-100"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>{" "}
          Sending...
        </>
      ) : (
        text || "Submit"
      )}
    </button>
  );
}

export default SubmitBtn;
