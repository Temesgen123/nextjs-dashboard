declare module '*.css' {
  const content: string;
  export default content;
}

// For side-effect imports
declare module '@app/ui/global.css' {
  const content: any;
  export default content;
}
