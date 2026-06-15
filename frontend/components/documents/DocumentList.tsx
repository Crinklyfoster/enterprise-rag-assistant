import { Document } from "@/types/document";
import DocumentCard from "./DocumentCard";

interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({
  documents,
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-lg border border-gray-300 bg-white p-8 text-center text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white">
        <p className="text-lg font-medium">
          No documents uploaded
        </p>

        <p className="text-sm text-muted-foreground mt-2">
          Upload a document to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </div>
  );
}
