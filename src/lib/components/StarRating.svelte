<script lang="ts">
    interface StarRatingProps {
        value: number;
        isReadOnly?: boolean;
        onUpdateRating?: (newRating: number) => void;
    }

    let {isReadOnly, value, onUpdateRating}: StarRatingProps = $props();

    function handleRating(newRating: number) {
        value = newRating;
        if (onUpdateRating) {
            onUpdateRating(newRating);
        }
    }
</script>

<div class="rating" role={isReadOnly ? "img": "group"}>
    <div class="rating-container">
        {#each Array(5) as _, i}
            <button type="button" class="star" disabled={isReadOnly} onclick={() => handleRating(i+1)}>
                <span 
                    class="star-icon" 
                    style="--fill: {i+1 <= value ? 'gold': 'rgba(100, 100, 100, 0.15)'} /* Conditionally set value of the variable --fill */ "
                >
                ★
                </span>
            </button>
        {/each}
    </div>
</div>

<style>
    .rating-container {
        display: inline-flex;
        outline: none;
    }

    .star {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
        font-size: 32px;
        color: transparent;
    }

    .star span {
        display: inline-block;
        color: var(--fill);
    }
</style>