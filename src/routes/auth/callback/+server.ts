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
        const userId = sessionData.data.session.user.id;
        const userName = sessionData.data.session.user.user_metadata.name;

        // Check if user already exists in user_names table
        const {data: existingUser, error: selectError} = await supabase
            .from('user_names')
            .select('name')
            .eq('user_id', userId)
            .single();

        // Handle select error
        // PGRST116 -> More than 1 or no items where returned when requesting a singular response.
        if (selectError && selectError.code !== 'PGRST116') {
            return new Response("Failed to check for existing user", {status: 500});
        }

        // If user does not exist in user_names table, then insert
        if (!existingUser) {
            const {error: insertError} = await supabase
                .from('user_names')
                .insert({
                    user_id: userId,
                    name: userName
                });
            
            // Handle insert error
            if (insertError) {
                return new Response("Failed to insert user_name", {status: 500});
            }
        }
 

        throw redirect(303, "/private/dashboard");
    }

    return new Response("Session data not found", {status: 400});
}