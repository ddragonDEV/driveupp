import { Response } from "express";

export const redirectByResponse = async (response: Response, endpoint: string) =>
    await new Promise(async (resolve, reject) => {
        response.redirect(`/${ endpoint }`);
    });
