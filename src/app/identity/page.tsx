// **Route:** `/identity`

// **Purpose:** Browse and search digital identities

// **Layout:**
// - Sidebar navigation
// - Top header with search and filters
// - Data table with pagination
// - Action buttons

// **Components:**
// - Search bar
// - Filter dropdown (Status, Date Range)
// - Sort options
// - Data table
// - Pagination controls
// - Export button
// - Bulk actions menu

// **Table Columns:**
// ```
// ┌─────────────────────────────────────────────────────────────┐
// │ DID           │ National # │ Full Name      │ Status  │ Date │
// ├─────────────────────────────────────────────────────────────┤
// │ did:sdip:... │ 123456789  │ John Doe       │ Active  │ ...  │
// │ did:sdip:... │ 987654321  │ Jane Smith     │ Active  │ ...  │
// │ did:sdip:... │ 456123789  │ Bob Johnson    │ Suspended│ ...  │
// └─────────────────────────────────────────────────────────────┘
// ```

// **Filters:**
// - Status: All, Active, Suspended, Revoked, Pending
// - Date Range: Created from/to
// - Search: DID, National Number, Full Name

// **Actions:**
// - View details
// - Update
// - Suspend
// - Revoke
// - View key bindings
// - View consent grants

// **Bulk Actions:**
// - Suspend selected
// - Revoke selected
// - Export selected
