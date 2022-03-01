export interface BookItem {
	volumeInfo: BookDetails;
}

export interface BookDetails {
	title: string;
	imageLinks: ImageLinks;
	publishedDate: string;
	previewLink: string;
	authors: string[];
}

export interface ImageLinks {
	thumbnail: string;
}

export interface GetBooksRequest {
	items: BookItem[];
}
