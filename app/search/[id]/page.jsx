import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function WordDetailPage({ params, searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("words")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log(data,error);
  return (
    <div className="flex flex-col w-full dark:text-white text-white">
      <div className="mt-5 flex flex-col justify-center dark:text-gray-100">
        <div className="m-8">
          <div className="text-2xl leading-relaxed">
            <div>
              <h1 className="text-5xl dark:text-white font-bold">
                {data?.word_with_symbols}
              </h1>
              <p className="whitespace-pre-line mt-5">{data?.definition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
