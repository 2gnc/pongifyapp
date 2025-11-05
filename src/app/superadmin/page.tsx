import { guardSuperAdmin } from '@/features/auth';
import { SuperAdmin } from '@/fsd_pages/superAdmin'

export default async function SuperAdminPage() {
  await guardSuperAdmin();

  return (
    <SuperAdmin />
  );
}
