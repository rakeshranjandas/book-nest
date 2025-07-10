<script lang="ts">
    import { getUserState } from "$lib/state/user-state.svelte";

    let userState = getUserState();
    let {allBooks} = $derived(userState);
</script>

{#each allBooks as book}
    <li>{book.title}</li>
{/each}