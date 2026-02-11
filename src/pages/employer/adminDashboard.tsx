import { NannyTable } from "@/components/custom/nannyTable";

function AdminDashboard() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1> */}
            <NannyTable />
        </div>
    );
}

export default AdminDashboard;
