import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCaption,
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

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Kenyan People Directory</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Filters Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Search by Name
                        </label>
                        <Input
                            placeholder="Search name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
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
                                <SelectItem value="all">All Tribes</SelectItem>
                                {tribes.map((tribe) => (
                                    <SelectItem key={tribe} value={tribe}>
                                        {tribe}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
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
                                    <SelectItem key={location} value={location}>
                                        {location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Clear Filters Button */}
                {(tribeFilter !== "all" ||
                    locationFilter !== "all" ||
                    searchQuery !== "") && (
                    <div className="mb-4">
                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {filteredData.length} of {mockData.length} people
                </div>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableCaption>
                            {filteredData.length === 0
                                ? "No people found matching your filters"
                                : "A list of Kenyan people with their tribes and locations"}
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Tribe</TableHead>
                                <TableHead>Location</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="py-8 text-center text-gray-500"
                                    >
                                        No results found. Try adjusting your
                                        filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((person, index) => (
                                    <TableRow key={person.id}>
                                        <TableCell className="font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.tribe}</TableCell>
                                        <TableCell>{person.location}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
