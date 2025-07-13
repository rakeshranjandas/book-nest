<script lang="ts">
    import Icon from "@iconify/svelte";


</script>

<nav class="side-navigation">
    <ul>
        <li>
            <a href="/private/dashboard">
            <Icon icon="ion:library-outline" width={"40"} />
            </a>
        </li>

        <li>
            <a href="/private/scan-shelf">
            <Icon icon="solar:eye-scan-linear" width={"40"} />
            </a>
        </li>

        <li>
            <a href="/private/settings">
            <Icon icon="ion:settings-outline" width={"40"} />
            </a>
        </li>
    </ul>
</nav>

<style>
    .side-navigation {
        display: flex;
        height: 100vh;
        border-right: 1px solid grey;
        padding-left: calc(4vw + 16px);
        padding-right: 40px;
        flex: 0 0 auto; /*dont grow or shrink, size is same as content*/
        position: sticky; /*keep position constant*/
        top: 0;
    }

    .side-navigation ul {
        height: 100%; /* the ul should have same height as parent container */
        
        /*Following is done to center the icons*/
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    ul li:not(:last-of-type) {
        margin-bottom: 16px;
    }
</style>