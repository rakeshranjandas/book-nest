<script lang="ts">
    import bookNestLogo from "$assets/app-logo.svg"; 
    import Button from "$components/Button.svelte";
    import { getUserState } from "$lib/state/user-state.svelte";

    let userState = getUserState();
    let {user, userName} = $derived(userState);

    // $inspect(user);
    
</script>

<header>
    <a href={user ? "/private/dashboard" : "/"}>
        <img class="logo" src={bookNestLogo} alt="Go to home"/>
    </a>
    <nav>
        {#if !user}
        <ul>
            <li>
                <Button isMenu={true} href="/register">Create account</Button>
            </li>
            <li>
                <Button isMenu={true} isSecondary={true} href="/login">Login</Button>
            </li>
        </ul>
        {:else}
        <ul>
            <li>
                {userName}
            </li>
            <li>
                <Button isMenu={true} onclick={() => userState.logout()}>Logout</Button>
            </li>
        </ul>
        {/if}
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 4vw;
    }

    ul {
        display: flex;
        align-items: center;
        column-gap: 24px;
    }

    .logo {
        height: 72px;
    }
</style>