export interface SeederInterface {
  seed(numberOfSeeds: number): Promise<void>;
}
