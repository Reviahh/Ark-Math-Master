import { GoogleGenAI } from "@google/genai";
import { PRTS_SYSTEM_INSTRUCTION } from '../constants';

const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    throw new Error("API Key required");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToPRTS = async (
  message: string, 
  history: { role: 'user' | 'model', text: string }[]
): Promise<string> => {
  try {
    const ai = getAIClient();
    
    const formattedHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: PRTS_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage({ message });
    return result.text || "[PRTS] 错误：数据流中断。无法接收反馈。";
  } catch (error) {
    console.error("PRTS Connection Error:", error);
    return "[PRTS] 警告：神经连接不稳定。请检查您的 API Key 配置。";
  }
};

export const generateMissionBriefing = async (missionTitle: string, subject: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `你现在是明日方舟的PRTS系统。请为“${subject}”科目中的“${missionTitle}”这一课题生成一份简短的“作战简报”。
    
    要求：
    1. 语言必须是中文。
    2. 风格要像游戏里的关卡战前介绍，严肃、充满战术感。
    3. 用游戏内的例子（如干员技能、源石虫、BOSS机制、材料掉落等）来简要解释这个数学概念。
    4. 字数控制在100字左右。
    5. 结尾必须是“Mission Start”或“作战开始”。`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "简报生成失败。数据丢失。";
  } catch (error) {
    return "无法读取战术记录。权限不足或连接超时。";
  }
};