# The Internet (Herokuapp) — Comprehensive Test Plan

## Executive Summary

The Internet is a public demo web application that aggregates many small, focused UI and API interaction examples used for practicing automated and manual testing. This plan provides end‑to‑end, scenario‑driven coverage for all modules linked from the homepage at https://the-internet.herokuapp.com/.

- Scope: Functional behavior, UX flows, negative/edge cases, and observable non‑functional behaviors (latency, stability) where relevant.
- Browsers: Desktop Chrome/Chromium (primary). Optional: Firefox and WebKit for cross‑browser smoke.
- Platforms: Desktop, responsive viewports optional where applicable.
- Data/Security: No PII. Modules with auth or downloads are safe demo endpoints.

## Test Environment and Assumptions

- Fresh browser session per scenario (no cookies/storage persisted unless stated).
- Network available; ad/analytics 3rd‑party errors are out of scope unless they break core flow.
- Default viewport ≥ 1280×800.
- Downloads are permitted to a writable folder; test runner can assert file presence and size.
- Location permission prompts can be controlled (Allow/Deny) by the tester.
- For HTTP Basic/Digest auth modules, valid creds are user=admin, pass=admin unless otherwise noted by the page text.
- Keyboard has standard layout; modifier keys available.
- All scenarios are independent and can run in any order.

## Global Success Criteria and Failure Conditions

- Success: Page loads, elements render as expected, user actions result in correct state changes/messages/URLs, and no blocking errors appear in the console (unless the module intentionally demonstrates an error).
- Failure: Unexpected 4xx/5xx for module pages, broken primary controls, incorrect state or messages, missing downloads, unhandled dialogs, regressions in advertised behavior.

---

## Modules and Test Scenarios

Each module section contains multiple scenarios covering happy paths, edge cases, and validation/error handling where applicable. For brevity, repeated boilerplate (navigate back to homepage) is omitted: assume each scenario starts at the module’s URL unless otherwise specified.


### A/B Testing (/abtest)

Purpose: Validates randomized content variation rendering.

1) Validate page variant rendering
- Steps:
  1. Navigate to /abtest
  2. Observe the header text
- Expected:
  - Header is either "A/B Test Control" or "A/B Test Variation 1"
  - Body content corresponds to the chosen variant
- Assumptions: Variants are delivered randomly. No user targeting.
- Success: Header matches one of allowed values; no console errors.
- Failure: Header outside allowed set, or page fails to load.

2) Refresh does not guarantee same variant
- Steps:
  1. Hard refresh the page 3–5 times
- Expected:
  - Variation may or may not change across reloads; both are acceptable
- Success: No runtime errors; allowed variants only.


### Add/Remove Elements (/add_remove_elements/)

Purpose: Test dynamic creation and deletion of elements.

1) Add a single element
- Steps: Click "Add Element"
- Expected: A "Delete" button appears

2) Add multiple elements
- Steps: Click "Add Element" 5 times
- Expected: 5 Delete buttons are rendered in order

3) Remove elements
- Steps: Click Delete buttons until none remain
- Expected: Elements are removed one by one; container becomes empty

Edge cases:
- Rapid clicking Add/Remove doesn’t throw errors or leave orphaned UI.


### Basic Auth (/basic_auth)

Purpose: HTTP Basic Authentication.

1) Login with valid credentials via URL
- Steps: Visit https://admin:admin@the-internet.herokuapp.com/basic_auth
- Expected: Page shows success message (e.g., "Congratulations! You must have the proper credentials.")

2) Invalid credentials
- Steps: Visit https://wrong:creds@the-internet.herokuapp.com/basic_auth
- Expected: 401 Unauthorized or browser auth prompt appears and denies access

3) Cancel at auth prompt (if shown)
- Steps: Navigate to /basic_auth; dismiss prompt
- Expected: Access denied; no success message


### Broken Images (/broken_images)

Purpose: Detect broken vs. valid images.

1) Identify broken images
- Steps: Evaluate each <img> naturalWidth
- Expected: At least one image has naturalWidth = 0 (broken)

2) Validate at least one working image
- Expected: At least one image has naturalWidth > 0


