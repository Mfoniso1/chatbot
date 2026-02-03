# Deployment Guide: AI Chatbot System

This guide covers deploying your chatbot system to production so other developers can integrate it.

## Architecture Overview

You need to host **3 components**:
1. **Backend API** (FastAPI) - Handles chat queries and document ingestion
2. **Admin Dashboard** (React) - For organizations to manage their bot
3. **Widget Script** (Static JS) - The embeddable chatbot for websites

---

## Option 1: All-in-One Platform (Recommended for Starting)

### Using **Render.com** (Free Tier Available)

#### Step 1: Deploy the Backend

1. **Prepare your backend**:
   ```bash
   cd backend
   pip freeze > requirements.txt
   ```

2. **Create `render.yaml`** in your project root:
   ```yaml
   services:
     - type: web
       name: chatbot-api
       env: python
       buildCommand: pip install -r backend/requirements.txt
       startCommand: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
       envVars:
         - key: GOOGLE_API_KEY
           sync: false
   ```

3. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

4. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Render will auto-detect `render.yaml`
   - Add your `GOOGLE_API_KEY` in the Environment section
   - Click "Create Web Service"
   - **Your API URL**: `https://chatbot-api-xxxx.onrender.com`

#### Step 2: Deploy the Dashboard

1. **Update API URL** in `frontend/dashboard/src/Dashboard.jsx`:
   ```javascript
   const Dashboard = ({ apiBaseUrl = 'https://your-backend-url.onrender.com' }) => {
   ```

2. **Build the dashboard**:
   ```bash
   cd frontend/dashboard
   npm run build
   ```

3. **Deploy to Vercel/Netlify**:
   - **Vercel**: `npm install -g vercel && vercel deploy`
   - **Netlify**: Drag the `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
   - **Your Dashboard URL**: `https://your-dashboard.vercel.app`

#### Step 3: Deploy the Widget

1. **Update API URL** in `frontend/widget/src/ChatWidget.jsx`:
   ```javascript
   const ChatWidget = ({ apiBaseUrl = 'https://your-backend-url.onrender.com' }) => {
   ```

2. **Build the widget**:
   ```bash
   cd frontend/widget
   npm run build
   ```

3. **Host on CDN**:
   - Upload `dist/widget.js` to **Netlify** or **Vercel** as a static site
   - **Your Widget URL**: `https://your-cdn.netlify.app/widget.js`

4. **Integration Code for Developers**:
   ```html
   <script src="https://your-cdn.netlify.app/widget.js"></script>
   ```

---

## Option 2: Separate Cloud Services

### Backend: Railway/Render
- Best for Python/FastAPI
- Automatic scaling
- Built-in PostgreSQL (if you upgrade from ChromaDB)

### Frontend: Vercel/Netlify
- Optimized for React apps
- Global CDN for widget.js
- Automatic HTTPS

### Database: 
- **Current**: ChromaDB (file-based, stored with backend)
- **Upgrade Option**: PostgreSQL + pgvector for production scale

---

## Configuration for Multi-Developer Use

### 1. Environment Variables (Backend)

Create a production `.env`:
```bash
GOOGLE_API_KEY=your_production_key
DATABASE_PATH=/var/data/chroma_db
ALLOWED_ORIGINS=https://client1.com,https://client2.com
```

### 2. Widget Configuration

Allow developers to customize the widget:
```html
<script src="https://your-cdn.com/widget.js"></script>
<script>
  // Optional: override backend URL
  window.CHATBOT_API_URL = 'https://your-backend.com';
</script>
```

### 3. API Access Control

Update `backend/main.py` to restrict CORS if needed:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://trusted-domain.com"],  # Restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Cost Estimate (Starting Small)

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| **Render** (Backend) | 750 hrs/month | $7/month |
| **Vercel** (Dashboard) | Unlimited | $20/month (Pro) |
| **Netlify** (Widget CDN) | 100 GB bandwidth | $19/month |
| **Google Gemini API** | 60 requests/min | Pay-as-you-go |

**Total to start**: $0/month  
**Total for production**: ~$50/month

---

## Production Checklist

- [ ] Set up proper API rate limiting on backend
- [ ] Add authentication for admin dashboard
- [ ] Configure custom domain (e.g., `api.yourcompany.com`)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Create backup strategy for ChromaDB
- [ ] Add analytics to track widget usage
- [ ] Create developer documentation for integration

---

## Sharing with Your Collaborator

### For Backend Development:
```bash
# Clone the repo
git clone <your-repo>
cd chatbot/backend

# Install dependencies
pip install -r requirements.txt

# Create .env with API key
echo "GOOGLE_API_KEY=your_key" > .env

# Run locally
python main.py
```

### For Integration Testing:
```html
<!-- Test Page -->
<!DOCTYPE html>
<html>
<head><title>Test Bot</title></head>
<body>
  <h1>My Website</h1>
  <script src="https://your-cdn.com/widget.js"></script>
</body>
</html>
```

---

## Next Steps

1. **Resolve API quota** (wait or upgrade to paid tier)
2. **Push code to GitHub**
3. **Deploy backend to Render**
4. **Deploy frontend to Vercel/Netlify**
5. **Share URLs with your collaborator**
6. **Test integration on a sample website**

Need help with any specific deployment step? Let me know!
