import { OpenAI } from "openai"
import { CustomError } from "../middleware/customErrorHandler"
import { StatusCodes } from "http-status-codes"


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

export const aiChat = async (req, res) => {
  try {
    const {message} = req.body
    if (!message) throw CustomError("Message is required!")
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages:[
        {
          role: "system",
          content: "You are a helpful virtual health assistant. Provide general medical guidance, but do not give exact diagnoses or prescriptions."
        },
        {
          role: "user",
          content: message
        }
      ]
  })
  const reply = response.choices[0].message.content;
  res.json({reply})
  } catch (error) {
    console.error("AI error", error),
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Failed to process message!"})
  }
}