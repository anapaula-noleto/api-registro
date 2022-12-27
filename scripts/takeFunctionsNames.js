import { Project } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "./tsconfig.json"
});

const sourceFile = project.getSourceFileOrThrow("src/auth/auth.service.ts");

const classes = sourceFile.getClasses();

console.log(classes[0].getMethods().map((method) => method.getName()));
