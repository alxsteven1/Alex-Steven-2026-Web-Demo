declare module "*.css" {
  const content: string;
  export default content;
}

// Covers all shader types mentioned in your config
declare module "*.glsl";
declare module "*.vs";
declare module "*.fs";
declare module "*.vert";
declare module "*.frag";
