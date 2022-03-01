<script lang="ts">
	import BookCard from '$lib/BookCard.svelte';
	import type { BookItem, GetBooksRequest } from '$lib/BooksDto';

	const fetchBooks = async () => {
		try {
			isLoading = true;
			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`);
			var data = (await response.json()) as GetBooksRequest;
			books = data.items;
		} catch (err) {
		} finally {
			isLoading = false;
		}
	};

	let isLoading: boolean = false;
	let books: BookItem[] = [];
	let searchValue: string = '';
	$: resultText = books.length == 0 ? 'Nothing here yet..' : `Found ${books.length} books`;
</script>

<svelte:head>
	<title>Book finder</title>
</svelte:head>

<div class="items-center space-y-20 flex justify-center flex-col">
	<div class="max-w-screen-sm w-full sm:p-0 p-2">
		<div class="flex space-y-10 flex-col ">
			<div class="pt-20 text-center" id="header">
				<h1 class="text-3xl ">Find your book</h1>
			</div>
			<div class="relative">
				<input
					on:keypress={async (e) => {
						if (e.keyCode === 13) {
							await fetchBooks();
						}
					}}
					bind:value={searchValue}
					type="text"
					placeholder="Type the name of the book"
					class="w-full pr-16 input input-bordered"
				/>
				<button
					class:loading={isLoading}
					on:click={async () => {
						await fetchBooks();
					}}
					class="absolute top-0 right-0 rounded-l-none btn btn-outline">go</button
				>
			</div>
		</div>
		<div class="text-center mt-6 text-2xl">
			<h1>{resultText}</h1>
		</div>
	</div>

	<div
		class="sm:grid-cols-1 sm:p-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex flex-col sm:grid sm:space-y-0 space-y-6 gap-x-8 gap-y-6"
	>
		{#each books as book}
			<BookCard {book} />
		{/each}
	</div>
</div>
