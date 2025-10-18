# SauceDemo (saucedemo.com) - Comprehensive Test Plan

## Executive Summary

SauceDemo is a demo e-commerce web app showcasing a simple end-to-end shopping flow: user authentication, product browsing, cart management, checkout, and order confirmation. This plan targets functional coverage across all user-facing modules, with additional checks for validation, error handling, accessibility basics, and cross-browser considerations.

- App modules:
  - Authentication: Login/Logout with multiple user personas
  - Product Catalog: Inventory list, sorting, product details
  - Cart: Add/Remove, quantity handling, persistence across pages
  - Checkout: Your Information, Overview, Finish/Cancel
  - Order Confirmation: Success screen and back-to-catalog navigation
  - Ancillary: Header, burger menu, social links, About/All Items/Reset App State, Footer
  - Stability: Page load, network failures (simulated), session behaviors

Assumptions:
- Start from a blank state in a new session (no prior cookies/storage).
- Public test users exist as documented by Sauce Labs (e.g., standard_user, problem_user, locked_out_user, performance_glitch_user, error_user, visual_user) with password `secret_sauce`.
- No external payments; checkout finishes without payment details.
- Environment is public production at https://www.saucedemo.com/.

Success Criteria:
- All happy-path flows complete and reflect expected UI states.
- Form validations trigger appropriately and block progression when needed.
- Role-based nuances (problem/locked/performance) behave as documented.
- Core accessibility issues (labels, focus order, keyboard nav) have no critical blockers.

Failure Conditions:
- Navigation dead-ends, broken links, or inconsistent state.
- Incorrect item counts, prices, totals, or tax math.
- Unhandled validation or error states.

---

## Test Data
- Users and Password: `secret_sauce`
  - standard_user
  - locked_out_user
  - problem_user
  - performance_glitch_user
  - error_user (if available)
  - visual_user (if available)
- Example items to target: Sauce Labs Backpack, Bike Light, Bolt T-Shirt
- Shipping info examples:
  - First Name: John
  - Last Name: Doe
  - Postal Code: 90210

---

## Scenarios

### 1. Authentication – Standard Login/Logout

Assumptions: Start at Login page, logged out, no cookies.

Steps:
1. Navigate to https://www.saucedemo.com/.
2. Enter Username: `standard_user`.
3. Enter Password: `secret_sauce`.
4. Click Login.
5. Verify inventory page loads with product grid.
6. Open burger menu.
7. Click Logout.

Expected:
- Successful login redirects to inventory.
- Burger menu visible and functional.
- Logout returns to login page and clears session.

### 2. Authentication – Locked Out User

Assumptions: Fresh session at Login page.

Steps:
1. Login with `locked_out_user` / `secret_sauce`.

Expected:
- Error banner appears indicating user is locked out.
- User remains on login page; inputs persist.

### 3. Authentication – Invalid Credentials

Assumptions: Fresh session.

Steps:
1. Enter incorrect username/password (e.g., `foo` / `bar`).
2. Click Login.

Expected:
- Error banner indicates invalid credentials.
- No redirect to inventory.

### 4. Authentication – Empty Fields Validation

Assumptions: Fresh session.

Steps:
1. Attempt Login with both fields empty.
2. Attempt Login with only username filled.
3. Attempt Login with only password filled.

Expected:
- Inline error messages prompt for missing fields appropriately.

### 5. Inventory – Default Load and Sorting

Assumptions: Logged in as `standard_user` on inventory page.

Steps:
1. Verify default sort order (Name A to Z).
2. Change sort to: Name Z to A.
3. Change sort to: Price low to high.
4. Change sort to: Price high to low.

Expected:
- Items reorder correctly according to selection.
- No duplication or missing items.

### 6. Inventory – Product Tiles & Details

Assumptions: Logged in as `standard_user`.

Steps:
1. Inspect a product tile: image, title link, description, price, Add to cart button.
2. Click product title to open Product Details page.
3. Validate details: image, description, price, Add/Remove button.
4. Click Back to Products.

Expected:
- Details page content matches the tile.
- Back navigation returns to same sort/order state.

### 7. Cart – Add and Remove from Inventory

Assumptions: Logged in on inventory.

Steps:
1. Add Backpack, Bike Light to cart.
2. Verify cart badge count increments to 2.
3. Remove Bike Light from inventory tile.
4. Verify cart badge decrements to 1.

Expected:
- Cart reflects accurate count and item state toggles between Add/Remove.

### 8. Cart – From Product Details

Assumptions: Logged in on inventory.

Steps:
1. Open Backpack details page.
2. Add to cart.
3. Navigate to cart via header icon.

Expected:
- Item listed with correct title, price, quantity.

### 9. Cart – Quantity and Remove

Assumptions: At cart page with at least one item.

Steps:
1. Remove an item from cart.
2. Verify item disappears and cart badge updates.

Expected:
- Cart updates immediately with accurate totals.

