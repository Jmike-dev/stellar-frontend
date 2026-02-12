import { useState, useMemo, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, Users, MapPin } from "lucide-react";
import { CreateJobDialog } from "./CreateJobDialog";
import { getWorkers } from "@/service/workers.service";

interface Worker {
    id: number;
    name: string;
    tribe: string;
    location: string;
}

interface WorkersResponse {
    workers: Worker[];
    total_workers: number;
    page: number;
    page_size: number;
    total_pages: number;
}

export function NannyTable() {
    const [workersResponse, setWorkersResponse] =
        useState<WorkersResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const [tribeFilter, setTribeFilter] = useState<string>("all");
    const [locationFilter, setLocationFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // ✅ Fetch workers
    useEffect(() => {
        async function fetchWorkers() {
            try {
                setLoading(true);
                const data = await getWorkers();
                setWorkersResponse(data);
            } catch (error) {
                console.error("Failed to fetch workers", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkers();
    }, []);

    const workers = workersResponse?.workers ?? [];

    // ✅ Unique tribes
    const tribes = useMemo(() => {
        const unique = Array.from(new Set(workers.map((w) => w.tribe)));
        return unique.sort();
    }, [workers]);

    // ✅ Unique locations
    const locations = useMemo(() => {
        const unique = Array.from(new Set(workers.map((w) => w.location)));
        return unique.sort();
    }, [workers]);

    // ✅ Filter workers
    const filteredData = useMemo(() => {
        return workers.filter((person) => {
            const matchesTribe =
                tribeFilter === "all" || person.tribe === tribeFilter;

            const matchesLocation =
                locationFilter === "all" || person.location === locationFilter;

            const matchesSearch = person.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            return matchesTribe && matchesLocation && matchesSearch;
        });
    }, [workers, tribeFilter, locationFilter, searchQuery]);

    const clearFilters = () => {
        setTribeFilter("all");
        setLocationFilter("all");
        setSearchQuery("");
    };

    const hasActiveFilters =
        tribeFilter !== "all" || locationFilter !== "all" || searchQuery !== "";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            <Card className="mx-auto max-w-7xl border-0 shadow-2xl">
                <CardHeader className="space-y-1 text-indigo-600">
                    <CardTitle className="text-3xl font-bold">
                        list of nannies available
                        <div className="flex justify-end">
                            <CreateJobDialog />
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex gap-4">
                            {/* Search */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Search className="h-4 w-4" />
                                    Search by Name
                                </label>

                                <div className="relative">
                                    <Input
                                        placeholder="Search name..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />

                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Tribe */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Users className="h-4 w-4" />
                                    Filter by Tribe
                                </label>

                                <Select
                                    value={tribeFilter}
                                    onValueChange={setTribeFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select tribe" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Tribes
                                        </SelectItem>

                                        {tribes.map((tribe) => (
                                            <SelectItem
                                                key={tribe}
                                                value={tribe}
                                            >
                                                {tribe}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <MapPin className="h-4 w-4" />
                                    Filter by Location
                                </label>

                                <Select
                                    value={locationFilter}
                                    onValueChange={setLocationFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Locations
                                        </SelectItem>

                                        {locations.map((location) => (
                                            <SelectItem
                                                key={location}
                                                value={location}
                                            >
                                                {location}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
                                    {filteredData.length} of{" "}
                                    {workersResponse?.total_workers ?? 0} people
                                </span>

                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Tribe</TableHead>
                                    <TableHead>Location</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-10 text-center"
                                        >
                                            Loading workers...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-10 text-center"
                                        >
                                            No results found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((person, index) => (
                                        <TableRow key={person.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{person.name}</TableCell>
                                            <TableCell>
                                                {person.tribe}
                                            </TableCell>
                                            <TableCell>
                                                {person.location}
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
