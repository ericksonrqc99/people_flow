import { Search } from 'lucide-react';

export default function Searcher({
    searchTerm,
    setSearchTerm,
}: {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}) {
    return (
        <div className="bg-white border border-gray-300">
            <div className="p-3">
                <div className="relative max-w-md">
                    <div className="absolute left-3 top-2.5 text-gray-600">
                        <Search className="h-4 w-4" />
                    </div>
                    <input
                        placeholder="Buscar por código, DNI o nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 py-2 border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-0 text-xs font-medium bg-white"
                    />
                </div>
            </div>
        </div>
    );
}
