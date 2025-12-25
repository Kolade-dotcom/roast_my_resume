# Migration to Google AI (Gemini)

## Changes Made

### 1. API Provider Switch
- **From:** Anthropic Claude Sonnet
- **To:** Google AI Gemini
- **Reason:** User has Google AI API key available

### 2. Dependencies Updated
- ✅ Installed: `@google/generative-ai`
- ✅ Installed: `sonner` (for toast notifications)
- ✅ Removed: `@anthropic-ai/sdk`

### 3. Environment Variables
- **Old:** `ANTHROPIC_API_KEY`
- **New:** `GOOGLE_AI_API_KEY`
- **Your Key:** `AIzaSyBDjlAnA_rXYSBGDVga5CA5wDj6zGm7Ogg`

### 4. Models Used
- **Roast API:** `gemini-1.5-flash-latest` (faster, cheaper for quick responses)
- **Rewrite API:** `gemini-1.5-pro-latest` (more capable for detailed rewrites)

### 5. Error Handling Improvements
- Replaced all `alert()` calls with elegant toast notifications using Sonner
- Added `<Toaster />` component to app layout
- Toast notifications appear at top-center with rich colors
- Better user experience with non-blocking error messages

### 6. Files Modified
- `app/api/roast/route.ts` - Switched to Gemini, now processes real PDFs
- `app/api/rewrite/route.ts` - Switched to Gemini
- `app/layout.tsx` - Added Toaster component
- `app/page.tsx` - Replaced alert with toast
- `app/roast/page.tsx` - Added toast for share feedback
- `app/success/page.tsx` - Replaced error display with toast
- `components/UploadZone.tsx` - Replaced alert with toast
- `.env.local` - Updated API key
- `.env.example` - Updated documentation
- `SETUP.md` - Updated setup instructions
- `package.json` - Updated dependencies

## Testing
All TypeScript diagnostics passed with no errors.

## Next Steps
1. Test the roast feature with real resume text
2. Test the rewrite feature (requires Stripe setup)
3. Monitor API usage in Google AI Studio
4. Adjust model parameters if needed (temperature, max tokens, etc.)
