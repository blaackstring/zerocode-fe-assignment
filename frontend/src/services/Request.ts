import { client } from "./HF_config";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

interface SendingRequestProps {
  messages: Message[];
}

export const SendingRequest = async ({ messages }: SendingRequestProps): Promise<Message> => {
  try {
  const chatCompletion = await client.chatCompletion({
  model: "meta-llama/Meta-Llama-3-8B-Instruct",
  messages
});

    const reply = chatCompletion.choices[0].message;
    console.log("Assistant raw reply:", reply);

    const formattedReply: Message = {
      role: "assistant",
      content: String(reply?.content || reply?.text || JSON.stringify(reply))
    };

    console.log("Formatted reply:", formattedReply);
    return formattedReply;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error;
  }
};
