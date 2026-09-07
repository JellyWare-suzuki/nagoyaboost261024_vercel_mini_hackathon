<script>
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Sveltekit Tutorial!</title>
</svelte:head>

<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li class="more-items">
            <span class="more-toggle">前半</span>
            <ul class="dropdown">
                <li><a href="/c1_add_page">Add Page</a></li>
                <li><a href="/c2_reactive1">Reactive1</a></li>
                <li><a href="/c3_reactive2">Reactive2</a></li>
                <li><a href="/c4_eventhandler">Event Handler</a></li>
                <li><a href="/c5_dynamic_html">Dynamic HTML</a></li>
                <li><a href="/c6_component">Component</a></li>
            </ul>
        </li>
        <li class="more-items">
            <span class="more-toggle">後半</span>
            <ul class="dropdown">
                <li><a href="/c7_store">Store</a></li>
                <li><a href="/c8_canvas">Canvas</a></li>
            </ul>
        </li>
        <li class="more-items">
            <span class="more-toggle">問題🏈</span>
            <ul class="dropdown">
                <li><a href="/p1_practice1">演習問題1</a></li>
                <li><a href="/p2_practice2">演習問題2</a></li>
                <li><a href="/p3_practice3">演習問題3</a></li>
                <li><a href="/p4_practice4">演習問題4</a></li>
            </ul>
        </li>
    </ul>
</nav>

<main>
    {@render children()}
</main>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
    }

    /* Navigation styles */
    nav {
        background-color: #2c3e50;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    nav > ul {
        list-style: none;
        display: flex;
        justify-content: center;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    nav li {
        position: relative;
    }

    nav a, .more-toggle {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        font-weight: 500;
        display: block;
        white-space: nowrap;
    }

    nav a:hover, .more-toggle:hover {
        background-color: #34495e;
    }

    /* ドロップダウン部分 */
    .more-items {
        position: relative;
    }

    .more-toggle {
        cursor: pointer;
        user-select: none;
    }

    .more-toggle::after {
        content: " ▼";
        font-size: 0.8em;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: #2c3e50;
        min-width: 150px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        list-style: none;
        padding: 0.5rem 0;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        z-index: 1000;
    }

    .more-items:hover .dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .dropdown li {
        width: 100%;
    }

    .dropdown a {
        padding: 0.7rem 1rem;
        border-radius: 0;
    }

    .dropdown a:hover {
        background-color: #34495e;
    }

    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        nav > ul {
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        nav a, .more-toggle {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
        }
    }
</style>