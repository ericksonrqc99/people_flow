import { ReactElement } from 'react';

type TGuestLayout = {
    children: ReactElement;
    className?: string;
};

export default function GuestLayout({
    children,
    className,
    ...props
}: TGuestLayout) {
    return (
        <main
            className={`bg-stone-100 h-screen w-screen ${className}`}
            {...props}
        >
            {children}
        </main>
    );
}
