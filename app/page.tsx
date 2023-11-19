import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Search from "@/components/Search";
import Link from "next/link";

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
    .ilike("word", `${search}%`)
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        SayadGanj
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <Search />
         
          <div className="overflow-x-auto mt-5">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-4 sm:gap-2 md:gap-1">
              {alphabets.map((alphabet, index) => (
                <Link
                  href={`?q=${alphabet}`}
                  key={index}
                  className="cursor-pointer p-5 text-2xl border border-gray-300 rounded-md shadow dark:border-gray-700 sm:p-2 md:p-1"
                  aria-label={`Search words starting with ${alphabet}`}
                >
                  {alphabet}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.map((word, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-2 font-bold dark:text-gray-900">
                  {word.word}
                </div>
                <div className="mb-2 text-gray-700">
                  {word.word_with_symbols}
                </div>
                <div className="text-gray-500">{word.definition}</div>
              </div>
            ))}
          </div>

          </div>

        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
