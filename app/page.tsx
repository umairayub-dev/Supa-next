import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Search from "@/components/Search";
import Link from "next/link";
import AlphabetGrid from "@/components/AlphabetGrid";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("words")
    .select("*")
    .order("word")
    .or(`word.ilike.${search}%, word_with_symbols.ilike.${search}%`)
    .limit(20);

  console.log(error);

  const alphabets: String[] = [
    "آ",
    "ا",
    "ب",
    "پ",
    "ت",
    "ٹ",
    "ج",
    "چ",
    "د",
    "ڈ",
    "ر",
    "ز",
    "ژ",
    "س",
    "ش",
    "ک",
    "گ",
    "ل",
    "م",
    "ن",
    "و",
    "ھ",
    "ء",
    "ی",
    "ے",
  ];

  return (
    // <div className="w-full flex flex-col justify-center items-center">
    //   <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
    //     <main className="flex-1 flex flex-col gap-6">
    //       {/* Conditionally render search form */}

    //       <div className="overflow-x-auto mt-5">
    //         {/* Conditionally render alphabets */}
    //         {search === "" && (
    //           <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-4 sm:gap-2 md:gap-1">
    //             {alphabets.map((alphabet, index) => (
    //               <Link
    //                 href={`?q=${alphabet}`}
    //                 key={index}
    //                 className="cursor-pointer p-5 text-2xl border border-gray-300 rounded-md shadow dark:border-gray-700 sm:p-2 md:p-1"
    //                 aria-label={`Search words starting with ${alphabet}`}
    //               >
    //                 {alphabet}
    //               </Link>
    //             ))}
    //           </div>
    //         )}

    //         {/* Conditionally render word list */}
    //         {search && (
    //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //             {data?.map((word, index) => (
    //               <Link
    //                 href={`/search/${word.id}?word=${word.word_with_symbols}`}
    //               >
    //                 <div
    //                   key={index}
    //                   className="bg-white p-4 max-h-[180px] overflow-hidden rounded-md shadow-md"
    //                 >
    //                   <div className="mb-2 font-bold text-xl text-gray-900 dark:text-gray-900">
    //                     {word.word}
    //                   </div>
    //                   <div className="mb-2 text-gray-700">
    //                     {word.word_with_symbols}
    //                   </div>
    //                   <div className="text-gray-500">{word.definition}</div>
    //                 </div>
    //               </Link>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div className="w-full p-5 flex flex-col justify-center items-center">
      <Search search={search} />
      {search === "" && <AlphabetGrid />}
      {search && (
        data ? <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((word, index) => (
          <Link href={`/search/${word.id}?word=${word.word_with_symbols}`}>
            <div
              key={index}
              className="bg-white p-4 max-h-[180px] overflow-hidden rounded-md shadow-md border-2 border-gray-300"
            >
              <div className="mb-2 font-bold text-xl text-gray-900 dark:text-gray-900">
                {word.word}
              </div>
              <div className="mb-2 text-gray-700">
                {word.word_with_symbols}
              </div>
              <div className="text-gray-500">{word.definition}</div>
            </div>
          </Link>
        ))}
      </div> : <div className="mt-10">Nothing found</div>
      )}
    </div>
  );
}
