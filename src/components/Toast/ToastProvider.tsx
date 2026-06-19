import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      containerClassName="toast-container"
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--color-dark)",
          color: "var(--color-text-light)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          borderRadius: "var(--radius-pill)",
          padding: "0.75rem 1.25rem",
          boxShadow: "var(--shadow-md)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-gold)",
            secondary: "var(--color-dark)",
          },
        },
      }}
    />
  );
}
