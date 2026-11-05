"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { fragment, vertex } from "./shaders/contours";

function ContourPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const mouse = useRef(new THREE.Vector2(0.62, 0.55));

  // created once; mutated through the material ref, never re-created
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.62, 0.55) },
      uInk: { value: new THREE.Color("#0e0e0c") },
      uPaper: { value: new THREE.Color("#ece9e2") },
      uAccent: { value: new THREE.Color("#e8461e") },
    }),
    [],
  );

  useEffect(() => {
    const u = material.current!.uniforms;
    const onMove = (e: PointerEvent) =>
      mouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    window.addEventListener("pointermove", onMove);

    const reveal = gsap.to(u.uReveal, {
      value: 1,
      duration: prefersReducedMotion() ? 0 : 3.2,
      delay: 0.3,
      ease: "power2.inOut",
    });
    return () => {
      window.removeEventListener("pointermove", onMove);
      reveal.kill();
    };
  }, []);

  useEffect(() => {
    material.current!.uniforms.uRes.value.set(size.width, size.height);
  }, [size]);

  useFrame((_, delta) => {
    const u = material.current!.uniforms;
    u.uTime.value += prefersReducedMotion() ? 0 : delta;
    // critically-damped follow, frame-rate independent
    u.uMouse.value.lerp(mouse.current, 1 - Math.exp(-delta * 3));
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/** Full-bleed shader canvas. Stops rendering when scrolled out of view. */
export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        flat
      >
        <ContourPlane />
      </Canvas>
    </div>
  );
}
