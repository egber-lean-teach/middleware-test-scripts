require("dotenv").config();
const { GoogleAiReveniumMiddleware } = require("@revenium/google");

async function testStreamingExample() {
  console.log("🔧 Environment variables:");
  console.log(
    "GOOGLE_API_KEY:",
    process.env.GOOGLE_API_KEY ? "Set" : "Not set"
  );
  console.log(
    "REVENIUM_METERING_API_KEY:",
    process.env.REVENIUM_METERING_API_KEY ? "Set" : "Not set"
  );
  console.log(
    "REVENIUM_METERING_BASE_URL:",
    process.env.REVENIUM_METERING_BASE_URL
  );

  try {
    console.log("\n🚀 Testing exact example from documentation...");

    const googleAI = new GoogleAiReveniumMiddleware();
    const model = googleAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
    });

    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: "What is the universe?" }],
        },
      ],
    });

    if (!result) {
      console.log("❌ No result received from generateContentStream");
      process.exit(1);
    }

    const asyncIterable = result?.[Symbol.asyncIterator]
      ? result
      : result?.stream;

    if (!asyncIterable || !asyncIterable[Symbol.asyncIterator]) {
      console.log("❌ No async iterable stream found in result");
      process.exit(1);
    }

    console.log("*** STREAMING RESPONSE ***");
    let fullText = "";

    for await (const chunk of asyncIterable) {
      const text =
        chunk?.candidates?.[0]?.content?.parts
          ?.map((p) => p?.text || "")
          .join("") ?? "";

      if (text) {
        process.stdout.write(text);
        fullText += text;
      }
    }

    console.log("\n✅ Streaming with metering successful!");
    console.log(`📊 Total response length: ${fullText.length} characters`);
  } catch (error) {
    console.error("❌ Error:", error);
    console.error("📋 Error details:", {
      name: error.name,
      message: error.message,
      status: error.status,
      stack: error.stack,
    });
  }
}

testStreamingExample();
