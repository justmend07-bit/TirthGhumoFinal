"use client";

import { useState } from "react";
import Navbar from "@/component/navbar";
import Hero from "@/component/package/Hero";
import PackageSection from "@/component/package/packageSection";
import packages from "@/data/package";

export default function PackagesPage() {
  const [filteredPackages, setFilteredPackages] = useState(packages);

  // receives results from Hero
  const handleSearchResults = (results) => {
    setFilteredPackages(results);
  };

  return (
    <div className="p-5 ">
      <Navbar />
      <Hero onSearch={handleSearchResults} />
      <PackageSection data={filteredPackages} />
    </div>
  );
}
