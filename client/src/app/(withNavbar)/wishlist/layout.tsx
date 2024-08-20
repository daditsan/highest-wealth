import React from "react";
import Navbar from "@/components/Navbar";
import ServerProtect from "@/components/ServerProtect";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <ServerProtect>
                {children}
            </ServerProtect>
        </>
    )
}