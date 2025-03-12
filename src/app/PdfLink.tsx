"use client";

import { FileText } from "lucide-react";

const PDFLink = () => {
  const openPDF = () => {
    window.open(
      "https://t3chat-development.s3.ap-northeast-1.amazonaws.com/project_presentation.pdf",
      "_blank",
    );
  };

  return (
    <div className="mt-4 flex cursor-pointer items-center" onClick={openPDF}>
      <FileText className="mr-2" size={24} />
      <span>project_presentation</span>
    </div>
  );
};

export default PDFLink;
