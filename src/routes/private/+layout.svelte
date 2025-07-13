<script lang="ts">
    import SideNavigation from "$components/Layout/SideNavigation.svelte";

    let { children } = $props();
</script>

<div class="auth-area">
    <SideNavigation/>
    <div class="main-area">
        {@render children()}
    </div>
</div>

<style>
    .auth-area {
        display: flex;
        height: 100vh;
        overflow: hidden; /* Both sidenav and main area are non-scrollable. Later main-area will be made scrollable.*/
    }

    .main-area {
        flex: 1; /* Main area takes the remaining space */
        min-width: 0;
        padding: 40px 4vw 100px 40px;
        overflow-y: auto; /* Main area is scrollable*/
    }
</style>