### Challenging DOM (/challenging_dom)

Purpose: Dynamic button IDs, canvas, and table content interactions.

1) Button actions update result
- Steps:
  1. Note the dynamic text/ID of Blue/Red/Green buttons
  2. Click each button once
- Expected: A result/message area updates; button IDs/text may change after click

2) Table read
- Steps: Read table headers and rows
- Expected: All rows render; data present under each column

Edge:
- Repeated clicks don’t duplicate result; no JS errors.


### Checkboxes (/checkboxes)

1) Toggle checkboxes
- Steps: Toggle each checkbox on and off
- Expected: Input checked state reflects user actions

2) Keyboard interaction
- Steps: Focus checkbox; press Space
- Expected: Toggles checked state


### Context Menu (/context_menu)

Purpose: Right‑click context menu triggers JS alert.

1) Open context menu
- Steps: Right‑click inside the hotspot box
- Expected: JS alert appears with expected text; accepting closes it

2) Dismiss behavior
- Steps: Right‑click then dismiss alert
- Expected: No residual overlay; box usable


### Digest Authentication (/digest_auth)

Similar to Basic Auth but using HTTP Digest.

1) Valid credentials
- Steps: Visit https://admin:admin@the-internet.herokuapp.com/digest_auth
- Expected: Success page/message is shown

2) Invalid credentials
- Steps: Use incorrect creds
- Expected: Access denied / prompt repeats


### Disappearing Elements (/disappearing_elements)

Purpose: Links may appear/disappear on refresh.

1) Validate menu items across reloads
- Steps: Reload page up to 10 times
- Expected: Set of menu items may change (e.g., Gallery may appear intermittently)

2) Link navigation
- Steps: When an item appears, click it
- Expected: Navigates to its target without error


### Drag and Drop (/drag_and_drop)

1) Swap columns via drag‑and‑drop
- Steps: Drag A onto B (and vice versa)
- Expected: Headers swap positions (A↔B)

Edge:
- Drag precision not required; swapping effect occurs.


### Dropdown (/dropdown)

1) Select options
- Steps: Select Option 1, then Option 2
- Expected: Selected option reflects in control state

2) No selection default
- Expected: Default option is placeholder (if present)


### Dynamic Content (/dynamic_content)

1) Content changes on refresh
- Steps: Capture content (texts/images), refresh, compare
- Expected: Some items change between loads

2) Static mode (if applicable query param)
- Steps: Use ?with_content=static (if available)
- Expected: Content remains static across refreshes


### Dynamic Controls (/dynamic_controls)

1) Remove and add checkbox
- Steps: Click Remove; wait for "It’s gone!" then click Add; wait for "It’s back!"
- Expected: Checkbox removed/restored; messages appear accordingly

2) Enable/disable input
- Steps: Click Enable; wait for "It’s enabled!"; type; click Disable; wait for "It’s disabled!"
- Expected: Input editable when enabled; read‑only when disabled


### Dynamic Loading (/dynamic_loading)

1) Example 1 (hidden element)
- Steps: Open /dynamic_loading/1; click Start; wait
- Expected: Loader finishes; Hello World! is displayed

2) Example 2 (element rendered)
- Steps: Open /dynamic_loading/2; click Start; wait
- Expected: Hello World! appears after load completes


### Entry Ad (/entry_ad)

1) Modal appears on first load
- Steps: Navigate to page
- Expected: Entry ad modal is visible; overlay present

2) Close modal
- Steps: Click Close
- Expected: Modal dismissed; no overlay

3) Reopen modal
- Steps: Click "click here" to re‑enable; refresh
- Expected: Modal shows again on next load


### Exit Intent (/exit_intent)

1) Trigger exit intent
- Steps: Move mouse to top edge outside viewport
- Expected: Modal appears

2) Dismiss modal
- Steps: Close modal
- Expected: Modal disappears; page interactive


### File Download (/download)

1) Download a file
- Steps: Click any file link
- Expected: File saved to downloads; size > 0

2) Multiple downloads
- Steps: Download two distinct files
- Expected: Both exist with unique names

Edge:
- Verify MIME type/extension is as linked.


### File Upload (/upload)

