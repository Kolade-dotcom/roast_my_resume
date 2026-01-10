# Requirements Document

## Introduction

This feature transforms the RoastMyResume app from a simple roast-only experience into a complete resume improvement platform. Users get a free roast, can share it socially, and then upgrade to a one-time payment "Complete Package" that unlocks an AI Resume Builder with professional rewriting, templates, and export capabilities. Paid users get lifetime access to the builder.

## Glossary

- **User**: A person using the RoastMyResume application
- **Resume_Input**: The resume content provided by the user (pasted text or uploaded PDF)
- **Roast**: The AI-generated brutally honest critique of the user's resume
- **Complete_Package**: The premium one-time purchase ($9.99) that unlocks all features
- **AI_Resume_Builder**: The premium page where paid users can build, edit, and export their improved resume
- **Payment_Component**: The Stripe checkout UI shown on home and roast pages
- **Session_Storage**: Browser storage used to persist roast results during the session
- **Paid_User**: A user who has completed the Stripe payment for the Complete Package
- **Access_Token**: A mechanism to verify and persist paid user status

## Requirements

### Requirement 1: Resume Input

**User Story:** As a user, I want to enter my resume by pasting text or uploading a PDF, so that I can get it roasted.

#### Acceptance Criteria

1. WHEN a user visits the home page, THE Upload_Zone SHALL display two input methods: paste text and upload PDF
2. WHEN a user pastes resume text with at least 10 characters and clicks submit, THE System SHALL process the text and navigate to the roast page
3. WHEN a user uploads a valid PDF file (under 5MB), THE System SHALL extract the text and navigate to the roast page
4. IF a user attempts to submit empty or insufficient text (less than 10 characters), THEN THE System SHALL display an error message and prevent submission
5. IF a user uploads an invalid file type or oversized file, THEN THE System SHALL display an appropriate error message

### Requirement 2: Roast Display and Sharing

**User Story:** As a user, I want to see my resume roast and share it on social media, so that I can get feedback and engage with others.

#### Acceptance Criteria

1. WHEN a user arrives at the roast page with valid roast data, THE Roast_Display SHALL render the AI-generated critique with proper formatting
2. WHEN a user clicks the share button, THE System SHALL generate a shareable image of the roast
3. WHEN native sharing is available and supports files, THE System SHALL use the native share API with the generated image
4. WHEN native sharing is unavailable, THE System SHALL fall back to opening Twitter with pre-filled text
5. WHEN a user clicks download, THE System SHALL generate and download a PNG image of the roast
6. IF a user navigates to the roast page without roast data, THEN THE System SHALL redirect to the home page

### Requirement 3: Payment Integration

**User Story:** As a user, I want to pay for the Complete Package via Stripe, so that I can access premium features.

#### Acceptance Criteria

1. THE Payment_Component SHALL be displayed on both the home page and roast page
2. WHEN a user clicks the payment button, THE System SHALL create a Stripe checkout session with the resume text in metadata
3. WHEN Stripe checkout completes successfully, THE System SHALL redirect to the AI Resume Builder page
4. WHEN the Stripe webhook receives a completed checkout event, THE System SHALL mark the user as a Paid_User
5. THE System SHALL store payment verification using a secure method (session ID or email-based lookup)
6. IF payment fails or is cancelled, THEN THE System SHALL return the user to the previous page with an appropriate message

### Requirement 4: AI Resume Builder Access Control

**User Story:** As a paid user, I want lifetime access to the AI Resume Builder, so that I can return and use it anytime after my one-time payment.

#### Acceptance Criteria

1. WHEN a Paid_User navigates to the AI Resume Builder page, THE System SHALL verify their payment status and grant access
2. WHEN a non-paid user attempts to access the AI Resume Builder page directly, THE System SHALL redirect them to the home page with a prompt to purchase
3. THE System SHALL persist paid status so users can access the builder in future sessions
4. WHEN verifying access, THE System SHALL check payment status via session ID or stored credentials
5. THE AI_Resume_Builder page SHALL display a clear indication that the user has lifetime access

### Requirement 5: AI Resume Builder Features

**User Story:** As a paid user, I want to use the AI Resume Builder to improve my resume with professional rewriting, templates, and exports.

#### Acceptance Criteria

1. WHEN a Paid_User accesses the AI Resume Builder, THE System SHALL display their original resume and the AI-rewritten version side by side
2. THE AI_Resume_Builder SHALL offer at least 3 resume template styles for the user to choose from
3. WHEN a user selects a template, THE System SHALL apply the template styling to the rewritten resume
4. THE AI_Resume_Builder SHALL display an ATS (Applicant Tracking System) optimization score with explanation
5. THE AI_Resume_Builder SHALL provide industry-specific tips based on the resume content
6. WHEN a user clicks export, THE System SHALL offer download options for PDF, DOCX, and TXT formats
7. THE AI_Resume_Builder SHALL include a LinkedIn-optimized version of the resume summary
8. THE AI_Resume_Builder SHALL show before/after comparison examples highlighting improvements

### Requirement 6: User Flow Navigation

**User Story:** As a user, I want a clear and intuitive flow through the app, so that I understand what I'm getting at each step.

#### Acceptance Criteria

1. THE home page SHALL clearly communicate the free roast offering and the premium Complete Package
2. WHEN a user completes the roast, THE roast page SHALL prominently display the upgrade option
3. WHEN payment succeeds, THE System SHALL immediately redirect to the AI Resume Builder (not a generic success page)
4. THE navigation SHALL allow paid users to return to the AI Resume Builder from any page
5. THE System SHALL preserve the user's resume text throughout the entire flow (input → roast → payment → builder)

### Requirement 7: Error Handling

**User Story:** As a user, I want clear error messages when something goes wrong, so that I know how to proceed.

#### Acceptance Criteria

1. IF the AI roast generation fails, THEN THE System SHALL display a user-friendly error message with retry option
2. IF the AI rewrite generation fails, THEN THE System SHALL display an error and offer to contact support
3. IF payment verification fails, THEN THE System SHALL display an error and provide support contact information
4. IF the user's session expires, THEN THE System SHALL prompt them to re-enter their resume or re-verify payment
5. WHEN any error occurs, THE System SHALL log the error details for debugging purposes
