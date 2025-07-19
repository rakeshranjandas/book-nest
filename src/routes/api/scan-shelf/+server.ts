import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    const { base64 } = await request.json();

    // LOGIC FOR OPEN AI INTEGRATION


    const bookArray = [
        { bookTitle: "The Diary of a CEO", author: "Steven Bartlett" },
        { bookTitle: "Invisible Women", author: "Caroline Criado" },
        { bookTitle: "The Narrows", author: "Michael Connelly" },
        { bookTitle: "The Black Ice", author: "Michael Connelly" },
    ];

    return json({ bookArray });
}