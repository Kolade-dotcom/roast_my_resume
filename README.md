# 🔥 RoastMyResume - AI Resume Roasting & Rewriting App

A Next.js 14 web app where users upload their resume, get a free "roast" (humorous but honest critique), then can pay $9.99 for a professional rewrite.

## ✨ Features

- **Free Resume Roast**: Get brutally honest feedback on your resume
- **Professional Rewrite**: $9.99 for a complete professional rewrite with ATS optimization
- **PDF Upload or Text Paste**: Flexible input options
- **Stripe Integration**: Secure payment processing
- **AI-Powered**: Uses Claude Sonnet 4 for intelligent analysis and rewriting
- **Beautiful UI**: Stripe-inspired premium design with Tailwind CSS

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **AI**: Anthropic Claude API (claude-sonnet-4-20250514)
- **Payments**: Stripe
- **PDF Processing**: pdf-parse library
- **Hosting**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd roast-my-resume
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your API keys in `.env.local`:
   - **ANTHROPIC_API_KEY**: Get from [Anthropic Console](https://console.anthropic.com/)
   - **STRIPE_SECRET_KEY**: Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - **STRIPE_WEBHOOK_SECRET**: Set up webhook endpoint (see below)
   - **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Get from Stripe Dashboard
   - **NEXT_PUBLIC_URL**: Your app URL (http://localhost:3000 for development)

## 🔧 Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

3. Set up webhook endpoint:
   - Install Stripe CLI: `npm install -g stripe`
   - Login: `stripe login`
   - Forward webhooks to local: `stripe listen --forward-to localhost:3000/api/webhook`
   - Copy the webhook secret (starts with `whsec_`) to your `.env.local`

4. For production:
   - Add webhook endpoint in Stripe Dashboard: `https://yourdomain.com/api/webhook`
   - Listen for event: `checkout.session.completed`
   - Copy the webhook secret to your production environment variables

## 🏃 Running the App

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm start
```

## 📁 Project Structure

```
roast-my-resume/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── roast/page.tsx          # Roast results page
│   ├── success/page.tsx        # Post-payment success page
│   ├── api/
│   │   ├── roast/route.ts      # Generate free roast
│   │   ├── rewrite/route.ts    # Generate paid rewrite
│   │   ├── checkout/route.ts   # Create Stripe session
│   │   └── webhook/route.ts    # Handle Stripe webhook
│   └── globals.css             # Global styles
├── components/
│   ├── UploadZone.tsx          # File upload + text paste
│   ├── RoastDisplay.tsx        # Display roast results
│   ├── RewriteDisplay.tsx      # Display paid rewrite
│   ├── PricingCard.tsx         # Pricing tiers
│   └── Button.tsx              # Reusable button
├── lib/
│   ├── prompts.ts              # AI prompts
│   ├── pdf-extract.ts          # PDF text extraction
│   └── stripe.ts               # Stripe config
└── types/
    └── index.ts                # TypeScript types
```

## 🎨 Design System

The app uses a "Stripe-inspired premium" design:
- Soft white/cream backgrounds (#FAFAFA)
- Purple gradient accents (#6366F1 to #8B5CF6)
- White cards with soft shadows
- Smooth animations and transitions
- Inter font family
- Generous white space

## 🔑 API Routes

### POST /api/roast
Generate a free resume roast.
- Accepts: FormData with `file` (PDF) or `text` (string)
- Returns: `{ roast: string, resumeText: string }`

### POST /api/checkout
Create a Stripe checkout session.
- Accepts: `{ resumeText: string, email?: string }`
- Returns: `{ url: string }`

### GET /api/rewrite
Get the rewritten resume after payment.
- Query params: `session_id` (Stripe session ID)
- Returns: `RewriteResult` object

### POST /api/webhook
Handle Stripe webhook events.
- Listens for: `checkout.session.completed`
- Generates rewrite after successful payment

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import project in [Vercel](https://vercel.com)

3. Add environment variables in Vercel dashboard

4. Deploy!

5. Update Stripe webhook URL to your production domain

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `NEXT_PUBLIC_URL` | Your app URL | Yes |

## 🎯 User Flow

1. **Landing Page**: User uploads PDF or pastes resume text
2. **Processing**: AI analyzes resume and generates roast
3. **Roast Page**: User sees free roast with option to buy rewrite
4. **Checkout**: User clicks "Get Rewrite" → redirected to Stripe
5. **Payment**: User completes payment on Stripe
6. **Success Page**: User sees rewritten resume with analysis

## 🛠️ Development Tips

- Use Stripe test mode during development
- Test webhook locally with Stripe CLI
- Check browser console for errors
- Use sessionStorage to persist roast results between pages

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Future Enhancements

- [ ] Database integration for storing rewrites
- [ ] Email delivery of rewritten resumes
- [ ] Multiple resume templates
- [ ] LinkedIn profile optimization
- [ ] Cover letter generation
- [ ] User accounts and history
- [ ] A/B testing different roast styles

---

Built with 🔥 by developers who've been there
