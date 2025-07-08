import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url, locals: { supabase }}) => {
    
    // Get the code from GET request and perform supabase auth
    const code = url.searchParams.get("code");
    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Check session. If set then go ahead, else return error
    const sessionData = await supabase.auth.getSession();
    if (sessionData.data.session) {
        throw redirect(303, "/private/dashboard");
    }

    return new Response("Session data not found", {status: 400});
}