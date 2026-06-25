import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { identityService } from "@/features/identity/services/identityService";

const createIdentitySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  nationalNumber: z.string().min(1, "National number is required"),
  contactEmail: z.string().email("Invalid email"),
  contactPhone: z.string().min(1, "Contact phone is required"),
});

type CreateIdentityForm = z.infer<typeof createIdentitySchema>;

const CreateIdentityForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIdentityForm>({
    resolver: zodResolver(createIdentitySchema),
  });

  const mutation = useMutation({
    mutationFn: identityService.createIdentity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] });
      // Show success notification
    },
  });

  const onSubmit = (data: CreateIdentityForm) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("fullName")} placeholder="Full Name" />
      {errors.fullName && <span>{errors.fullName.message}</span>}

      <input {...register("nationalNumber")} placeholder="National Number" />
      {errors.nationalNumber && <span>{errors.nationalNumber.message}</span>}

      <input {...register("contactEmail")} placeholder="Contact Email" />
      {errors.contactEmail && <span>{errors.contactEmail.message}</span>}

      <input {...register("contactPhone")} placeholder="Contact Phone" />
      {errors.contactPhone && <span>{errors.contactPhone.message}</span>}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Identity"}
      </button>
    </form>
  );
};
