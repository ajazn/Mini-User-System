import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateUserSummary = async (req, res) => {
  try {
    // This simulates the AI logic immediately
    const mockData = {
      summary: `${req.user.fullName} is a dedicated ${req.user.role} with a focus on building scalable systems and efficient workflows.`,
      tags: ["Leadership", "MERN Stack", "Problem Solving"],
    };

    res.status(200).json({
      status: "success",
      data: mockData,
    });
  } catch (err) {
    res.status(400).json({ status: "fail" });
  }
};
