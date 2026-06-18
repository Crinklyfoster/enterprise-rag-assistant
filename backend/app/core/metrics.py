from prometheus_client import Counter


DOCUMENT_UPLOADS = Counter(
    "documents_uploaded_total",
    "Total uploaded documents"
)

CHAT_REQUESTS = Counter(
    "chat_requests_total",
    "Total chat requests"
)