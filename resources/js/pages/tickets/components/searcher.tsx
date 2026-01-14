import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Searcher({
    searchTerm,
    setSearchTerm,
}: {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}) {
    return (
        <Card className="border-none shadow-md">
            <CardContent className="p-6">
                <div className="relative max-w-md">
                    <div className="absolute left-3 top-3 text-gray-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <Input
                        placeholder="🔍 Buscar por código, DNI o nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm font-medium"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
