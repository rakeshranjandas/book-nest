<script lang="ts">
    import BookCard from "$components/BookCard.svelte";
    import BookCategory from "$components/BookCategory.svelte";
    import { getUserState } from "$lib/state/user-state.svelte";
    import Icon from "@iconify/svelte";

    let userState = getUserState();
    let {userName, allBooks} = $derived(userState);
</script>

<div class="dashboard">
    <div class="dashboard-header mb-m">
        <a href="/private/scan-shelf" class="add-book">
            <Icon icon="icons8:plus" width={"72"} height={"72"} />
            <p>Add a book</p>
        </a>

        <div class="headline">
            <h3 class="bold mb-xs">Welcome back, {userName}</h3>
            <p>
                There's nothing quite like the journey a good back can take you on. Have you discoverd anynew favorites recently?
            </p>
        </div>
    </div>

    {#if allBooks.length}
        {#if userState.getHighestRatedBooks().length}
        <BookCategory booksToDisplay={userState.getHighestRatedBooks()} categoryName={"Your favorite books"} />
        {/if}
        
        <BookCategory booksToDisplay={userState.getUnreadBooks()} categoryName={"Recently added, unread books"} />
    
        {#if userState.getFavoriteGenre()}
        <BookCategory booksToDisplay={userState.getFavoriteGenreBooks()} categoryName={`Highest rated books from your favorite genre: ${userState.getFavoriteGenre()}`} />
        {/if}
        {:else}
        
        <h4>You have no books in you library at this moment. <a href="/private/scan-shelf">Add a book</a> to get started</h4>
    {/if}
</div>

<style>
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .add-book {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .add-book p {
        margin-left: 8px;
    }

    .headline {
        text-align: right;
        max-width: 30%;
        min-width: 300px;
    }
</style>