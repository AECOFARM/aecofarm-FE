'use client'
import SearchResults from "../components/SearchResult"; 
import AppLayout from "@/components/layout/MobileLayout";
import SearchBar from "../components/SearchBar";
import NoFixedTopBar from "@/components/NoFixedTopBar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchPage: React.FC = () => {
  const pathname = usePathname();

  // Decode the pathname and extract the query part
  const decodedPathname = decodeURIComponent(pathname);
  const query = decodedPathname.split('/').pop();

  // Determine the language from the router (example: /ko/example/route or /en/example/route)
  const router = useRouter();
  const { locale } = router;
  const text = locale === 'ko' ? "검색 결과" : "Search Results";

  return (
    <AppLayout>
      <NoFixedTopBar text={text} />
      <SearchBar initialData={query || ""} />
      <SearchResults />
    </AppLayout>
  );
};

export default SearchPage;
