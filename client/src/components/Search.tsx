"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce";

export default function Search() {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState("");
    const [value] = useDebounce(searchInput, 500)

    useEffect(() => {
        router.push(process.env.NEXT_PUBLIC_BASE_URL + `/products?search=${value}`)
    }, [value, router])

    return (
    <div className="form-control w-[300px]">
            <input 
            id="searchInput"
            name="searchInput"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            type="text" 
            placeholder="Search here.." 
            className="input input-bordered"  
            />
        </div>
    )
}