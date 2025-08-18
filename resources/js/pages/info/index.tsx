export default function Info({ message }: { message: string }) {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <h1 className="text-yellow-700 ">{message}</h1>
        </div>
    );
}
