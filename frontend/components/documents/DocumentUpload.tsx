"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useUploadDocument } from "@/hooks/useUploadDocument";

export default function DocumentUpload() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const uploadMutation = useUploadDocument();

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadMutation.mutate(selectedFile, {
      onSuccess: () => {
        toast.success(
          "Document uploaded successfully"
        );

        setSelectedFile(null);
      },

      onError: () => {
        toast.error(
          "Failed to upload document"
        );
      },
    });
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-300 bg-white p-4 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white">
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setSelectedFile(file);
          }
        }}
      />

      <button
        onClick={handleUpload}
        disabled={
          !selectedFile ||
          uploadMutation.isPending
        }
        className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-gray-100 dark:text-black dark:hover:bg-white"
      >
        {uploadMutation.isPending
          ? "Uploading..."
          : "Upload"}
      </button>
    </div>
  );
}
