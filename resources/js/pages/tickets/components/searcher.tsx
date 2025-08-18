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
        <Card>
            <CardContent className="pt-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por código o solicitante..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
