<script lang="ts">
    import type { Book } from "$lib/state/user-state.svelte";
    import BookCard from "./BookCard.svelte";

    interface BookCategoryProps {
        categoryName: string,
        booksToDisplay: Book[]
    }

    let { categoryName, booksToDisplay }: BookCategoryProps = $props();
</script>

<section class="book-category mb-m">
    <h3 class="mb-s">{categoryName}</h3>
    <div class="books-container">
        {#each booksToDisplay as book}
        <BookCard {book} />
        {/each}
    </div>
</section>

<style>
    .books-container {
        display: flex;
        overflow-x: auto;
        gap: 16px;
        padding-bottom: 8px;
        scrollbar-width: thin;
    }

    .books-container::webkit-scrollbar {
        height: 6px;
    }

    .books-container::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
</style>