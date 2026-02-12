import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyJobs, type JobCreation } from "@/service/employer.service";
import { Loader2 } from "lucide-react";

export default function MyJobs() {
    const [jobs, setJobs] = useState<JobCreation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await getMyJobs();
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
                setError("Failed to load jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        My Posted Jobs
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-hidden overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">
                                        Title
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Location
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Work status
                                    </TableHead>
                                    <TableHead className="text-right font-semibold">
                                        Salary
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="h-24 text-center text-gray-500"
                                        >
                                            No jobs found. Create your first
                                            job!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    jobs.map((job, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-gray-50/50"
                                        >
                                            <TableCell className="font-medium text-gray-900">
                                                {job.title}
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {job.location}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                    {job.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-gray-900">
                                                ksh{job.salary.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
