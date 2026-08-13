# Implementation Plan - Profile Section Overhaul

The goal is to transform the `Profile` page into a fully functional, premium-looking user hub. It will organized user information, settings, and subscription details into a clean, intuitive interface using the established Aurion gold/dark aesthetic.

## User Review Required
> [!NOTE]
> I will be using `firebase/auth` to fetch the current user. If no user is logged in, I will assume a demo state or redirect to login.

> [!IMPORTANT]
> **Design Refinement**: Based on the provided reference image, I will implement a "Luxury Gold Pill" aesthetic for the subscription cards and key high-value elements.
> - **Shape**: Vertical oval/pill shape with pronounced rounded corners.
> - **Visuals**: Glossy black background, thick metallic gold borders with specular highlights (shine), and gold gradient text.
> - **Layout**: These cards will be used for the Subscription Plans to make them stand out as premium offerings.

## Proposed Changes

### Pages Layer
#### [MODIFY] [Profile.tsx](file:///e:/antigravity%20project/src/pages/Profile.tsx)
-   **Integration**: Add `useEffect` to fetch `auth.currentUser`.
-   **Structure**:
    -   **Header**: Large Avatar (editable visual), Name, Grade/Badge.
    -   **Stats Row**: 3 columns showing count of "Closet", "Try-Ons", "Reports".
    -   **Subscription Carousel**: Horizontal scroll or stacked cards for plans using the **Reference Image "Gold Pill" Style**.
    -   **Settings List**: Grouped items (Account, App Preferences, Help & Support).
    -   **Logout Action**: Destructive button at the bottom.

#### [MODIFY] [Profile.css](file:///e:/antigravity%20project/src/pages/Profile.css)
-   **New "Gold Pill" Component Class**:
    -   `border: 2px solid gold` (with gradient border image).
    -   `box-shadow`: Inner glow and outer drop shadow to create depth.
    -   `background`: Radial gradient to simulate the glossy curved surface.
-   Add styles for `stats-row`, `stat-card`, `settings-group`, `settings-item`.
-   Enhance `glass` effects and gradients for a premium feel.
-   Ensure responsive padding for mobile view (since Layout implies mobile-first).

## Verification Plan

### Automated Tests
-   None planned for this UI task.

### Manual Verification
1.  **Login State**: Log in via `Login` page, navigate to `Profile`, verify name/email matches.
2.  **Responsiveness**: Check layout on mobile vs desktop size.
3.  **Interactions**: Click "Sign Out" to ensure it redirects to Login (logic needs to be added).
4.  **Visuals**: Verify "Aurion Gold" badge and gradients look premium.
