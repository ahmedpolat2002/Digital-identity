import { auditService } from "@/features/audit/services/auditService";
import { GetAuditLogsQuery } from "@/features/audit/types/audit.types";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AuditViewer = () => {
  const [filters, setFilters] = useState<GetAuditLogsQuery>({});

  const { data, isLoading } = useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: () => auditService.getAuditLogs(filters),
  });

  const exportMutation = useMutation({
    mutationFn: (format: "csv" | "excel" | "pdf") =>
      auditService.exportAuditLogs({ format, filters }),
    onSuccess: (blob, format) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-logs.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
  });

  return (
    <div>
      {/* <Filters onChange={setFilters} /> */}
      <Button onClick={() => exportMutation.mutate("csv")}>Export CSV</Button>

      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Resource</th>
            <th>IP Address</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((log) => (
            <tr key={log.id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.userId}</td>
              <td>{log.action}</td>
              <td>{log.resourceType}</td>
              <td>{log.ipAddress}</td>
              <td>{log.success ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
