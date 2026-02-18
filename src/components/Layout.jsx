import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="relative min-h-screen">
            <Sidebar />
            <main className="md:pl-32 min-h-screen w-full overflow-x-hidden pt-4 md:pt-0">
                {children}
            </main>
        </div>
    );
}
