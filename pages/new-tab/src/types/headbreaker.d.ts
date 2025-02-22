declare module 'headbreaker' {
  export class Canvas {
    constructor(
      elementId: string,
      options: {
        width: number;
        height: number;
        pieceSize: number;
        proximity: number;
        borderFill: number;
        strokeWidth: number;
        lineSoftness: number;
        painter: painters;
        image?: HTMLImageElement;
        preventOffstageDrag: boolean;
      },
    );

    autogenerate(options: { horizontalPiecesCount: number; verticalPiecesCount: number }): void;

    draw(): void;
    shuffle(): void;
    destroy?(): void;
  }

  export namespace painters {
    export class Konva {
      constructor();
    }
  }
}
