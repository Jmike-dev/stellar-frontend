import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, MapPin, Phone, Building } from "lucide-react";

export default function Profile() {
    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Profile</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator className="my-6" />

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-0 shadow-sm">
                    <CardHeader className="bg-gray-50/50 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600 ring-4 ring-white shadow-sm">
                                JD
                            </div>
                            <div>
                                <CardTitle className="text-xl">John Doe</CardTitle>
                                <CardDescription>Employer Account</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="-mt-4 p-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="name"
                                        defaultValue="John Doe"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="email"
                                        defaultValue="john@example.com"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="phone"
                                        defaultValue="+1 (555) 000-0000"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="location"
                                        defaultValue="New York, NY"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>Account Statistics</CardTitle>
                            <CardDescription>
                                Overview of your activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                                            <BriefcaseIcon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Jobs Posted</p>
                                            <p className="text-sm text-gray-500">Total active listings</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold">12</span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-green-100 p-2 text-green-600">
                                            <Building className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Hired Nannies</p>
                                            <p className="text-sm text-gray-500">Successfully matched</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold">3</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
    )
}
