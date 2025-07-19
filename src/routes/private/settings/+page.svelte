<script lang="ts">
    import Button from "$components/Button.svelte";
    import { getUserState } from "$lib/state/user-state.svelte";

    
    let userState = getUserState();
    let userName = $state(userState.userName || "");
    let isEditMode = $state(false);
    let email = $state(userState.user?.email || "");

    let averageRating = $derived.by(() => {
        const booksWithRating = userState.allBooks.filter(book => book.rating);

        if (booksWithRating.length === 0) {
            return "No ratings yet";
        }

        let sumOfAllRatings = booksWithRating.reduce((acc, book) =>  acc + book.rating!, 0);
        const averageRatingValue = Math.round(100 * sumOfAllRatings / booksWithRating.length) / 100;
    
        return "" + averageRatingValue;
    })

    $effect(() => {
        if (userState.userName) {
            userName = userState.userName;
        }
    })
    
</script>

<div class="settings-page">
    <div class="settings-container">
        <h2>Settings</h2>

        <h5 class="mt-m mb-xs semi-bold">Username</h5>
        {#if isEditMode}
        <input type="text" name="userName" bind:value={userName}/>
        {:else}
        <h3>{userName}</h3>
        {/if}

        <h5 class="mt-m mb-xs semi-bold">Email Address</h5>
        {#if isEditMode}
        <input type="text" name="userName" bind:value={email}/>
        {:else}
        <h3>{email}</h3>
        {/if}


        <div class="buttons-container mt-l">
            <Button isSecondary={true} onclick={() => {}}>
                {isEditMode ? "Save changes": "Edit"}
            </Button>
            <Button isDanger={true} onclick={() => {}}>
                Delete account
            </Button>
        </div>

    </div>

    <div class="stats-container">
        <h5 class="semi-bold">Books in library</h5>
        <h3>{userState.allBooks.length}</h3>
        <h5 class="semi-bold mt-m">Finised books</h5>
        <h3>{userState.allBooks.filter((book) => !!book.finished_reading_on).length}</h3>
        <h5 class="semi-bold mt-m">Average rating given</h5>
        <h3>{averageRating}</h3>
    </div>
</div>