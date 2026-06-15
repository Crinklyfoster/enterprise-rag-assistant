"use client";

import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { useUploadDocument } from "@/hooks/useUploadDocument";

export default function DocumentUpload() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const uploadMutation = useUploadDocument();

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadMutation.mutate(selectedFile, {
      onSuccess: () => {
        toast.success(
          "Document uploaded successfully"
        );

        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
      <label className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
        Click to select a document

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      <p className="mt-2 text-sm">
        {selectedFile
          ? selectedFile.name
          : "No file selected"}
      </p>

      <button
        type="button"
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
