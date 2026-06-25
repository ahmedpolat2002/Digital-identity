/**
 * Audit Center

**Route:** `/audit`

**Purpose:** View and export audit logs

**Layout:**
- Advanced filters
- Data table
- Export options

**Filters:**
- User
- Action
- Resource Type
- Date Range
- IP Address

**Table Columns:**
```
┌─────────────────────────────────────────────────────────────┐
│ Timestamp  │ User    │ Action  │ Resource │ IP       │ Success│
├─────────────────────────────────────────────────────────────┤
│ 2024-01-15│ admin   │ Create  │ Identity │ 192.168.1│ ✓     │
│ 2024-01-15│ admin   │ Update  │ Identity │ 192.168.1│ ✓     │
│ 2024-01-16│ user1   │ Suspend │ Identity │ 10.0.0.1 │ ✓     │
└─────────────────────────────────────────────────────────────┘
```

**Export Options:**
- CSV
- Excel
- PDF

---
 */
