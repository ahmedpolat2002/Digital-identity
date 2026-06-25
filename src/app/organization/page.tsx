/**
 * Organization List

**Route:** `/organization`

**Purpose:** Browse and manage organizations

**Layout:**
- Sidebar navigation
- Search and filters
- Data table
- Action buttons

**Table Columns:**
```
┌─────────────────────────────────────────────────────────────┐
│ Name              │ Type      │ Status  │ Reg #    │ Date │
├─────────────────────────────────────────────────────────────┤
│ Ministry of Interior│ Root Auth │ Active  │ MOI-ROOT │ ...  │
│ Damascus University│ Univ Auth│ Active  │ DU-001   │ ...  │
│ Central Bank       │ Bank Auth│ Active  │ CB-001   │ ...  │
└─────────────────────────────────────────────────────────────┘
```

**Filters:**
- Type: All, Root Authority, Government Authority, University Authority, Healthcare Authority, Bank Authority
- Status: All, Active, Suspended, Revoked, Pending
- Search: Name, Registration Number

**Actions:**
- View details
- Edit
- Suspend
- Revoke
- View issuer keys
- View users

---
 */
