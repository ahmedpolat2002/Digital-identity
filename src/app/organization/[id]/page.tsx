/**
 * Organization Details

**Route:** `/organization/:id`

**Purpose:** View complete organization information

**Tabs:**
1. Overview
2. Issuer Keys
3. Users
4. Issued Credentials
5. Audit Logs

**Overview Tab:**
```
┌─────────────────────────────────────────────────────────────┐
│ Organization Details                                         │
├─────────────────────────────────────────────────────────────┤
│ Name: Ministry of Interior                                 │
│ Type: Root Authority                                       │
│ Registration Number: MOI-SY-ROOT-001                       │
│ Contact Email: identity@moi.gov.sy                         │
│ Contact Phone: +963110000000                               │
│ Address: Damascus, Syria                                   │
│ Status: Active ✓                                            │
│ Is Root Authority: Yes                                      │
├─────────────────────────────────────────────────────────────┤
│ Active Issuer Key: abc123def456                            │
│ Created: 2024-01-01                                         │
└─────────────────────────────────────────────────────────────┘

[Edit] [Suspend] [Revoke] [Rotate Key]
```

**Issuer Keys Tab:**
- List of all issuer keys
- Show: Public key, Fingerprint, Algorithm, Version, Valid from/to, Active status
- Actions: View details, Revoke

**Users Tab:**
- List of organization users
- Show: User, Email, Role, Added date, Active status
- Actions: View, Remove, Change role

**Issued Credentials Tab:**
- List of credentials issued by this organization
- Show: Type, Owner, Issued date, Status

**Audit Logs Tab:**
- Timeline of organization actions

---
 */
