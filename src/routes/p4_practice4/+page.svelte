<script>
    import * as THREE from "three";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { onMount } from "svelte";

    let canvas = $state();
    let loading = $state(true);
    let error = $state("");

    const GEOJSON_URL =
        "https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson";

    onMount(() => {
        let animationFrameId;
        let renderer;
        let controls;

        // ------------------------------------------------------------
        // シーン
        // ------------------------------------------------------------

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f7fa);

        // ------------------------------------------------------------
        // カメラ
        // ------------------------------------------------------------

        const camera = new THREE.PerspectiveCamera(
            35,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        );

        camera.position.set(0, -8, 14);

        // ------------------------------------------------------------
        // ライト
        // ------------------------------------------------------------

        const ambientLight = new THREE.AmbientLight(
            0xffffff,
            2.0,
        );

        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(
            0xffffff,
            3.0,
        );

        directionalLight.position.set(-5, -5, 15);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(
            0xffffff,
            1.5,
        );

        directionalLight2.position.set(10, 5, 8);
        scene.add(directionalLight2);

        // ------------------------------------------------------------
        // レンダラー
        // ------------------------------------------------------------

        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2),
        );

        renderer.setSize(
            canvas.clientWidth,
            canvas.clientHeight,
            false,
        );

        // ------------------------------------------------------------
        // OrbitControls
        // ------------------------------------------------------------

        controls = new OrbitControls(
            camera,
            renderer.domElement,
        );

        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = true;

        controls.minDistance = 4;
        controls.maxDistance = 30;

        controls.target.set(0, 0, 0);

        // ------------------------------------------------------------
        // 地図の座標変換
        //
        // GeoJSON:
        // [経度, 緯度]
        //
        // Three.js:
        // X = 経度
        // Y = 緯度
        // Z = 高さ
        //
        // 北を上、東を右として扱う。
        // 負のスケールによる反転は行わない。
        // ------------------------------------------------------------

        const SCALE_X = 0.14;
        const SCALE_Y = 0.14;

        const CENTER_LON = 137;
        const CENTER_LAT = 36;

        const projectCoordinate = (
            longitude,
            latitude,
        ) => {
            return {
                x:
                    (longitude - CENTER_LON) *
                    SCALE_X,

                y:
                    (latitude - CENTER_LAT) *
                    SCALE_Y,
            };
        };

        // ------------------------------------------------------------
        // GeoJSONのリングをShapeに変換
        // ------------------------------------------------------------

        const createShapeFromRing = (ring) => {
            if (!ring || ring.length < 3) {
                return null;
            }

            const shape = new THREE.Shape();

            ring.forEach(
                ([longitude, latitude], index) => {
                    const point =
                        projectCoordinate(
                            longitude,
                            latitude,
                        );

                    if (index === 0) {
                        shape.moveTo(
                            point.x,
                            point.y,
                        );
                    } else {
                        shape.lineTo(
                            point.x,
                            point.y,
                        );
                    }
                },
            );

            shape.closePath();

            return shape;
        };

        // ------------------------------------------------------------
        // Polygonを3D化
        // ------------------------------------------------------------

        const createPolygonMeshes = (
            coordinates,
            material,
        ) => {
            const meshes = [];

            if (!coordinates?.length) {
                return meshes;
            }

            const outerRing = coordinates[0];

            const shape =
                createShapeFromRing(
                    outerRing,
                );

            if (!shape) {
                return meshes;
            }

            // 内側リングを穴として登録
            for (
                let i = 1;
                i < coordinates.length;
                i += 1
            ) {
                const holeRing =
                    coordinates[i];

                if (
                    !holeRing ||
                    holeRing.length < 3
                ) {
                    continue;
                }

                const holePath =
                    new THREE.Path();

                holeRing.forEach(
                    (
                        [
                            longitude,
                            latitude,
                        ],
                        index,
                    ) => {
                        const point =
                            projectCoordinate(
                                longitude,
                                latitude,
                            );

                        if (index === 0) {
                            holePath.moveTo(
                                point.x,
                                point.y,
                            );
                        } else {
                            holePath.lineTo(
                                point.x,
                                point.y,
                            );
                        }
                    },
                );

                holePath.closePath();

                shape.holes.push(
                    holePath,
                );
            }

            // 日本列島を薄く押し出して3D化
            const geometry =
                new THREE.ExtrudeGeometry(
                    shape,
                    {
                        depth: 0.18,
                        bevelEnabled: false,
                        curveSegments: 2,
                        steps: 1,
                    },
                );

            /*
             * 表裏両面を描画する。
             *
             * GeoJSONのリング方向によって
             * 裏返って見えなくなることを防止。
             */
            material.side =
                THREE.DoubleSide;

            const mesh =
                new THREE.Mesh(
                    geometry,
                    material,
                );

            mesh.position.z = 0;

            meshes.push(mesh);

            return meshes;
        };

        // ------------------------------------------------------------
        // MultiPolygonを3D化
        // ------------------------------------------------------------

        const createMultiPolygonMeshes = (
            coordinates,
            material,
        ) => {
            const meshes = [];

            for (
                const polygonCoordinates of coordinates
            ) {
                const polygonMeshes =
                    createPolygonMeshes(
                        polygonCoordinates,
                        material,
                    );

                meshes.push(
                    ...polygonMeshes,
                );
            }

            return meshes;
        };

        // ------------------------------------------------------------
        // 日本列島を作成
        // ------------------------------------------------------------

        const createJapan = (geojson) => {
            const japanGroup =
                new THREE.Group();

            // 陸地
            const landMaterial =
                new THREE.MeshStandardMaterial(
                    {
                        color: 0x4caf70,
                        roughness: 0.82,
                        metalness: 0.0,
                        side: THREE.DoubleSide,
                    },
                );

            // 境界線
            const borderMaterial =
                new THREE.LineBasicMaterial(
                    {
                        color: 0x174d2b,
                        transparent: true,
                        opacity: 0.85,
                    },
                );

            for (
                const feature of
                    geojson.features ?? []
            ) {
                const geometry =
                    feature.geometry;

                if (!geometry) {
                    continue;
                }

                let meshes = [];

                // Polygon
                if (
                    geometry.type ===
                    "Polygon"
                ) {
                    meshes =
                        createPolygonMeshes(
                            geometry.coordinates,
                            landMaterial,
                        );
                }

                // MultiPolygon
                if (
                    geometry.type ===
                    "MultiPolygon"
                ) {
                    meshes =
                        createMultiPolygonMeshes(
                            geometry.coordinates,
                            landMaterial,
                        );
                }

                // メッシュを追加
                for (
                    const mesh of meshes
                ) {
                    japanGroup.add(mesh);
                }

                // ----------------------------------------------------
                // 境界線
                // ----------------------------------------------------

                const drawRing = (
                    ring,
                ) => {
                    if (
                        !ring ||
                        ring.length < 2
                    ) {
                        return;
                    }

                    const points =
                        ring.map(
                            (
                                [
                                    longitude,
                                    latitude,
                                ],
                            ) => {
                                const point =
                                    projectCoordinate(
                                        longitude,
                                        latitude,
                                    );

                                return new THREE.Vector3(
                                    point.x,
                                    point.y,
                                    0.19,
                                );
                            },
                        );

                    // 閉じる
                    points.push(
                        points[0].clone(),
                    );

                    const lineGeometry =
                        new THREE.BufferGeometry().setFromPoints(
                            points,
                        );

                    const line =
                        new THREE.Line(
                            lineGeometry,
                            borderMaterial,
                        );

                    japanGroup.add(line);
                };

                if (
                    geometry.type ===
                    "Polygon"
                ) {
                    for (
                        const ring of
                            geometry.coordinates
                    ) {
                        drawRing(ring);
                    }
                }

                if (
                    geometry.type ===
                    "MultiPolygon"
                ) {
                    for (
                        const polygon of
                            geometry.coordinates
                    ) {
                        for (
                            const ring of
                                polygon
                        ) {
                            drawRing(ring);
                        }
                    }
                }
            }

            // --------------------------------------------------------
            // モデルを中央配置
            // --------------------------------------------------------

            const box =
                new THREE.Box3().setFromObject(
                    japanGroup,
                );

            const center =
                new THREE.Vector3();

            box.getCenter(center);

            japanGroup.position.x -=
                center.x;

            japanGroup.position.y -=
                center.y;

            /*
             * 重要:
             *
             * 負のscaleを使わない。
             *
             * scale.set(-1, 1, 1)
             * scale.set(1, -1, 1)
             *
             * のような処理は行わない。
             */
            japanGroup.scale.set(
                1,
                1,
                1,
            );

            // 回転もしない
            japanGroup.rotation.set(
                0,
                0,
                0,
            );

            scene.add(japanGroup);

            // --------------------------------------------------------
            // カメラを日本全体に合わせる
            // --------------------------------------------------------

            const finalBox =
                new THREE.Box3().setFromObject(
                    japanGroup,
                );

            const finalCenter =
                new THREE.Vector3();

            finalBox.getCenter(
                finalCenter,
            );

            controls.target.copy(
                finalCenter,
            );

            const size =
                new THREE.Vector3();

            finalBox.getSize(size);

            const maxDimension =
                Math.max(
                    size.x,
                    size.y,
                    size.z,
                );

            camera.position.set(
                maxDimension * 0.15,
                -maxDimension * 0.85,
                maxDimension * 1.35,
            );

            camera.lookAt(
                finalCenter,
            );

            controls.update();

            return japanGroup;
        };

        // ------------------------------------------------------------
        // GeoJSONを取得
        // ------------------------------------------------------------

        const loadJapan = async () => {
            loading = true;
            error = "";

            try {
                const response =
                    await fetch(
                        GEOJSON_URL,
                    );

                if (!response.ok) {
                    throw new Error(
                        `日本地図データの取得に失敗しました。HTTP ${response.status}`,
                    );
                }

                const geojson =
                    await response.json();

                if (
                    geojson.type !==
                    "FeatureCollection"
                ) {
                    throw new Error(
                        "GeoJSONの形式が正しくありません。",
                    );
                }

                createJapan(
                    geojson,
                );

                loading = false;
            } catch (e) {
                console.error(e);

                error =
                    e instanceof Error
                        ? e.message
                        : "日本地図の読み込みに失敗しました。";

                loading = false;
            }
        };

        // ------------------------------------------------------------
        // リサイズ
        // ------------------------------------------------------------

        const handleResize = () => {
            if (
                !canvas ||
                !renderer
            ) {
                return;
            }

            const width =
                canvas.clientWidth;

            const height =
                canvas.clientHeight;

            if (
                width <= 0 ||
                height <= 0
            ) {
                return;
            }

            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();

            renderer.setSize(
                width,
                height,
                false,
            );
        };

        window.addEventListener(
            "resize",
            handleResize,
        );

        // ------------------------------------------------------------
        // アニメーション
        // ------------------------------------------------------------

        const animate = () => {
            animationFrameId =
                requestAnimationFrame(
                    animate,
                );

            controls.update();

            renderer.render(
                scene,
                camera,
            );
        };

        handleResize();

        loadJapan();

        animate();

        // ------------------------------------------------------------
        // cleanup
        // ------------------------------------------------------------

        return () => {
            window.removeEventListener(
                "resize",
                handleResize,
            );

            cancelAnimationFrame(
                animationFrameId,
            );

            controls?.dispose();

            scene.traverse(
                (object) => {
                    if (
                        object instanceof
                        THREE.Mesh
                    ) {
                        object.geometry?.dispose();

                        if (
                            Array.isArray(
                                object.material,
                            )
                        ) {
                            object.material.forEach(
                                (
                                    material,
                                ) =>
                                    material.dispose(),
                            );
                        } else {
                            object.material?.dispose();
                        }
                    }

                    if (
                        object instanceof
                        THREE.Line
                    ) {
                        object.geometry?.dispose();
                        object.material?.dispose();
                    }
                },
            );

            renderer?.dispose();
        };
    });
