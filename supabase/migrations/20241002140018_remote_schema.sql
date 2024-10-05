CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Can`t access no authenticated user 43uol_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'content_image'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Can`t access no authenticated user 43uol_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'content_image'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Can`t access no authenticated user 43uol_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'content_image'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));



