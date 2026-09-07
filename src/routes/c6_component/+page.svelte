<script>
    import Panel1 from '$lib/components/Panel1.svelte';
    import Panel2 from '$lib/components/Panel2.svelte';
</script>

<div class="main">
    <Panel1 />
    <Panel2 />
</div>

<style>
    .main {
        display: flex;
        flex-direction: row-reverse;
    }
</style>