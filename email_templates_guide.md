# EmailJS Templates Guide

You only need to create **ONE Template** in EmailJS. It has two tabs that handle both emails.

## Step 1: Main Email (Notification to YOU)

1.  Go to the **"Content"** tab.
2.  **Subject**: `New Project Request from {{client_name}}`
3.  **To Email**: `your_email@gmail.com`
4.  **Source Code** (Click `< >` icon and paste this):

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px; border: 1px solid #e4e4e7; }
  .header { font-size: 20px; font-weight: bold; color: #18181b; margin-bottom: 20px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
  .field { margin-bottom: 15px; }
  .label { font-size: 12px; color: #71717a; text-transform: uppercase; font-weight: bold; }
  .value { font-size: 16px; color: #09090b; margin-top: 5px; }
  .message-box { background: #f4f4f5; padding: 15px; border-radius: 6px; font-family: monospace; white-space: pre-wrap; }
</style>
</head>
<body>
<div class="container">
  <div class="header">New Project Request 🚀</div>
  
  <div class="field">
    <div class="label">Client Name</div>
    <div class="value">{{client_name}}</div>
  </div>
  
  <div class="field">
    <div class="label">Email</div>
    <div class="value"><a href="mailto:{{client_email}}">{{client_email}}</a></div>
  </div>

  <div class="field">
    <div class="label">Phone</div>
    <div class="value">{{client_phone}}</div>
  </div>

  <div class="field">
    <div class="label">Project Requirements</div>
    <div class="value message-box">{{message}}</div>
  </div>
</div>
</body>
</html>
```

---

## Step 2: Auto-Reply (Confirmation to CLIENT)

1.  Click the **"Auto-Reply"** tab (next to "Content").
2.  **Enable Auto-Reply**: Check box ✅.
3.  **To Email**: `{{client_email}}` (Important!).
4.  **Subject**: `We received your request! - DraftPoint`
5.  **Source Code** (Click `< >` icon and paste this):

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; padding: 40px 20px; }
  .card { max-width: 500px; margin: 0 auto; background: #1e293b; color: #fff; padding: 40px; border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid #334155; }
  h1 { margin: 0 0 20px; font-size: 24px; color: #fff; }
  p { color: #94a3b8; line-height: 1.6; margin-bottom: 30px; }
  .btn { display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: background 0.3s; }
  .btn:hover { background: #4f46e5; }
</style>
</head>
<body>
<div class="card">
  <h1>Hi {{client_name}}! 👋</h1>
  <p>
    Thanks for reaching out to <strong>DraftPoint</strong>. 
    I've received your project details and am reviewing them right now.
  </p>
  <p>
    I usually reply within 24 hours. In the meantime, feel free to browse my portfolio or download my CV.
  </p>
  <a href="https://your-portfolio-url.com" class="btn">View Portfolio</a>
</div>
</body>
</html>
```

## Step 3: Finish

1.  Click **Save**.
2.  Copy the **Template ID** (e.g., `template_xyz123`).
3.  Paste it in the chat!
