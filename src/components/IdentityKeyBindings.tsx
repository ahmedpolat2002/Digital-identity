import { identityService } from "@/features/identity/services/identityService";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const IdentityKeyBindings = ({ identityId }: { identityId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["identity", identityId, "key-bindings"],
    queryFn: () => identityService.getKeyBindings(identityId),
  });

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <h3>Key Bindings</h3>
      <table>
        <thead>
          <tr>
            <th>Fingerprint</th>
            <th>Algorithm</th>
            <th>Valid From</th>
            <th>Valid Until</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((binding) => (
            <tr key={binding.id}>
              <td>{binding.keyFingerprint}</td>
              <td>{binding.keyAlgorithm}</td>
              <td>{new Date(binding.validFrom).toLocaleDateString()}</td>
              <td>
                {binding.validUntil
                  ? new Date(binding.validUntil).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{binding.isActive ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdentityKeyBindings;
