import { Appwrite, Models } from 'appwrite';
import { goto } from '$app/navigation';

type AppwriteConfig = {
	jobCollectionId: string;
	projectId: string;
	likedJobCollectionId: string;
	projectEndpoint: string;
};
const serverConfig: AppwriteConfig = {
	projectId: import.meta.env.VITE_APP_PROJECT_ID.toString(),
	likedJobCollectionId: import.meta.env.VITE_APP_LIKED_JOBS_COLLECTION_ID.toString(),
	jobCollectionId: import.meta.env.VITE_APP_JOB_COLLECTION_ID.toString(),
	projectEndpoint: import.meta.env.VITE_APP_PROJECT_ENDPOINT.toString()
};

const api = new Appwrite();
api.setEndpoint(serverConfig.projectEndpoint).setProject(serverConfig.projectId);

const isLoggedIn = async (): Promise<Models.User<Models.Preferences>> => {
	try {
		return await api.account.get();
	} catch (error) {
		await goto('/login');
	}
};

export { api, serverConfig, isLoggedIn };
