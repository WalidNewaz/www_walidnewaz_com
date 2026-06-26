declare module '*.jpeg';
declare module '*.ico';

declare module "*.module.css" {
  const classes: Record<string, string>;
  export = classes;
}