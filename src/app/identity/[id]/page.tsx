/*
Identity Details

**Route:** `/identity/:id`

**Purpose:** View complete identity information and history

**Layout:**
- Sidebar navigation
- Breadcrumb navigation
- Tabbed content area
- Action buttons

**Tabs:**
1. Overview
2. Key Bindings
3. Key History
4. Linked Users
5. Consent Grants
6. Credentials
7. Recovery Requests
8. Audit History

**Overview Tab:**
```
┌─────────────────────────────────────────────────────────────┐
│ Digital Identity Details                                     │
├─────────────────────────────────────────────────────────────┤
│ DID: did:sdip:1234567890abcdef                             │
│ National Number: 123456789                                  │
│ Full Name: John Doe                                         │
│ Contact Email: john.doe@email.com                           │
│ Status: Active ✓                                            │
│ Created: 2024-01-15                                         │
│ Updated: 2024-03-20                                         │
├─────────────────────────────────────────────────────────────┤
│ MoI Attestation Hash: abc123...                             │
│ Blockchain Reference: 0xdef456...                           │
└─────────────────────────────────────────────────────────────┘

[Update] [Suspend] [Revoke]
```

**Key Bindings Tab:**
- List of current key bindings
- Show: Public key, Fingerprint, Algorithm, Valid from/to, Active status
- Actions: View details, Revoke

**Key History Tab:**
- Timeline of key rotations
- Show: Old fingerprint, New fingerprint, Rotation reason, Date

**Linked Users Tab:**
- List of user accounts linked to this identity
- Show: User ID, Email, Role, Linked date, Active status

**Consent Grants Tab:**
- List of consent grants
- Show: Requester, Resource type, Actions, Attributes, Status, Validity

**Credentials Tab:**
- List of credentials issued to this identity
- Show: Type, Issuer, Issued date, Expiration, Status

**Recovery Requests Tab:**
- List of key recovery requests
- Show: Old fingerprint, New fingerprint, Status, Requested date

**Audit History Tab:**
- Timeline of all actions on this identity
- Show: User, Action, Resource, Timestamp, IP Address

*/
