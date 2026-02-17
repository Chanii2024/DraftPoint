import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="relative min-h-screen">
            <Sidebar />
            <main className="px-6 py-12 pb-32 md:pb-12 md:pl-32 md:pr-12 min-h-screen w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
