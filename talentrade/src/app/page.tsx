'use client'
import styles from "./page.module.css";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const queryString = new URLSearchParams({ q: search }).toString(); // Construct query string
    const url = `/results?${queryString}`; // Construct URL string
    router.push(url); // Push the URL
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.mainBigTxt}>LOOKING <br /> FOR HELP?</h1>
        <h3 className={styles.mainSmallTxt}>Just look up the field of your choice!</h3>
        <div className={styles.mainSearch}>
          <input type="text" placeholder="Search..." className={styles.mainInput} value={search} onChange={(e) => { setSearch(e.target.value) }} />
          <IoSearch className={styles.mainIcon} onClick={handleSearch} />
        </div>
      </div>
    </main>
  );
}
