/**

**Route:** `/organization/:id/key-rotation`

**Purpose:** Rotate organization's issuer key

**Layout:**
- Form with current key display
- New key input
- Confirmation dialog

**Form Fields:**
```
┌─────────────────────────────────────────────────────────────┐
│ Current Issuer Key                                          │
├─────────────────────────────────────────────────────────────┤
│ Public Key: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA... │
│ Fingerprint: abc123def456ghi789                            │
│ Algorithm: RSA2048                                         │
│ Version: 1                                                 │
│ Valid From: 2024-01-01                                     │
│ Valid Until: 2025-01-01                                    │
├─────────────────────────────────────────────────────────────┤
│ New Issuer Key                                             │
├─────────────────────────────────────────────────────────────┤
│ Public Key: [______________________________]                │
│ [Generate Key Pair]                                        │
│ Fingerprint: [Auto-generated]                               │
│ Algorithm: [RSA2048 ▼]                                      │
│ Valid From: [2024-06-01]                                    │
│ Valid Until: [2025-06-01]                                  │
│                                                              │
│ [Rotate Key] [Cancel]                                      │
└─────────────────────────────────────────────────────────────┘
```

**Confirmation Dialog:**
```
┌─────────────────────────────────────────────────────────────┐
│ Confirm Key Rotation                                        │
├─────────────────────────────────────────────────────────────┤
│ This action will:                                          │
│ • Revoke the current issuer key                            │
│ • Activate the new issuer key                              │
│ • Update all issued credentials                            │
│                                                              │
│ This action cannot be undone.                              │
│                                                              │
│ [Confirm] [Cancel]                                          │
└─────────────────────────────────────────────────────────────┘
```

---

 */
