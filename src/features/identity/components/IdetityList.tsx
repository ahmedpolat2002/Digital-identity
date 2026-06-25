import { useIdentities } from "@/features/identity/hooks/useIdentities";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

const IdentityList = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>();

  const { data, isLoading, error } = useIdentities({
    page,
    pageSize: 20,
    status,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading identities</div>;

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Suspended">Suspended</option>
        <option value="Revoked">Revoked</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>DID</th>
            <th>National Number</th>
            <th>Full Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((identity) => (
            <tr key={identity.id}>
              <td>{identity.did}</td>
              <td>{identity.nationalNumber}</td>
              <td>{identity.fullName}</td>
              <td>{identity.status}</td>
              <td>{/* <Link to={`/identity/${identity.id}`}>View</Link> */}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Pagination
        page={page}
        totalPages={data?.totalPages || 0}
        onPageChange={setPage}
      /> */}
    </div>
  );
};