1) Upload a small file
- Steps: Choose file (e.g., small txt); click Upload
- Expected: Upload success page displays file name

2) Upload unsupported type (if any)
- Steps: Try unusual extension
- Expected: Either accept or show meaningful error (site typically accepts any)

3) No file then upload
- Steps: Click Upload without choosing a file
- Expected: Validation or no action


### Floating Menu (/floating_menu)

1) Menu sticks on scroll
- Steps: Scroll down significantly
- Expected: Floating menu remains visible/fixed

2) Menu links
- Steps: Click each menu item
- Expected: Anchors navigate within page


### Forgot Password (/forgot_password)

1) Submit with valid email
- Steps: Enter test@example.com; click Retrieve password
- Expected: Success message displayed (note: backend may simulate only)

2) Empty email submission
- Steps: Leave blank; submit
- Expected: Validation or server message indicating issue


### Form Authentication (/login)

1) Successful login
- Steps: Enter username "tomsmith", password "SuperSecretPassword!"; click Login
- Expected: Redirect to Secure Area; flash message "You logged into a secure area!"; Logout button visible

2) Logout
- Steps: Click Logout
- Expected: Return to Login; flash message "You logged out of the secure area!"

3) Invalid username
- Steps: Use bad username; valid password
- Expected: Flash "Your username is invalid!"

4) Invalid password
- Steps: Valid username; bad password
- Expected: Flash "Your password is invalid!"


### Frames (/frames)

1) iFrame editing
- Steps: Open /iframe; focus the editor; type text; apply bold/italic
- Expected: Editor reflects formatting; toolbar state updates

2) Nested frames
- Steps: Open /nested_frames; traverse top/left/right/bottom and middle frame; read labels
- Expected: Each frame contains expected text (e.g., LEFT, RIGHT, MIDDLE, BOTTOM)


### Geolocation (/geolocation)

1) Allow location
- Steps: Click button to get location; grant permission
- Expected: Latitude/Longitude appear; link to Google visible

2) Deny location
- Steps: Deny permission
- Expected: Error or no coordinates shown; page handles gracefully


### Horizontal Slider (/horizontal_slider)

1) Set discrete values
- Steps: Drag/arrow keys to set value 3.5 (increments of 0.5)
- Expected: Display shows 3.5

2) Boundary values
- Steps: Set min then max
- Expected: Values reflect boundaries (0 to 5)


### Hovers (/hovers)

1) Reveal captions on hover
- Steps: Hover each figure
- Expected: Caption box with username/link appears per figure

2) Navigate profile link
- Steps: Click revealed link
- Expected: Navigates to user profile page (404 may be expected demo); no JS errors


### Infinite Scroll (/infinite_scroll)

1) Load additional content
- Steps: Scroll to bottom repeatedly
- Expected: New content paragraphs append without overlap; no jank

Edge: Ensure memory/DOM growth remains responsive for several loads.


### Inputs (/inputs)

1) Type numeric value
- Steps: Enter 123; blur
- Expected: Field retains numeric text

2) Arrow keys
- Steps: Focus input; press ArrowUp 3×
- Expected: Value increments appropriately (if numeric)

3) Non‑numeric characters
- Steps: Type letters
- Expected: Either ignored or accepted as plain text (document actual behavior)


### JQuery UI Menus (/jqueryui/menu)

1) Open nested menu
- Steps: Hover Enabled → Downloads → Excel/PDF
- Expected: Submenus appear; clicking navigates to file (may trigger download or placeholder)

2) Disabled item
- Steps: Attempt to click Disabled
- Expected: No action; disabled state preserved


### JavaScript Alerts (/javascript_alerts)

1) JS Alert
- Steps: Click "Click for JS Alert"; accept
- Expected: Result text confirms: "You successfully clicked an alert"

2) JS Confirm accept and dismiss
- Steps: Click Confirm; accept → result shows Ok; click again; dismiss → result shows Cancel

3) JS Prompt input
- Steps: Click Prompt; enter "Hello"; accept
- Expected: Result shows "You entered: Hello"; Dismiss shows "You entered: null"


### JavaScript onload event error (/javascript_error)

