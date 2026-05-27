# Implementation Plan - Navbar Overlap, Active Highlights, and Profile Dropdown Consistency

We have identified the root causes of the remaining navbar issues and the profile dropdown style discrepancy on the Genetic Assessment AI page.

## Findings

### 1. Profile Dropdown Broken Spacing on Genetic Assessment AI
- **Root Cause**: In [GeneticAssessmentAI.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/Pages/GeneticAssessmentAI.css), a scoped universal reset is defined:
  ```css
  .ga-page * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ```
  Since `GeneticAssessmentAI.css` is imported *after* `Home.css` in `GeneticAssessmentAI.js`, this reset overrides the padding and margin styles of `.home-profile-dropdown` and `.home-dropdown-item` defined in `Home.css`. This squishes the dropdown layout and makes the options look broken.
- **Fix**: We will exclude the navbar (`.home-main-navbar *`) and footer (`.ga-main-footer *`) from the universal margin/padding reset. We will also add explicit overrides for `.home-profile-dropdown` and `.home-dropdown-item` inside `GeneticAssessmentAI.css` to guarantee they match the homepage exactly.

### 2. Active Navbar Link Highlight Mismatch
- **Root Cause**: When at the top of the Genetic Assessment AI page, the navbar is in a light state, and the text is colored `#2C3E50` via `.ga-page .home-nav-link`. This overrides the active link color green (`#4ade80` / `#10b981`) because of class specificity.
- **Fix**: Add `.ga-page .home-nav-link.active` with `#10b981` (high contrast green) for unscrolled state and `#4ade80` for scrolled state inside `GeneticAssessmentAI.css`.

### 3. Navbar Overlapping Form Content on Auth Pages
- **Root Cause**: In [Login.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/Auth/Login.css) and [Register.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/Auth/Register.css), the navbars are fixed, but the top-level wrappers (`.login-page` and `.reg-page`) do not have sufficient padding-top. The form containers (`.login-container` and `.reg-container`) only have tiny top margins (`30px` and `22px` respectively), causing them to slide under the fixed navbar.
- **Fix**: Add `padding-top: 100px;` to `.login-page` and `.reg-page` to push the page content below the fixed navbars.

### 4. Spacing on Counselling Page
- **Root Cause**: In [Counselling.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/DNA/Counselling.css), the wrapper `.counselling-page-wrapper` does not have any top padding, causing the hero section to slide under the fixed navbar.
- **Fix**: Add `padding-top: 72px;` to `.counselling-page-wrapper` (matching the DNA page layout).

---

## Proposed Changes

### 1. Genetic Assessment AI Page Styling

#### [MODIFY] [GeneticAssessmentAI.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/Pages/GeneticAssessmentAI.css)
- Update the universal reset to exclude navbar and footer elements.
- Add high-contrast active link classes.
- Add explicit fallback overrides for the profile dropdown components.

```css
/* Update reset */
.ga-page * {
  box-sizing: border-box;
}

.ga-page *:not(.home-main-navbar *):not(.ga-main-footer *) {
  margin: 0;
  padding: 0;
}

/* Active Nav Links styling */
.ga-page .home-nav-link.active {
  color: #10b981 !important;
  font-weight: 700;
  opacity: 1;
}

.ga-page .home-navbar-scrolled .home-nav-link.active {
  color: #4ade80 !important;
}

/* Dropdown styling guarantees */
.ga-page .home-profile-dropdown {
  padding: 0.5rem !important;
  background: rgba(15, 23, 42, 0.97) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6) !important;
}

.ga-page .home-dropdown-item {
  padding: 0.7rem 0.9rem !important;
  margin-bottom: 0.15rem !important;
  color: #cbd5e1 !important;
}

.ga-page .home-dropdown-item:hover {
  color: #f1f5f9 !important;
  background: rgba(255, 255, 255, 0.05) !important;
}

.ga-page .home-signup-special {
  color: #f1f5f9 !important;
  font-weight: 600 !important;
  margin-top: 0.4rem !important;
}
```

### 2. Login Page Styling

#### [MODIFY] [Login.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/Auth/Login.css)
- Add top padding to the page container:
```css
.login-page {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  padding-top: 100px; /* Push content down below fixed navbar */
}
```

### 3. Register Page Styling

#### [MODIFY] [Register.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/Auth/Register.css)
- Add top padding to the page container:
```css
.reg-page {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  padding-top: 100px; /* Push content down below fixed navbar */
}
```

### 4. Counselling Page Styling

#### [MODIFY] [Counselling.css](file:///d:/Gene-Guard/Gene-Guard-main/src/Components/DNA/Counselling.css)
- Add top padding to the page container:
```css
.counselling-page-wrapper {
  width: 100%;
  overflow-x: hidden;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2C3E50;
  background-color: #F8FAFB;
  padding-top: 72px; /* Push content down below fixed navbar */
}
```

---

## Verification Plan

### Automated Checks
- Confirm successful Webpack compile with no CSS parsing errors.

### Manual Verification
- Check `/login` and `/signup` routes. Verify that the "Login" and "Sign Up" headers are completely visible below the white navbar, and do not overlap.
- Check `/genetic-assessment` and open the profile dropdown. Verify it looks exactly like the Homepage dropdown (dark background, proper padding/margins, correct text contrast).
- Verify the active link styling (green color) on the Genetic Assessment AI page matches the design system.
