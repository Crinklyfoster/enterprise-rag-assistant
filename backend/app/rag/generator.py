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
        question: str
    ):
        prompt = f"""
        You are a helpful assistant.

        Use the provided context to answer the question.

        If the answer can be inferred from the context, provide a concise answer.

        Only respond with:
        "I could not find that information in the document."
        when the context contains no relevant information at all.

        Context:
        {context}

        Question:
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