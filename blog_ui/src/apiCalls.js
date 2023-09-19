import { publicRequest } from "./requestMethods";

export const addSuggestedArticle = async (suggestedArticle) => {
    try {
        const res = await publicRequest.post(`/suggestedArticles`, suggestedArticle);
    } catch (error) {
        console.log(error);
    }
}