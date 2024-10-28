from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_MODEL

openaiClient = OpenAI(api_key=OPENAI_API_KEY)


class OpenAIThreadClient:
    def do_chat_completion(self, system_content=None, user_content=None, temperature=0.7, max_tokens=2000, json=True):
        messages = []
        if system_content:
            messages.append({"role": "system", "content": system_content})
        messages.append({"role": "user", "content": user_content})
		
        return openaiClient.chat.completions.create(
            messages=messages,
            model=OPENAI_MODEL,
            temperature=temperature,
            max_tokens=max_tokens,
            response_format={"type": "json_object" if json else "text"},
        )


openai_thread_client = OpenAIThreadClient()