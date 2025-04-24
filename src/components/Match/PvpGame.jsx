import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

const PvpGame = () => {
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        // Set up the scene
        const scene = new THREE.Scene();

        // Set up the camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.6, 0);

        // Set up the renderer
        const canvas = document.querySelector('#gameCanvas');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        // Player mesh (for potential collision logic later)
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const player = new THREE.Mesh(geometry, material);
        player.position.y = 1.6;
        scene.add(player);

        // FirstPersonControls setup
        const controls = new FirstPersonControls(camera, renderer.domElement);
        controls.lookSpeed = 0.25;
        controls.movementSpeed = 4;
        controls.lookVertical = true;
        controls.constrainVertical = true;
        controls.verticalMin = 0;
        controls.verticalMax = Math.PI;
        controls.activeLook = true;

        // Handle resizing
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            controls.handleResize();
        };

        window.addEventListener('resize', onWindowResize);

        // Load the 3D map model
        const loader = new GLTFLoader();
        loader.load(
            '/3d/r6_3d_map_theme_park.glb',
            (gltf) => {
                scene.add(gltf.scene);
                gltf.scene.position.set(0, 0, 0);
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        // Keypress handling for space and shift
        let moveUp = false;
        let moveDown = false;

        const onKeyDown = (event) => {
            if (event.key === ' ' && !paused) {
                moveUp = true; // Spacebar pressed, move up
            }
            if (event.key === 'Shift' && !paused) {
                moveDown = true; // Shift pressed, move down
            }
            if (event.key === 'Escape') {
                setPaused(!paused); // Toggle pause menu
            }
        };

        const onKeyUp = (event) => {
            if (event.key === ' ') {
                moveUp = false;
            }
            if (event.key === 'Shift') {
                moveDown = false;
            }
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        // Animation loop with delta time
        const clock = new THREE.Clock();

        const animate = () => {

            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            controls.update(delta);

            // Handle vertical movement (space and shift)
            if (moveUp) {
                camera.position.y += 0.025; // Move up
            }
            if (moveDown) {
                camera.position.y -= 0.025; // Move down
            }

            // Keep the player mesh in sync with the camera position (optional)
            player.position.copy(camera.position);

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            renderer.dispose();
        };
    }, []);

    // Overlay with key bindings and pause menu
    const renderOverlay = () => {
        return (
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: "0",
                bottom: "0",
                padding: "10px",
                color: 'white',
                fontFamily: 'Arial, sans-serif',
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <p>WASD - Move</p>
                <p>Space - Go Up</p>
                <p>Shift - Go Down</p>
                <p>Esc - Open Menu</p>
                {paused && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontFamily: 'Arial, sans-serif',
                        zIndex: 15,
                        pointerEvents: 'auto', // Ensure the buttons are clickable
                        textAlign: 'center',
                    }}>
                        <h2>Game Paused</h2>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                        }}>
                            <button
                                style={{
                                    padding: "10px",
                                }}
                                onClick={() => setPaused(false)}>
                                Resume
                            </button>
                            <button
                                style={{
                                    padding: "10px",
                                }}
                                onClick={() => window.location.href = '/'}>
                                Back to Main Menu
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <canvas id="gameCanvas" />
            {renderOverlay()}
        </>
    );
};

export default PvpGame;