### 10. Cart – Persistence Across Navigation

Assumptions: Logged in; items added in cart.

Steps:
1. Navigate between inventory, details, and cart pages.
2. Refresh the page.

Expected:
- Cart contents persist for the session.

### 11. Checkout – Your Information Validation

Assumptions: At cart page with one or more items.

Steps:
1. Click Checkout.
2. Leave all fields blank and click Continue.
3. Fill only First Name and click Continue.
4. Fill First and Last Name, leave Postal Code blank; click Continue.
5. Fill all fields validly and Continue.

Expected:
- Validation errors appear per missing field.
- With all fields valid, progresses to Overview.

### 12. Checkout – Overview Calculations and Finish

Assumptions: On Checkout Overview page.

Steps:
1. Verify each item’s title, price, quantity.
2. Verify Item total equals sum of line items.
3. Verify Tax and Total reflect displayed rules.
4. Click Finish.

Expected:
- Reaches order completion screen with confirmation header.

### 13. Checkout – Cancel and Back Navigation

Assumptions: During checkout.

Steps:
1. From Your Information: click Cancel.
2. From Overview: click Cancel.

Expected:
- Cancel returns to Cart.

### 14. Order Confirmation – Back Home

Assumptions: On the order complete screen.

Steps:
1. Click Back Home.

Expected:
- Returns to inventory; cart badge is cleared (order state reset).

### 15. Burger Menu – Navigation

Assumptions: Logged in as `standard_user`.

Steps:
1. Open burger menu.
2. Click All Items; confirm inventory view.
3. Click About; validate external navigation to Sauce Labs site (open in same tab or new tab).
4. Click Reset App State; confirm cart and product button states reset.
5. Click Logout; confirm redirect to login.

Expected:
- Each menu item performs the intended action.

### 16. Footer and Social Links

Assumptions: Any page with footer visible.

Steps:
1. Verify Twitter, Facebook, LinkedIn icons/links open the expected URLs.
2. Validate they open in new tabs (if applicable) and do not block the app.

Expected:
- External links reachable; app remains stable.

### 17. Visual Consistency – Problem and Visual Users

Assumptions: Login with `problem_user` and `visual_user` if available.

Steps:
1. Inspect product images for incorrect/missing assets.
2. Validate Add/Remove button states and layout glitches.
3. Compare against `standard_user` visual baseline.

Expected:
- Known issues manifest only for specific personas; document discrepancies.

### 18. Performance – performance_glitch_user

Assumptions: Login with `performance_glitch_user`.

Steps:
1. Measure time to inventory load and menu interactions.
2. Navigate inventory -> cart -> checkout -> finish.

Expected:
- Slower transitions may occur; page remains functional and completes flow.

### 19. Error Handling – Network/Reload Resilience

Assumptions: Logged in with items in cart.

Steps:
1. Refresh on each page type (inventory, cart, checkout steps).
2. Use Back/Forward browser navigation.

Expected:
- State persists in-session; guarded routes require login and redirect appropriately.

### 20. Deep Link and Routing

Assumptions: Logged out initially.

Steps:
1. Attempt to open inventory or cart URL directly without login.
2. After login, copy URL for product details; open in a new tab.

Expected:
- Without login, redirect to login.
- With login, deep links should open correctly and share the same session or prompt login if new context.

### 21. Accessibility – Core Checks

Assumptions: Use keyboard only.

Steps:
1. Tab through login fields and buttons; verify focus order and visible outline.
2. Open burger menu and navigate via keyboard.
3. On inventory and checkout forms, ensure labels are associated with inputs and buttons announce roles via screen reader (if available).

Expected:
- Keyboard navigable, accessible names present, no keyboard traps.

### 22. Cross-Browser/Viewport Smoke

Assumptions: Basic verification across Chromium/Firefox/WebKit and common viewports.

Steps:
1. Run happy path on desktop viewport.
2. Repeat on tablet and small mobile viewport.

Expected:
- Layout remains usable; no critical blockers.

### 23. Security/Session – Logout and Guarded Routes

Assumptions: Logged in.

Steps:
1. Log out.
2. Try hitting inventory/cart/checkout URLs directly.

Expected:
- Redirect back to login; no sensitive data shown post-logout.

---

## Happy Path End-to-End (Condensed)

Steps:
1. Login as `standard_user`.
2. Add Backpack and Bolt T-Shirt.
3. Go to cart; verify 2 items.
4. Checkout; fill First/Last/Postal; Continue.
5. Verify totals; Finish.
6. Confirm completion; Back Home.

Expected:
- Order completes and cart resets.

---

## Notes and Follow-ups
- If using automated tests, prefer stable selectors by data-test attributes provided on SauceDemo.
- Consider adding lighthouse or axe automated checks for accessibility.
- Record timings for performance_glitch_user to establish baseline thresholds.
- Document any persona-specific anomalies encountered.
