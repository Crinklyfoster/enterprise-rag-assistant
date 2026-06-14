import ollama


class Generator:

    def __init__(
        self,
        model_name: str = "qwen3:8b"
    ):
        self.model_name = model_name

    def generate(
        self,
        context: str,
        question: str,
        conversation_history: str = ""
    ):
        prompt = f"""
You are a helpful assistant.

Use the provided document context and conversation history
to answer the user's question.

If the conversation contains references such as:
"it", "that", "this", "they"
use the conversation history to determine what those
references mean.

Only respond with:
"I could not find that information in the document."

when the document context contains no relevant information.

Conversation History:
{conversation_history}

Document Context:
{context}

Current Question:
{question}

Answer:
"""

        response = ollama.chat(
            model=self.model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response["message"]["content"]