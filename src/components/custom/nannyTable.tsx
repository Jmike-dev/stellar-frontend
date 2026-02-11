import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    // TableCaption,
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
import { Card, CardContent } from "@/components/ui/card";
import { Search, X, Users, MapPin } from "lucide-react";

interface Person {
    id: number;
    name: string;
    tribe: string;
    location: string;
}

const mockData: Person[] = [
    { id: 1, name: "Wanjiru Kamau", tribe: "Kikuyu", location: "Nairobi" },
    { id: 2, name: "Otieno Odhiambo", tribe: "Luo", location: "Kisumu" },
    { id: 3, name: "Kipchoge Rotich", tribe: "Kalenjin", location: "Eldoret" },
    { id: 4, name: "Mwangi Njoroge", tribe: "Kikuyu", location: "Kiambu" },
    { id: 5, name: "Achieng Ouma", tribe: "Luo", location: "Siaya" },
    { id: 6, name: "Juma Hassan", tribe: "Swahili", location: "Mombasa" },
    { id: 7, name: "Mutua Kimathi", tribe: "Kamba", location: "Machakos" },
    { id: 8, name: "Chebet Kiprotich", tribe: "Kalenjin", location: "Kericho" },
    { id: 9, name: "Njeri Wambui", tribe: "Kikuyu", location: "Nyeri" },
    { id: 10, name: "Omar Mohammed", tribe: "Somali", location: "Garissa" },
    { id: 11, name: "Wekesa Barasa", tribe: "Luhya", location: "Kakamega" },
    { id: 12, name: "Nduta Karanja", tribe: "Kikuyu", location: "Nairobi" },
    { id: 13, name: "Anyango Adhiambo", tribe: "Luo", location: "Kisumu" },
    { id: 14, name: "Kiplagat Bett", tribe: "Kalenjin", location: "Nandi" },
    { id: 15, name: "Mumbi Githinji", tribe: "Kikuyu", location: "Murang'a" },
    { id: 16, name: "Mulwa Musyoka", tribe: "Kamba", location: "Kitui" },
    { id: 17, name: "Fatuma Abdi", tribe: "Somali", location: "Wajir" },
    { id: 18, name: "Nafula Wafula", tribe: "Luhya", location: "Bungoma" },
    { id: 19, name: "Onyango Omondi", tribe: "Luo", location: "Homa Bay" },
    { id: 20, name: "Kimani Kariuki", tribe: "Kikuyu", location: "Nairobi" },
];

export function NannyTable() {
    const [tribeFilter, setTribeFilter] = useState<string>("all");
    const [locationFilter, setLocationFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Get unique tribes and locations for filters
    const tribes = useMemo(() => {
        const uniqueTribes = Array.from(
            new Set(mockData.map((person) => person.tribe)),
        );
        return uniqueTribes.sort();
    }, []);

    const locations = useMemo(() => {
        const uniqueLocations = Array.from(
            new Set(mockData.map((person) => person.location)),
        );
        return uniqueLocations.sort();
    }, []);

    // Filter data
    const filteredData = useMemo(() => {
        return mockData.filter((person) => {
            const matchesTribe =
                tribeFilter === "all" || person.tribe === tribeFilter;
            const matchesLocation =
                locationFilter === "all" || person.location === locationFilter;
            const matchesSearch = person.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesTribe && matchesLocation && matchesSearch;
        });
    }, [tribeFilter, locationFilter, searchQuery]);

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
                {/* <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <CardTitle className="text-3xl font-bold">
                        Kenyan People Directory
                    </CardTitle>
                    <p className="text-blue-100">
                        Browse and filter people by tribe and location
                    </p>
                </CardHeader> */}
                <CardContent className="p-6">
                    {/* Filters Section */}
                    <div className="mb-6 space-y-4">
                        <div className="flex gap-4">
                            {/* Search Input */}
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
                                        className="border-gray-300 pr-8 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

                            {/* Tribe Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Users className="h-4 w-4" />
                                    Filter by Tribe
                                </label>
                                <Select
                                    value={tribeFilter}
                                    onValueChange={setTribeFilter}
                                >
                                    <SelectTrigger className="border-gray-300 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
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

                            {/* Location Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <MapPin className="h-4 w-4" />
                                    Filter by Location
                                </label>
                                <Select
                                    value={locationFilter}
                                    onValueChange={setLocationFilter}
                                >
                                    <SelectTrigger className="border-gray-300 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
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

                        {/* Clear Filters and Results Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
                                    {filteredData.length} of {mockData.length}{" "}
                                    people
                                </span>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-100">
                                    <TableHead className="w-[80px] font-bold text-gray-700">
                                        #
                                    </TableHead>
                                    <TableHead className="font-bold text-gray-700">
                                        Name
                                    </TableHead>
                                    <TableHead className="font-bold text-gray-700">
                                        Tribe
                                    </TableHead>
                                    <TableHead className="font-bold text-gray-700">
                                        Location
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-16 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Search className="h-12 w-12 text-gray-300" />
                                                <p className="text-lg font-medium text-gray-500">
                                                    No results found
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Try adjusting your filters
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((person, index) => (
                                        <TableRow
                                            key={person.id}
                                            className="transition-colors hover:bg-blue-50/50"
                                        >
                                            <TableCell className="font-medium text-gray-500">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="font-semibold text-gray-900">
                                                {person.name}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                                                    {person.tribe}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="flex items-center gap-1.5 text-gray-600">
                                                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                                    {person.location}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer Caption */}
                    {filteredData.length > 0 && (
                        <p className="mt-4 text-center text-sm text-gray-500">
                            A comprehensive directory of Kenyan people with
                            their tribes and locations
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
