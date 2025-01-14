-- CreateTable
CREATE TABLE "PositionProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PositionProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PositionProduct_positionId_productId_key" ON "PositionProduct"("positionId", "productId");

-- AddForeignKey
ALTER TABLE "PositionProduct" ADD CONSTRAINT "PositionProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionProduct" ADD CONSTRAINT "PositionProduct_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
