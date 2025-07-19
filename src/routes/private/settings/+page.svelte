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

    async function toggleEditModeAndSaveToDatabase() {
        if (isEditMode) {
            await userState.updateAccountData(email, userName);
        }
        isEditMode = !isEditMode;
    }
    
    async function deleteAccount() {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if (confirmDelete) {
            await userState.deleteAccount();
        }
    }
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
            <Button isSecondary={true} onclick={toggleEditModeAndSaveToDatabase}>
                {isEditMode ? "Save changes": "Edit"}
            </Button>
            <Button isDanger={true} onclick={deleteAccount}>
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

<style>
    .settings-page {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
    }

    .settings-container {
        margin-right: 80px;
    }

    .settings-container input {
        width: 100%;
    }

    .stats-container {
        min-width: 25%;
        border-radius: 12px;
        padding: 8px 24px;
        background-color: rgba(255, 255, 255, 0.5);
        margin-bottom: 40px;
    }
</style>