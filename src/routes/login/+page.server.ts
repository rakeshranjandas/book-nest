import { PUBLIC_FRONTEND_URL } from "$env/static/public";
import { fail, redirect, type Actions } from "@sveltejs/kit";

interface ReturnObject {
    success: boolean;
    email: string;
    password: string;
    errors: string[];
}

export const actions = {
    signInWithPassword: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const returnObject: ReturnObject = {
            success: true,
            email: email,
            password: password,
            errors: [],
        };


        if (!email.length) {
            returnObject.errors.push("Email is required.");
        }

        if (!password.length) {
            returnObject.errors.push("Password is required.");
        }

        if (returnObject.errors.length > 0) {
            returnObject.success = false;
            return returnObject;
        }

        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.user) {
            console.log("There has been an error", error);
            returnObject.success = false;

            return fail(400, returnObject as any);
        }

        redirect(303, "/private/dashboard");
    },

    googleLogin: async({locals: { supabase }}) => {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${PUBLIC_FRONTEND_URL}/auth/callback`
            }
        });

        if (error) {
            return fail(400, {
                message: "Something went wrong with Google login"
            });
        }

        throw redirect(303, data.url);
    }
};
