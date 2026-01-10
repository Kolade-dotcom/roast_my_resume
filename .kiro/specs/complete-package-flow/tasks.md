# Implementation Plan: Complete Package Flow

## Overview

This plan implements the freemium flow for RoastMyResume: free roast → Stripe payment → AI Resume Builder with lifetime access. Tasks are ordered to build incrementally, with core infrastructure first, then features, then polish.

## Tasks

- [x] 1. Set up payment storage infrastructure
  - [x] 1.1 Create storage utility for payment records
    - Create `lib/storage.ts` with functions to read/write payment records
    - Use file-based JSON storage in `data/payments.json`
    - Include functions: `savePayment`, `getPayment`, `updatePayment`
    - _Requirements: 3.5, 4.3_

  - [x] 1.2 Update types for new data models
    - Add `PaymentRecord`, `Template`, `ExportRequest` to `types/index.ts`
    - Add `linkedInSummary` field to `RewriteResult`
    - _Requirements: 5.7_

- [-] 2. Implement payment verification API
  - [x] 2.1 Create verify-access API route
    - Create `app/api/verify-access/route.ts`
    - Accept `session_id` query parameter
    - Check payment store for completed payment
    - Return `{ hasAccess: boolean, sessionId?: string }`
    - _Requirements: 4.1, 4.4_

  - [-] 2.2 Write property test for payment verification
    - **Property 2: Payment verification consistency**
    - **Validates: Requirements 4.1, 4.4**

- [ ] 3. Update Stripe checkout flow
  - [ ] 3.1 Update checkout API to redirect to builder
    - Modify `app/api/checkout/route.ts`
    - Change `success_url` to `/builder?session_id={CHECKOUT_SESSION_ID}`
    - Ensure resume text is passed in metadata
    - _Requirements: 3.2, 3.3_

  - [ ] 3.2 Update webhook to store payment records
    - Modify `app/api/webhook/route.ts`
    - On `checkout.session.completed`: save payment record with status
    - Store resume text and session ID
    - Generate and store AI rewrite
    - _Requirements: 3.4, 3.5_

- [ ] 4. Checkpoint - Verify payment infrastructure
  - Ensure payment storage works correctly
  - Test checkout flow creates records
  - Ask the user if questions arise

- [ ] 5. Create AI Resume Builder page
  - [ ] 5.1 Create builder page with access control
    - Create `app/builder/page.tsx`
    - Check payment verification on load
    - Redirect non-paid users to home with message
    - Show loading state during verification
    - _Requirements: 4.1, 4.2_

  - [ ] 5.2 Write property test for access control
    - **Property 3: Non-paid user access denial**
    - **Validates: Requirements 4.2**

  - [ ] 5.3 Implement ResumeBuilder component
    - Create `components/ResumeBuilder.tsx`
    - Side-by-side view: original vs. rewritten resume
    - Fetch rewrite data from `/api/rewrite`
    - Display lifetime access indicator
    - _Requirements: 5.1, 4.5_

- [ ] 6. Implement builder features
  - [ ] 6.1 Create TemplateSelector component
    - Create `components/TemplateSelector.tsx`
    - Three templates: Modern, Classic, Minimal
    - Visual preview cards for each template
    - Apply template styling to rewritten resume
    - _Requirements: 5.2, 5.3_

  - [ ] 6.2 Create ATSScore component
    - Create `components/ATSScore.tsx`
    - Circular progress indicator (0-100)
    - Color-coded: red (<50), yellow (50-79), green (80+)
    - Display explanation text
    - _Requirements: 5.4_

  - [ ] 6.3 Add industry tips section
    - Display industry-specific tips from rewrite result
    - Styled as actionable cards
    - _Requirements: 5.5_

  - [ ] 6.4 Add LinkedIn summary section
    - Display LinkedIn-optimized version
    - Copy-to-clipboard functionality
    - _Requirements: 5.7_

  - [ ] 6.5 Add before/after comparison
    - Show improvement examples from rewrite result
    - Side-by-side or toggle view
    - _Requirements: 5.8_

- [ ] 7. Checkpoint - Verify builder features
  - Ensure all builder sections render correctly
  - Test with mock rewrite data
  - Ask the user if questions arise

- [ ] 8. Implement export functionality
  - [ ] 8.1 Create export API route
    - Create `app/api/export/route.ts`
    - Accept content, format (pdf/docx/txt), and template
    - Generate file using appropriate library
    - Return file blob with correct MIME type
    - _Requirements: 5.6_

  - [ ] 8.2 Write property test for export formats
    - **Property 5: Export format validity**
    - **Validates: Requirements 5.6**

  - [ ] 8.3 Create ExportButtons component
    - Create `components/ExportButtons.tsx`
    - Buttons for PDF, DOCX, TXT download
    - Loading states during generation
    - _Requirements: 5.6_

- [ ] 9. Update existing pages with payment CTA
  - [ ] 9.1 Create PaymentCTA component
    - Create `components/PaymentCTA.tsx`
    - Reusable upgrade call-to-action
    - Shows price, features, checkout button
    - Connects to `/api/checkout`
    - _Requirements: 3.1_

  - [ ] 9.2 Update home page with payment CTA
    - Add PaymentCTA component to home page
    - Clear value proposition messaging
    - _Requirements: 6.1_

  - [ ] 9.3 Enable upgrade button in RoastDisplay
    - Update `components/RoastDisplay.tsx`
    - Connect disabled button to checkout flow
    - Pass resume text to checkout
    - _Requirements: 6.2_

- [ ] 10. Implement navigation for paid users
  - [ ] 10.1 Add builder link for paid users
    - Check payment status in navigation
    - Show "Resume Builder" link when paid
    - Store session ID in localStorage for persistence
    - _Requirements: 6.4, 4.3_

- [ ] 11. Update rewrite API
  - [ ] 11.1 Update rewrite API to include all fields
    - Modify `app/api/rewrite/route.ts`
    - Ensure response includes linkedInSummary
    - Verify payment before returning data
    - _Requirements: 5.1, 5.7_

  - [ ] 11.2 Write property test for rewrite completeness
    - **Property 4: Rewrite generation completeness**
    - **Validates: Requirements 5.1, 5.4, 5.5, 5.7**

- [ ] 12. Implement error handling
  - [ ] 12.1 Add error boundaries and fallbacks
    - Create error UI for builder page
    - Handle AI generation failures gracefully
    - Show retry options where appropriate
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 12.2 Add session expiry handling
    - Detect expired/invalid sessions
    - Prompt user to re-verify or re-enter resume
    - _Requirements: 7.4_

  - [ ] 12.3 Add error logging
    - Log errors with context for debugging
    - _Requirements: 7.5_

- [ ] 13. Final checkpoint - End-to-end testing
  - Test complete flow: input → roast → payment → builder
  - Verify all features work together
  - Ensure error states are handled
  - Ask the user if questions arise

## Notes

- All tasks including property-based tests are required
- File-based storage is for MVP; upgrade to database for production
- Stripe test mode should be used during development
- Each task references specific requirements for traceability
