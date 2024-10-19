import { createClient } from "jsr:@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// SupabaseのURLと公開APIキーを設定

Deno.serve(async () => {
  // データベースからデータを取得
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from("tag_master").select("*");

  if (error) {
    return new Response(
      JSON.stringify(
        {
          error: error.message,
        },
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // JSON形式でデータを返す
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
