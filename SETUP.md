# 🚀 Quick Setup Guide

Follow these steps to get RoastMyResume running locally:

## 1. Install Dependencies

```bash
npm install
```

## 2. Get Your API Keys

### Google AI API Key
1. Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza`)

### Stripe API Keys
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create an account
3. Go to Developers → API Keys
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### Stripe Webhook Secret (for local development)
1. Install Stripe CLI:
   ```bash
   npm install -g stripe
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Start webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`)

## 3. Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your keys:
   ```env
   GOOGLE_AI_API_KEY=AIza_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   NEXT_PUBLIC_URL=http://localhost:3000
   ```

## 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 5. Test the App

### Test the Free Roast
1. Upload a sample resume PDF or paste resume text
2. Click "GET ROASTED"
3. View your roast results

### Test the Payment Flow (Test Mode)
1. After getting a roast, click "Get Professional Rewrite - $9.99"
2. Use Stripe test card: `4242 4242 4242 4242`
3. Use any future expiry date (e.g., 12/34)
4. Use any 3-digit CVC (e.g., 123)
5. Complete the payment
6. View your rewritten resume

## 🎉 You're All Set!

The app should now be running locally. If you encounter any issues:

1. Check that all environment variables are set correctly
2. Ensure the Stripe webhook listener is running
3. Check the browser console for errors
4. Check the terminal for server errors

## 📝 Sample Resume Text for Testing

If you don't have a resume handy, use this sample:

```
John Doe
Software Engineer

EXPERIENCE
Senior Developer at Tech Corp (2020-Present)
- Responsible for developing features
- Worked with team members
- Utilized cutting-edge technologies
- Synergized with stakeholders

SKILLS
JavaScript, React, Node.js, Team Player, Self-Starter, Detail-Oriented

EDUCATION
Bachelor's Degree in Computer Science
```

This sample has plenty of buzzwords and generic phrases that will get roasted! 🔥
