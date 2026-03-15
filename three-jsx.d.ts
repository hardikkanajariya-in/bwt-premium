import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  // React 19 moved JSX into the "react" module; R3F v8 augments the
  // global JSX namespace which no longer feeds IntrinsicElements.
  // Bridge the gap here.
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
