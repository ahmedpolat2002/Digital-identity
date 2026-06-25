/*

**Route:** `/auth/mfa`

**Purpose:** Setup or verify multi-factor authentication

**Layout:**
- Centered card layout
- QR code display (for setup)
- Code input field
- Verify button
- Backup codes display (after setup)

**Components:**
- Instruction text
- QR code image
- 6-digit code input (auto-focus next field)
- Verify button
- Backup codes section (collapsible)
- Copy backup codes button

**Form Fields:**
```
[QR Code Display]
Enter 6-digit code:
[ ] [ ] [ ] [ ] [ ] [ ]
[Verify]
```

**Validation:**
- Code: Required, exactly 6 digits

**Actions:**
- On verify: Redirect to dashboard
- On failure: Display error, allow retry

*/
