<script lang="ts">
	import type { BookItem } from './BooksDto';

	export let book: BookItem;
</script>

<div class="px-6 py-6 h-full w-96  shadow-lg border-2 border-dashed  rounded-xl">
	<div class="flex space-x-6 w-full h-full flex-row">
		<div class="flex flex-col">
			<img class="rounded-xl" alt="book" src={book?.volumeInfo?.imageLinks?.thumbnail} />
		</div>
		<div class="flex flex-col justify-between">
			<div>
				<h1 class="font-bold">{book.volumeInfo.title}</h1>
				<h1 class="font-bold opacity-50">
					{book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown author'}
				</h1>
			</div>
			<div>
				<h1 class="font-bold opacity-50">Published on {book.volumeInfo.publishedDate}</h1>
				<a href={book.volumeInfo.previewLink}>
					<button class="btn-outline btn-sm btn">View</button>
				</a>
			</div>
		</div>
	</div>
</div>