1) Console error on load
- Steps: Open page; capture console logs
- Expected: One JS error is logged (known demo); UI remains usable


### Key Presses (/key_presses)

1) Reported key
- Steps: Focus page; press A, Shift, ArrowLeft, etc.
- Expected: Result text shows last key pressed (e.g., "You entered: A")


### Large & Deep DOM (/large)

1) Scroll performance and element presence
- Steps: Scroll through page; locate a deep node by id
- Expected: No script errors; element found; acceptable scroll performance


### Multiple Windows (/windows)

1) Open new window
- Steps: Click "Click Here"; switch to new window
- Expected: New window/tab shows "New Window" header; original window remains

2) Close new window
- Steps: Close child; return to parent
- Expected: Parent still functional


### Nested Frames (/nested_frames)

1) Verify frame texts
- Steps: Traverse frames and read content
- Expected: LEFT/RIGHT/MIDDLE/BOTTOM labels present


### Notification Messages (/notification_message)

1) Flash message variants
- Steps: Click "Click here" repeatedly (3–5 times)
- Expected: Flash message cycles among allowed strings (e.g., Action successful, Action unsuccesful, etc.)

2) Dismiss message
- Steps: Click × on notification
- Expected: Notification disappears


### Redirect Link (/redirector)

1) Follow redirect
- Steps: Click the redirect link
- Expected: Lands on status codes page (/status_codes)


### Secure File Download (/download_secure)

1) Authenticated download
- Steps: Visit with creds in URL; click a file
- Expected: Download starts; file exists and size > 0

2) Without creds
- Steps: Visit without auth
- Expected: Prompt/denied access


### Shadow DOM (/shadowdom)

1) Read shadow content
- Steps: Query shadow roots and read inner text
- Expected: Text nodes within shadow components are accessible via shadow‑root traversal


### Shifting Content (/shifting_content)

1) Menu shifts
- Steps: Reload page multiple times; observe menu alignment/links
- Expected: Positions/visibility may change between loads

2) Image shift (subpage)
- Steps: Open image example; refresh
- Expected: Image position shifts within expected bounds


### Slow Resources (/slow)

1) Validate slow loading
- Steps: Load page; measure time to complete
- Expected: Intentional slowness; UI eventually renders without errors


### Sortable Data Tables (/tables)

1) Sort by Last Name ascending/descending
- Steps: Click header; verify order toggles
- Expected: Rows reorder alphabetically

2) Sort by Due and Web Site
- Steps: Click headers; verify numeric/url sorts as expected

3) Cell content validation
- Steps: Check emails/dues follow valid formats


### Status Codes (/status_codes)

1) Navigate to each code (200, 301, 404, 500)
- Steps: Click each link
- Expected: Result page describes the chosen status code


### Typos (/typos)

1) Occasional typo
- Steps: Refresh page 5–10 times; read paragraph
- Expected: Sometimes text contains a typo; sometimes corrected; document observed state


### WYSIWYG Editor (/tinymce)

1) Type and format
- Steps: Focus editor; type text; apply Bold and Italic; change alignment
- Expected: Content HTML reflects formatting; toolbar toggles active states

2) Clear formatting
- Steps: Select text; click Clear formatting
- Expected: Text returns to plain

3) Keyboard shortcuts
- Steps: Ctrl+B / Ctrl+I
- Expected: Formatting applied/removed accordingly


## Cross‑Cutting Checks (Optional for each module)

- Accessibility quick checks: Landmarks present, headings hierarchy sensible, interactive elements have accessible names, focus is visible, and keyboard navigation works.
- Performance sanity: No runaway network errors; page completes render within a reasonable time for a demo site.
- Resilience: Rapid interactions don’t break the UI (debounces present or not needed).

## Reporting

- Record observed deviations, console errors, and screenshots of failures.
- For automation, capture HAR/network logs for modules with XHR/fetch (e.g., Dynamic Loading, Forgot Password).

## Appendix — Data and Utilities

- Test file for uploads: small text file (≤10 KB), e.g., upload.txt
- Download verification: assert file path exists and file size > 0
- Geolocation: mock coordinates when automating to ensure deterministic results
