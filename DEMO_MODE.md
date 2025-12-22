# 🎭 Demo Mode - RoastMyResume

## What is Demo Mode?

The app is currently running in **demo mode** with mock data, so you can test the full user experience without needing API keys!

## What Works in Demo Mode

✅ **Full UI Experience**
- Beautiful, modern, and fun interface
- Smooth animations and transitions
- Responsive design on all devices

✅ **Resume Upload**
- Paste resume text directly
- Upload PDF files (triggers mock response)
- Sample resume text provided

✅ **AI Roasting**
- 3 different pre-written roasts
- Randomly selected for variety
- Realistic formatting and style
- Includes emojis and personality

✅ **Navigation**
- Landing page with features
- Roast results page
- Share functionality
- Smooth page transitions

## What's Coming Soon

🚧 **Payment Integration**
- Stripe checkout (marked as "Coming Soon")
- Professional rewrite feature
- Download functionality

🚧 **Real AI Integration**
- Anthropic Claude API for actual roasting
- Custom AI-generated feedback
- PDF text extraction

## How to Test

### Option 1: Use Sample Text
1. Click "Paste Text" tab
2. Click "Click to use sample resume" button
3. Click "GET ROASTED 🔥"
4. Wait 1.5 seconds for mock API delay
5. View your roast!

### Option 2: Paste Your Own Text
1. Click "Paste Text" tab
2. Paste any resume text (minimum 10 characters)
3. Click "GET ROASTED 🔥"
4. Get a random roast from our collection

### Option 3: Upload a PDF
1. Click "Upload PDF" tab
2. Drag and drop or click to select any PDF
3. Automatically triggers mock roast
4. View results instantly

## Mock Roasts

The app includes 3 different mock roasts that cover common resume mistakes:

1. **Buzzword Overload** - Targets generic corporate jargon
2. **Formatting Issues** - Addresses structure and readability
3. **Lack of Specificity** - Highlights missing metrics and details

Each roast includes:
- Overall verdict with humor
- Top 3 specific issues
- Buzzword bingo
- Positive feedback
- Encouraging conclusion

## UI Features

### Landing Page
- Animated gradient background with floating blobs
- Pulsing "5,247 resumes roasted" badge
- Animated gradient text effects
- Hover effects on feature cards
- Smooth scroll to top button

### Upload Zone
- Tab switching between paste and upload
- Drag and drop with visual feedback
- Sample resume quick-fill
- Loading states with animations
- Clear visual hierarchy

### Roast Results
- Clean, readable card design
- Pulsing "ROASTED" badge
- Coming Soon section for paid features
- Share functionality (Twitter/native)
- Back navigation

## Converting to Production

When you're ready to use real APIs:

1. **Get API Keys**
   - Anthropic API key from console.anthropic.com
   - Stripe keys from dashboard.stripe.com

2. **Update Environment Variables**
   ```bash
   # Copy example file
   cp .env.example .env.local
   
   # Add your keys
   ANTHROPIC_API_KEY=sk-ant-your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   # ... etc
   ```

3. **Restore Original API Routes**
   - Replace mock roast logic with real Anthropic calls
   - Enable Stripe checkout routes
   - Add webhook handling

4. **Test Everything**
   - Test with real resumes
   - Verify AI responses
   - Test payment flow with Stripe test cards

## Design Philosophy

The UI is designed to be:
- **Fun** - Playful animations and emojis
- **Modern** - Gradient backgrounds and glassmorphism
- **Professional** - Clean typography and spacing
- **Engaging** - Interactive hover effects
- **Accessible** - High contrast and clear hierarchy

## Performance

- Mock API delay: 1.5 seconds (simulates real API)
- Smooth 60fps animations
- Optimized bundle size
- Fast page transitions
- Responsive images

## Browser Support

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Feedback

The demo mode is designed to give you a complete feel for the app. If you notice any issues or have suggestions, feel free to modify the code!

---

**Ready to test?** Run `npm run dev` and visit http://localhost:3000 🚀
