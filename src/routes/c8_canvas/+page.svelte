<script>
    import * as THREE from "three";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { onMount } from "svelte";

    let canvas = $state();

    onMount(() => {
        // シーン
        const scene = new THREE.Scene();

        // 背景
        scene.background = new THREE.Color(0xfff8dc);

        // 原点と軸の表示（赤：X軸、黄緑：Y軸、青：Z軸）
        // 邪魔なときは以下二行をコメントアウトすること
        const axesHelper = new THREE.AxesHelper(2);
        scene.add(axesHelper);

        // カメラ
        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.width / canvas.height,
            1,
            100,
        );
        camera.position.set(4, 5, 6);
        camera.updateProjectionMatrix();

        // ライト
        // ディレクショナルライト
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-3, 8, 4);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 512;
        directionalLight.shadow.mapSize.height = 512;
        scene.add(directionalLight);

        // 環境光
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        // メッシュの追加
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(-1, 0.5, -0);
        cube.rotation.set(0, 0, 0);
        cube.scale.set(1, 1, 1);
        cube.castShadow = true;
        scene.add(cube);

        // メッシュ（床）の追加
        const floorGeometry = new THREE.PlaneGeometry(5, 5);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xfafafa,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.set(-THREE.MathUtils.degToRad(90), 0, 0);
        floor.position.set(0, -0.01, 0);
        floor.receiveShadow = true;
        scene.add(floor);

        // レンダラー
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: false,
        });
        renderer.setSize(canvas.width, canvas.height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // OrbitControlsを追加
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.target.set(0, 0, 0);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    });
</script>

<canvas bind:this={canvas} width="500" height="500"></canvas>