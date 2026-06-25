/*
Key Recovery Management

**Route:** `/identity/key-recovery`

**Purpose:** Review and manage key recovery requests

**Layout:**
- Sidebar navigation
- Filter controls
- Data table
- Action buttons

**Table Columns:**
```
┌─────────────────────────────────────────────────────────────┐
│ ID │ Identity │ Old Fingerprint │ New Fingerprint │ Status │
├─────────────────────────────────────────────────────────────┤
│ 1  │ did:...   │ abc123...       │ def456...       │ Pending│
│ 2  │ did:...   │ ghi789...       │ jkl012...       │ Approved│
└─────────────────────────────────────────────────────────────┘
```

**Actions per row:**
- View details
- Approve
- Reject

**Approval Dialog:**
```
┌─────────────────────────────────────────────────────────────┐
│ Approve Key Recovery Request                                │
├─────────────────────────────────────────────────────────────┤
│ Identity: did:sdip:1234567890abcdef                         │
│ Old Fingerprint: abc123def456                              │
│ New Fingerprint: ghi789jkl012                              │
│ Recovery Method: In-person verification                      │
│ MoI Reference: MOI-REC-2024-001                           │
│                                                              │
│ [Approve] [Cancel]                                          │
└─────────────────────────────────────────────────────────────┘
```

**Rejection Dialog:**
- Same as approval but with rejection reason field

---
 */
