"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";

export default function Search({
  disabled,
  search,
}: {
  disabled?: boolean;
  search?: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(search);
  const initialRender = useRef(true);
  const [isPending, startTransition] = useTransition();
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (text) {
      params.set("q", text);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, [query]);

  return (
    <div className="w-full lg:w-1/2 items-center justify-center content-center relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="flex justify-center text-gray-900 rounded-full shadow-md border p-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <input
          type="text"
          name="search"
          id="search"
          value={text}
          disabled={disabled}
          className="text-xl leading-[3rem] ps-5 sm:ps-2 text-gray-900 flex-grow focus:outline-none w-full rounded-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          placeholder="لبزءِدرگیجگ ءَ ادا نبشتہ بہ کن اِت"
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {isPending && (
        <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center">
          <svg
            className="animate-spin ml-3 mr-3 h-6 w-6 text-gray-600 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
