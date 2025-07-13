import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ parent, params }) => {
    const { supabase } = await parent();
    const { bookId } = params;
    
    const { data, error: fetchError } = await supabase
        .from("books")
        .select("*")
        .eq("id", parseInt(bookId))
        .single();

    console.log(data, fetchError);

    if (data) {
        return { book: data };
    }

    throw error(404, "Not found");
};