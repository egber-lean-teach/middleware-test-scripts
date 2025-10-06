# Middleware Test Scripts

A comprehensive testing platform for Revenium middleware integrations including Google AI, Vertex AI, and Perplexity AI. This project consists of a React frontend (middleware-ui) and a Node.js backend (middleware-backend) that work together to provide an easy-to-use interface for QA teams to test and validate middleware functionality.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing Examples](#testing-examples)
- [Troubleshooting](#troubleshooting)
- [Error Handling](#error-handling)

## 🔧 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher)
- **Git** (for cloning the repository)

Verify your installations:

```bash
node --version
npm --version
git --version
```

## 📁 Project Structure

```
middleware-script-test-01/
├── middleware-backend/          # Node.js Express backend
│   ├── src/                    # Source code
│   ├── keys/                   # API keys and credentials
│   ├── postman/               # Postman collection for API testing
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── nodemon.json          # Development server configuration
├── middleware-ui/              # React frontend
│   ├── src/                   # Source code
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
└── README.md                  # This file
```

## 🌍 Environment Setup

### Backend Environment Variables

The backend requires a `.env` file in the `middleware-backend/` directory with the following variables:

```bash
# Google AI API Configuration
GOOGLE_API_KEY=your_google_api_key_here

# Revenium Configuration
REVENIUM_METERING_API_KEY=your_revenium_api_key_here
REVENIUM_METERING_BASE_URL=https://api.qa.hcapp.io/meter

# Google Cloud Configuration (for Vertex AI)
GOOGLE_CLOUD_PROJECT_ID=your_project_id_here
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_CREDENTIALS=path_to_your_vertex_credentials.json

# Perplexity AI Configuration
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

### Environment Options

The application supports multiple environments:

| Environment | Base URL                            |
| ----------- | ----------------------------------- |
| **QA**      | `https://api.qa.hcapp.io/meter`     |
| **DEV**     | `https://api.dev.hcapp.io/meter`    |
| **UAT**     | `https://api.uat.revenium.io/meter` |
| **PROD**    | `https://api.revenium/meter`        |

⚠️ **Important**: Ensure that `REVENIUM_METERING_API_KEY` and `REVENIUM_METERING_BASE_URL` correspond to the same environment.

## 🚀 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd middleware-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

1. Create a `.env` file in the `middleware-backend/` directory
2. Copy the environment template above and fill in your actual API keys
3. Ensure all required keys are properly configured

### Step 4: Verify Configuration

You can test your environment setup by running:

```bash
node test-google.js
```

This will verify that your Google API key and Revenium configuration are working correctly.

### Step 5: Start the Backend Server

For development (with auto-reload):

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The backend server will start on **http://localhost:3000**

### Backend Success Indicators

✅ You should see:

```
Server is running on port 3000
ok
```

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd middleware-ui
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Development Server

```bash
npm run dev
```

The frontend will start on **http://localhost:5173**

### Frontend Success Indicators

✅ You should see:

```
  VITE v7.1.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## 🏃‍♂️ Running the Application

### Complete Startup Sequence

1. **Start Backend First** (Terminal 1):

   ```bash
   cd middleware-backend
   npm run dev
   ```

   Wait for: `Server is running on port 3000`

2. **Start Frontend** (Terminal 2):

   ```bash
   cd middleware-ui
   npm run dev
   ```

   Wait for: `Local: http://localhost:5173/`

3. **Access the Application**:
   Open your browser and navigate to **http://localhost:5173**

### Application Interface

The UI consists of three main sections:

1. **MIDDLEWARES** (Left Panel)

   - Select from available middleware providers:
     - Google AI
     - Vertex AI
     - Perplexity AI
     - Google V1 (legacy)

2. **REQUEST** (Center Panel)

   - Configure your test request:
     - **Type**: streams, basics, embeddings, enhanced
     - **Model**: Available models for selected middleware
     - **Environment**: QA, DEV, UAT, PROD
     - **Prompt**: Your test question/input

3. **RESPONSES** (Right Panel)
   - View AI responses and metadata
   - Monitor request/response details
   - Clear results with "Clear All" button

## 🔌 API Endpoints

### Google AI Endpoints

```
POST /api/revenium/google/streams
POST /api/revenium/google/basics
POST /api/revenium/google/embeddings
POST /api/revenium/google/enhanced
```

### Vertex AI Endpoints

```
POST /api/revenium/vertex/streams
POST /api/revenium/vertex/basics
POST /api/revenium/vertex/embeddings
POST /api/revenium/vertex/enhanced
```

### Perplexity AI Endpoints

```
POST /api/revenium/perplexity/streams
POST /api/revenium/perplexity/basics
POST /api/revenium/perplexity/enhanced
POST /api/revenium/perplexity/metadatas
```

### Request Format

```json
{
  "question": "What is the universe?",
  "model": "gemini-2.0-flash-001",
  "baseUrl": "https://api.qa.hcapp.io/meter"
}
```

### Response Format

```json
{
  "message": "Success",
  "status": 200,
  "data": [
    {
      "content": {
        "response": "The universe is...",
        "length": 1234
      }
    }
  ]
}
```

## 🧪 Testing Examples

### Example 1: Basic Google AI Request

1. **Select Middleware**: Google
2. **Configure Request**:
   - Type: `basics`
   - Model: `gemini-2.0-flash-001`
   - Environment: `QA`
   - Prompt: `What is artificial intelligence?`
3. **Click Send**
4. **Expected Response**: Text response with AI explanation

### Example 2: Embeddings Request

1. **Select Middleware**: Google
2. **Configure Request**:
   - Type: `embeddings`
   - Model: `text-embedding-004`
   - Environment: `QA`
   - Prompt: `Machine learning concepts`
3. **Click Send**
4. **Expected Response**: Vector embeddings with dimensions

### Example 3: Streaming Request

1. **Select Middleware**: Vertex
2. **Configure Request**:
   - Type: `streams`
   - Model: `gemini-2.0-flash-001`
   - Environment: `QA`
   - Prompt: `Explain quantum computing`
3. **Click Send**
4. **Expected Response**: Streamed text response

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Port 3000 already in use or API calls fail**

```bash
# Check and kill existing processes
netstat -an | grep 3000
pkill -f "node.*3000"
```

**Environment variables not loading**

```bash
# Verify .env file format (no spaces around =)
cat middleware-backend/.env
```

**Google Credentials error**

```bash
# Verify credentials file exists and is valid JSON
ls -la "path_to_your_vertex_credentials.json"
```

#### Frontend Issues

**CORS or Network errors**

- Ensure backend runs on port 3000
- Frontend should access http://localhost:5173
- Check browser network tab for details

**UI not loading properly**

```bash
# Clean reinstall
cd middleware-ui && rm -rf node_modules package-lock.json && npm install
```

#### Debug Mode

```bash
# Add to .env file
DEBUG=true
LOG_LEVEL=debug
```

## ❌ Error Handling

### Common Error Messages

| Error Type             | Message                       | Solution                                                           |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------ |
| **Missing API Keys**   | "Client API Key is not set"   | Verify `GOOGLE_API_KEY` in `.env`                                  |
| **Invalid Model**      | "Model not supported"         | Use supported models from response                                 |
| **Missing Parameters** | "Missing required parameters" | Provide both `question` and `model`                                |
| **Revenium Config**    | "Revenium API Key is not set" | Check `REVENIUM_METERING_API_KEY` and `REVENIUM_METERING_BASE_URL` |

### UI Error Display

- **Form Validation**: "Please fill all the fields"
- **Network Errors**: "Something went wrong"
- **API Errors**: Shows backend error message

### Success Indicators

#### Successful Request

✅ **Backend Console**:

```
Processing basic request
result { candidates: [...] }
```

✅ **Frontend UI**:

- Response appears in right panel
- Length counter shows character count
- No error badges visible

#### Successful Embeddings

✅ **Response Format**:

```
Embedding Vectors:
Vector 1
Tokens: 4 | Truncated: No
[0.123456, -0.789012, 0.345678, ...]
Dimensions: 768
```

## 📞 Support

For additional support:

1. **Check Logs**: Review browser console and backend terminal output
2. **Postman Collection**: Use the provided Postman collection in `middleware-backend/postman/` for direct API testing
3. **Environment Verification**: Run `node test-google.js` to verify backend configuration
4. **Documentation**: Refer to individual middleware documentation:
   - [@revenium/google](https://www.npmjs.com/package/@revenium/google)
   - [@revenium/vertex](https://www.npmjs.com/package/@revenium/vertex)
   - [@revenium/perplexity](https://www.npmjs.com/package/@revenium/perplexity)

---

**Happy Testing! 🚀**