</script>

<svelte:head>
    <title>日本列島 3Dモデル</title>
</svelte:head>

<div class="page">
    <header class="header">
        <h1>日本列島 3Dモデル</h1>

        <p>
            GeoJSONの日本地図をThree.jsで立体化しています。
        </p>
    </header>

    <main class="viewer">
        {#if loading}
            <div class="status">
                日本列島の地図データを読み込んでいます……
            </div>
        {:else if error}
            <div class="error">
                {error}
            </div>
        {/if}

        <canvas
            bind:this={canvas}
            width="1000"
            height="700"
        ></canvas>
    </main>

    <footer class="footer">
        <p>
            ドラッグ：回転　／　ホイール：ズーム　／　右ドラッグ：移動
        </p>

        <p>
            地図データ：
            国土地理院「地球地図日本」を元にした
            Data of Japan の GeoJSON
        </p>
    </footer>
</div>

<style>
    :global(html),
    :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
    }

    :global(body) {
        background: #f5f7fa;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        color: #263238;
    }

    .page {
        width: 100%;
        min-height: 100vh;
        box-sizing: border-box;
        padding: 24px;
    }

    .header {
        width: min(1200px, 100%);
        margin: 0 auto 16px;
    }

    h1 {
        margin: 0 0 8px;
        font-size: 28px;
        font-weight: 700;
    }

    .header p {
        margin: 0;
        color: #607d8b;
        font-size: 14px;
    }

    .viewer {
        position: relative;
        width: min(1200px, 100%);
        height: min(75vh, 760px);
        min-height: 500px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 16px;
        background: #ffffff;
        box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.08);
    }

    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }

    .status,
    .error {
        position: absolute;
        z-index: 10;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 18px;
        border-radius: 999px;
        background: rgba(
            255,
            255,
            255,
            0.95
        );
        box-shadow:
            0 4px 16px
            rgba(0, 0, 0, 0.12);
        font-size: 14px;
        white-space: nowrap;
    }

    .status {
        color: #546e7a;
    }

    .error {
        color: #c62828;
        background: #ffebee;
    }

    .footer {
        width: min(1200px, 100%);
        margin: 12px auto 0;
        color: #78909c;
        font-size: 12px;
        line-height: 1.7;
    }

    .footer p {
        margin: 3px 0;
    }

    @media (max-width: 700px) {
        .page {
            padding: 12px;
        }

        .viewer {
            min-height: 420px;
            height: 70vh;
            border-radius: 12px;
        }

        h1 {
            font-size: 22px;
        }

        .status,
        .error {
            max-width: calc(100% - 32px);
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
