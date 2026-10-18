/**
 * 3D Cinematic WebGL Experience - Three.js Engine
 * - Realistic floating 3D botanical tea leaves with organic tumbling physics
 * - Golden tea aroma embers & volumetric steam mist particles
 * - Interactive cursor gravity & repulsion field
 * - Parallax camera movement mapped to scroll velocity and mouse depth
 */

class TeaVisualExperience {
    constructor() {
        this.container = document.getElementById('three-canvas-container');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.leaves = [];
        this.particleSystem = null;
        this.steamSystem = null;
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.scroll = { y: 0, targetY: 0, current: 0 };
        this.pointLight = null;
        this.clock = new THREE.Clock();
        this.isEnabled = true;

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        // Fog for cinematic atmospheric depth
        this.scene.fog = new THREE.FogExp2(0x0e1317, 0.0018);

        // Camera
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
        this.camera.position.z = 80;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;
        this.container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
        this.scene.add(ambientLight);

        // Directional Sun / Studio Rim Light
        const dirLight = new THREE.DirectionalLight(0xffaa44, 2.5);
        dirLight.position.set(50, 80, 50);
        this.scene.add(dirLight);

        // Dynamic Cursor Spotlight
        this.pointLight = new THREE.PointLight(0xff7700, 3.5, 120);
        this.pointLight.position.set(0, 0, 40);
        this.scene.add(this.pointLight);

        // Secondary Soft Teal / Matcha backlight
        const backLight = new THREE.PointLight(0x22c55e, 2.0, 150);
        backLight.position.set(-60, -40, 20);
        this.scene.add(backLight);

        // Build Geometry
        this.createLeaves();
        this.createAromaParticles();
        this.createSteamClouds();

        // Listeners
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));

        // Start Animation Loop
        this.animate();
    }

    createLeafGeometry() {
        const shape = new THREE.Shape();
        // Organic tea leaf outline
        shape.moveTo(0, -3.5);
        shape.bezierCurveTo(2.2, -2.0, 2.8, 1.5, 0, 4.0);
        shape.bezierCurveTo(-2.8, 1.5, -2.2, -2.0, 0, -3.5);

        const extrudeSettings = {
            steps: 2,
            depth: 0.12,
            bevelEnabled: true,
            bevelThickness: 0.08,
            bevelSize: 0.08,
            bevelSegments: 3
        };

        const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geom.center();

        // Apply slight curved bend to vertices along the midrib for 3D realism
        const pos = geom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            // Parabolic curve curl
            const zCurve = Math.sin((y / 4.0) * Math.PI) * 0.45 - (x * x) * 0.12;
            pos.setZ(i, pos.getZ(i) + zCurve);
        }
        geom.computeVertexNormals();
        return geom;
    }

    createLeaves() {
        const leafGeom = this.createLeafGeometry();
        const leafCount = window.innerWidth < 768 ? 22 : 45;

        // Palette of rich organic tea leaves: Fresh Matcha, Jade Green, Amber Roasted, Golden Tip
        const colors = [0x3d7023, 0x4e8c2c, 0x275916, 0x936829, 0xb87d28, 0x5a8332];

        for (let i = 0; i < leafCount; i++) {
            const color = colors[i % colors.length];
            const material = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.38,
                metalness: 0.15,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(leafGeom, material);

            // Spread out across full viewport & depth
            mesh.position.x = (Math.random() - 0.5) * 160;
            mesh.position.y = (Math.random() - 0.5) * 140;
            mesh.position.z = (Math.random() - 0.5) * 90 - 10;

            const scale = 0.55 + Math.random() * 0.75;
            mesh.scale.set(scale, scale, scale);

            mesh.rotation.x = Math.random() * Math.PI * 2;
            mesh.rotation.y = Math.random() * Math.PI * 2;
            mesh.rotation.z = Math.random() * Math.PI * 2;

            // Physics / movement properties
            this.leaves.push({
                mesh: mesh,
                basePos: mesh.position.clone(),
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.02,
                rotSpeedZ: (Math.random() - 0.5) * 0.012,
                floatSpeed: 0.6 + Math.random() * 0.8,
                floatOffset: Math.random() * Math.PI * 2,
                swayAmplitude: 2.5 + Math.random() * 3.5,
                swaySpeed: 0.8 + Math.random() * 0.7
            });

            this.scene.add(mesh);
        }
    }

    createAromaParticles() {
        const count = window.innerWidth < 768 ? 140 : 320;
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const opacities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 180;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

            scales[i] = 1.0 + Math.random() * 2.8;
            opacities[i] = 0.2 + Math.random() * 0.7;
        }

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

        // Procedural circular glow texture
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 215, 120, 1)');
        grad.addColorStop(0.3, 'rgba(255, 140, 40, 0.6)');
        grad.addColorStop(0.7, 'rgba(255, 90, 0, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 3.5,
            map: texture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            color: 0xffaa44
        });

        this.particleSystem = new THREE.Points(geom, material);
        this.scene.add(this.particleSystem);
    }

    createSteamClouds() {
        // Subtle rising mist particles near the hero region
        const steamCount = 60;
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(steamCount * 3);
        const velocities = [];

        for (let i = 0; i < steamCount; i++) {
            positions[i * 3] = 15 + (Math.random() - 0.5) * 35;
            positions[i * 3 + 1] = -15 + Math.random() * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30 + 10;

            velocities.push({
                x: (Math.random() - 0.5) * 0.05,
                y: 0.08 + Math.random() * 0.12,
                z: (Math.random() - 0.5) * 0.04,
                initialY: -15,
                maxY: 35
            });
        }

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        grad.addColorStop(0.5, 'rgba(255, 230, 200, 0.12)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(canvas);

        const mat = new THREE.PointsMaterial({
            size: 16.0,
            map: texture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.35
        });

        this.steamSystem = {
            points: new THREE.Points(geom, mat),
            velocities: velocities,
            count: steamCount
        };

        this.scene.add(this.steamSystem.points);
    }

    onMouseMove(e) {
        // Normalized device coordinates (-1 to 1)
        this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    onScroll() {
        this.scroll.targetY = window.scrollY;
    }

    onResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const delta = this.clock.getDelta();
        const elapsed = this.clock.getElapsedTime();

        // Smooth mouse damping
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // Smooth scroll damping
        this.scroll.current += (this.scroll.targetY - this.scroll.current) * 0.06;

        // Parallax Camera motion based on mouse and scroll
        this.camera.position.x = this.mouse.x * 12;
        this.camera.position.y = this.mouse.y * 10 - (this.scroll.current * 0.035);
        this.camera.lookAt(0, -(this.scroll.current * 0.035), 0);

        // Move dynamic spotlight to cursor position
        if (this.pointLight) {
            this.pointLight.position.x = this.mouse.x * 50;
            this.pointLight.position.y = this.mouse.y * 40 - (this.scroll.current * 0.035);
        }

        // Animate 3D Botanical Leaves
        for (let i = 0; i < this.leaves.length; i++) {
            const item = this.leaves[i];
            const mesh = item.mesh;

            // Natural 3D tumbling rotation
            mesh.rotation.x += item.rotSpeedX;
            mesh.rotation.y += item.rotSpeedY;
            mesh.rotation.z += item.rotSpeedZ;

            // Organic floating wave & breeze
            const sway = Math.sin(elapsed * item.swaySpeed + item.floatOffset) * item.swayAmplitude;
            const floatY = Math.cos(elapsed * item.floatSpeed + item.floatOffset) * 2.0;

            mesh.position.y = item.basePos.y + floatY - (this.scroll.current * 0.015);
            mesh.position.x = item.basePos.x + sway + (this.mouse.x * 6.0);

            // Subtle mouse repulsion for tactile physical responsiveness
            const dx = mesh.position.x - (this.mouse.x * 45);
            const dy = mesh.position.y - (this.mouse.y * 35 - this.scroll.current * 0.035);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 22 && dist > 0.1) {
                const force = (22 - dist) / 22;
                mesh.position.x += (dx / dist) * force * 1.5;
                mesh.position.y += (dy / dist) * force * 1.5;
            }
        }

        // Animate Aroma Ember Particles
        if (this.particleSystem) {
            const posAttr = this.particleSystem.geometry.attributes.position;
            const pos = posAttr.array;
            for (let i = 0; i < pos.length; i += 3) {
                // Drift gently upwards
                pos[i + 1] += 0.06;
                // Subtle horizontal flutter
                pos[i] += Math.sin(elapsed * 1.2 + i) * 0.025;

                // Loop around when exiting top
                if (pos[i + 1] > 90) {
                    pos[i + 1] = -90;
                }
            }
            posAttr.needsUpdate = true;
            this.particleSystem.rotation.y = elapsed * 0.02 + (this.mouse.x * 0.1);
        }

        // Animate Volumetric Steam
        if (this.steamSystem) {
            const posAttr = this.steamSystem.points.geometry.attributes.position;
            const pos = posAttr.array;
            const vels = this.steamSystem.velocities;

            for (let i = 0; i < this.steamSystem.count; i++) {
                const idx = i * 3;
                pos[idx] += vels[i].x + Math.sin(elapsed * 2.0 + i) * 0.03;
                pos[idx + 1] += vels[i].y;
                pos[idx + 2] += vels[i].z;

                if (pos[idx + 1] > vels[i].maxY) {
                    pos[idx + 1] = vels[i].initialY;
                    pos[idx] = 15 + (Math.random() - 0.5) * 20;
                }
            }
            posAttr.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Auto instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
    // Only enable if hardware supports WebGL
    try {
        window.teaVisuals = new TeaVisualExperience();
    } catch (e) {
        console.warn('WebGL experience initialized with graceful fallback:', e);
    }
});
