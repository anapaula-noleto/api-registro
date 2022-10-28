import "nestjs-typeorm-paginate";

declare module "nestjs-typeorm-paginate" {
  interface IPaginationOptions<CustomMetaType = IPaginationMeta> {
    inLabOnly: boolean;
    name: string;
  }
}
