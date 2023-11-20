import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default async function WordDetailPage({ params, searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from("words")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log(data, error);
  return (
    <div className="flex flex-col w-full dark:text-white dark:bg-gray-700">
      <div className="mt-5 flex flex-col justify-center ">
        <Link
          href={"/"}
          className="rounded-full ms-10 w-10 h-10 hover:bg-gray-300 text-center justify-center items-center"
        >
          <FaArrowRight className="w-5 h-5 text-center content-center" />
        </Link>
        <div className="m-8">
          <div className="text-2xl leading-relaxed">
            <div>
              <h1 className="text-5xl font-bold">{data?.word_with_symbols}</h1>
              <p className="whitespace-pre-line mt-5">{data?.definition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
