import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useLocation } from "wouter"; // ✅ import มาจาก wouter ตรง ๆ

// ✅ handle redirect จาก 404.html
function handleRedirect() {
    const redirectPath = sessionStorage.redirect;
    if (redirectPath) {
        sessionStorage.removeItem("redirect");

        // ✅ ใช้ dynamic import เพื่อเรียก navigate หลัง react เริ่มทำงาน
        import("wouter").then(({ useLocation }) => {
            const [, navigate] = useLocation();
            setTimeout(() => navigate(redirectPath), 100);
        });
    }
}

handleRedirect();

createRoot(document.getElementById("root")!).render(<App />);
