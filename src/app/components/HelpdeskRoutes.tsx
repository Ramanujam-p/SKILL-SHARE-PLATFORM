import { Routes, Route } from "react-router-dom";
import { HelpdeskPage } from "./HelpdeskPage";
import { QuestionDetailPage } from "./QuestionDetailPage";

export function HelpdeskRoutes() {
  return (
    <Routes>
      <Route index element={<HelpdeskPage />} />
      <Route path=":questionId" element={<QuestionDetailPage />} />
    </Routes>
  );
}
