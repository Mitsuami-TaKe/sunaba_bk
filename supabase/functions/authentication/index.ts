import { createClient } from "jsr:@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  // SupabaseのURLと公開APIキーを設定
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // リクエストからAuthorizationヘッダーを取得
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  // JWTトークンを検証
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return new Response(JSON.stringify({ error: error }), { status: 401 });
  }

  // 認証されたユーザーに対するデータ取得
  const { data, error: fetchError } = await supabase.from("tag_master").select(
    "*",
  );

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // JSON形式でデータを返す
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
