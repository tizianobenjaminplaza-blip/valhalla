"use client";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function createTextTexture(gl: any, text: string, font = 'bold 30px monospace', color = 'white') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
}: {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl);
    camera.fov = 45;
    camera.position.z = 20;

    const scene = new Transform();
    const scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };

    const defaultItems = [
      { image: 'https://picsum.photos/seed/1/800/600?grayscale', text: 'Corte Clásico' },
      { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Diseño de Barba' },
      { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Afeitado Ritual' },
      { image: 'https://picsum.photos/seed/4/800/600?grayscale', text: 'El Guerrero' },
      { image: 'https://picsum.photos/seed/5/800/600?grayscale', text: 'Tratamiento' },
      { image: 'https://picsum.photos/seed/6/800/600?grayscale', text: 'Perfilado' },
    ];

    const galleryItems = items && items.length ? [...items, ...items] : [...defaultItems, ...defaultItems];

    let screen = { width: container.clientWidth, height: container.clientHeight };
    renderer.setSize(screen.width, screen.height);
    camera.perspective({ aspect: screen.width / screen.height });

    const fov = (camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(fov / 2) * camera.position.z;
    let viewport = { width: h * (screen.width / screen.height), height: h };

    const geometry = new Plane(gl, { heightSegments: 50, widthSegments: 100 });

    const medias = galleryItems.map((data, index) => {
      const texture = new Texture(gl, { generateMipmaps: true });
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = data.image;

      const program = new Program(gl, {
        depthTest: false,
        depthWrite: false,
        vertex: `
          precision highp float;
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uSpeed;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform vec2 uImageSizes;
          uniform vec2 uPlaneSizes;
          uniform sampler2D tMap;
          uniform float uBorderRadius;
          varying vec2 vUv;
          float roundedBoxSDF(vec2 p, vec2 b, float r) {
            vec2 d = abs(p) - b;
            return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
          }
          void main() {
            vec2 ratio = vec2(
              min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
              min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
            );
            vec2 uv = vec2(
              vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
              vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );
            vec4 color = texture2D(tMap, uv);
            float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
            float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
            gl_FragColor = vec4(color.rgb, alpha);
          }
        `,
        uniforms: {
          tMap: { value: texture },
          uPlaneSizes: { value: [0, 0] },
          uImageSizes: { value: [0, 0] },
          uSpeed: { value: 0 },
          uTime: { value: 100 * Math.random() },
          uBorderRadius: { value: borderRadius },
        },
        transparent: true,
      });

      img.onload = () => {
        texture.image = img;
        program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };

      const plane = new Mesh(gl, { geometry, program });
      plane.setParent(scene);

      const scale = screen.height / 1500;
      plane.scale.y = (viewport.height * (900 * scale)) / screen.height;
      plane.scale.x = (viewport.width * (700 * scale)) / screen.width;
      program.uniforms.uPlaneSizes.value = [plane.scale.x, plane.scale.y];

      const { texture: textTex, width: tw, height: th } = createTextTexture(gl, data.text, 'bold 30px sans-serif', textColor);
      const textProgram = new Program(gl, {
        vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main() { vec4 color = texture2D(tMap, vUv); if (color.a < 0.1) discard; gl_FragColor = color; }`,
        uniforms: { tMap: { value: textTex } },
        transparent: true,
      });
      const textMesh = new Mesh(gl, { geometry: new Plane(gl), program: textProgram });
      const aspect = tw / th;
      const textHeight = plane.scale.y * 0.15;
      textMesh.scale.set(textHeight * aspect, textHeight, 1);
      textMesh.position.y = -plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
      textMesh.setParent(plane);

      const padding = 2;
      const width = plane.scale.x + padding;
      const widthTotal = width * galleryItems.length;
      const x = width * index;
      let extra = 0;

      return { plane, program, width, widthTotal, x, extra };
    });

    let raf: number;
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
      const direction = scroll.current > scroll.last ? 'right' : 'left';

      medias.forEach((media) => {
        media.plane.position.x = media.x - scroll.current - media.extra;
        const x = media.plane.position.x;
        const H = viewport.width / 2;
        if (bend !== 0) {
          const B_abs = Math.abs(bend);
          const R = (H * H + B_abs * B_abs) / (2 * B_abs);
          const effectiveX = Math.min(Math.abs(x), H);
          const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
          media.plane.position.y = bend > 0 ? -arc : arc;
          media.plane.rotation.z = bend > 0
            ? -Math.sign(x) * Math.asin(effectiveX / R)
            : Math.sign(x) * Math.asin(effectiveX / R);
        }

        media.program.uniforms.uTime.value += 0.04;
        media.program.uniforms.uSpeed.value = scroll.current - scroll.last;

        const planeOffset = media.plane.scale.x / 2;
        const viewportOffset = viewport.width / 2;
        const isBefore = media.plane.position.x + planeOffset < -viewportOffset;
        const isAfter = media.plane.position.x - planeOffset > viewportOffset;
        if (direction === 'right' && isBefore) media.extra -= media.widthTotal;
        if (direction === 'left' && isAfter) media.extra += media.widthTotal;
      });

      renderer.render({ scene, camera });
      scroll.last = scroll.current;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    const onWheel = (e: WheelEvent) => { scroll.target += e.deltaY * 0.01 * scrollSpeed; };
    let isDown = false, startX = 0, startScroll = 0;
    const onDown = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      startScroll = scroll.current;
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      scroll.target = startScroll + (startX - x) * 0.05 * scrollSpeed;
    };
    const onUp = () => { isDown = false; };

    window.addEventListener('wheel', onWheel);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchstart', onDown as any);
    window.addEventListener('touchmove', onMove as any);
    window.addEventListener('touchend', onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', onDown as any);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('touchend', onUp);
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="circular-gallery" />;
}