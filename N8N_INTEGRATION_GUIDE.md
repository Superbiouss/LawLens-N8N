# 🛠️ LawLens + n8n Integration Guide

Refer to this guide if you restart your **ngrok** tunnel or if your n8n workflows stop responding.

---

## 1. If ngrok Restarts (URL Changes)
When you restart ngrok locally, its public URL (e.g., `https://abcd-123.ngrok-free.dev`) will change. You must update the Supabase Orchestrator to point to the new URL.

### Step A: Update the code
Open [index.ts](file:///home/aakashyadav/Documents/Superbious/LawLens-N8N/supabase/functions/lawlens-orchestrator/index.ts) and replace the `N8N_URLS` value with your new ngrok URL + the webhook path:

```typescript
const N8N_URLS = {
  // Replace the domain part here ↓
  ask: "https://NEW-URL.ngrok-free.dev/webhook/89b41797-0382-40a0-a3a4-eb11fcae3782",
};
```

### Step B: Redeploy the Function
Run this command in your terminal to push the update to Supabase:
```bash
supabase functions deploy lawlens-orchestrator --no-verify-jwt
```

---

## 2. If n8n says "No Prompt Specified"
If you see this error in your n8n executions:
1. Open the **AI Agent** node.
2. Change **Source for Prompt** to `Define below`.
3. Set the Prompt field to: `{{ $json.body.chatInput }}`
4. **Click SAVE** (the disk icon) in the top right of n8n.

---

## 3. Production vs. Test URLs
- **Production URL**: `.../webhook/...` (Used by LawLens). Requires you to click **Save** and **Activate** in n8n.
- **Test URL**: `.../webhook-test/...` (Used for debugging). Only works when you click **"Listen for test event"** in n8n.

> [!TIP]
> **Always use the Production URL** in [index.ts](file:///home/aakashyadav/Documents/Superbious/LawLens-N8N/supabase/functions/lawlens-orchestrator/index.ts) unless you are actively debugging a specific node failure.
