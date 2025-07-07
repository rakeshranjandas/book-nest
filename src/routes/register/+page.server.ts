import { fail, redirect, type Actions } from "@sveltejs/kit"; 

interface ReturnObject {
    success: boolean;
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    errors: string[];
}

export const actions = {
    default: async({request, locals: { supabase }}) => {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordConfirmation = formData.get('passwordConfirmation') as string;

        const returnObject: ReturnObject = {
            success: true,
            name: name,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            errors: []
        }

        if (name.length < 3) {
            returnObject.errors.push("Name has to be at least 3 characters long.");
        }

        if (!email.length) {
            returnObject.errors.push("Email is required.");
        }

        if (!password.length) {
            returnObject.errors.push("Password is required.");
        
        } if(password !== passwordConfirmation) {
            returnObject.errors.push("Passwords do not match.")
        }

        if (returnObject.errors.length > 0) {
            returnObject.success = false;
            return returnObject;
        }

        // Registration flow

        const {data, error} = await supabase.auth.signUp({
            email,
            password
        });

        console.log(data, error);

        if (error || !data.user) {
            console.log("There has been an error", error);
            returnObject.success = false;
            
            return fail(400, returnObject as any);
        }

        redirect(303, "/private/dashboard");

    }
}