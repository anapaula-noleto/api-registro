import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Hoolhoja")
    .setDescription(
      "API for logging people in and out of a lab and generating reports"
    )
    .setVersion("1.0")
    .addTag("Register", "Entry and exit registration operations")
    .addTag("User", "Operations about user ")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap();
