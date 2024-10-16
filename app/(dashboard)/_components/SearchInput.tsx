"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
export function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounceValue(value, 500);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    //
    // const searchValue = typeof debounceValue === "string" ? debounceValue : "";
    const url = qs.stringifyUrl(
      {
        url: "/",
        // query: { search: debounceValue },
        query: { search: value },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [router, value]);
  return (
    <div className=' w-full relative'>
      <Search className='absolute top-1/2 left-3 transform text-muted-foreground h-4 w-4 -translate-y-1/2' />
      <Input
        className='w-full max-w-[516px] pl-9'
        placeholder='Search borads'
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
