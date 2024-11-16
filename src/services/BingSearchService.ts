import { ISearchRequestModel } from "../models/searchRequestModel";
import { ISearchResponseModel } from "../models/searchResponseModel";
import { environment } from "../config/enviroment";

const API_BASE_URL = environment.SEO_ANALYZING_API_BASEURL;

export async function getBingSeoAnalyzing({
    searchQuery,
    searchUrl,
    searchLimit = 100,
}: ISearchRequestModel
): Promise<ISearchResponseModel> {
    try {
        const response = await fetch(`${API_BASE_URL}/BingAnalyzing/Search?SearchQuery=${searchQuery}&SearchUrl=${searchUrl}&SearchLimit=${searchLimit}`);

        if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error("Error fetching SEO analyzing:", error);
        throw error;
    }
}
