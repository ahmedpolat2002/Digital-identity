import { useState } from "react";
import { useOrganizations } from "../features/organization/useOrganizations";

const OrganizationList = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<string | undefined>();

  const { data, isLoading } = useOrganizations({
    page,
    pageSize: 20,
    type,
  });

  return (
    <div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="RootAuthority">Root Authority</option>
        <option value="GovernmentAuthority">Government Authority</option>
        <option value="UniversityAuthority">University Authority</option>
        <option value="HealthcareAuthority">Healthcare Authority</option>
        <option value="BankAuthority">Bank Authority</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Registration Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((org) => (
            <tr key={org.id}>
              <td>{org.name}</td>
              <td>{org.type}</td>
              <td>{org.status}</td>
              <td>{org.registrationNumber}</td>
              <td>{/* <Link to={`/organization/${org.id}`}>View</Link> */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
