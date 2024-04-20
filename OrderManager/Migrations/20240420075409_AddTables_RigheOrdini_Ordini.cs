using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderManager.Migrations
{
    /// <inheritdoc />
    public partial class AddTables_RigheOrdini_Ordini : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ordini",
                columns: table => new
                {
                    OrdineId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataCreazione = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClienteId = table.Column<long>(type: "bigint", nullable: false),
                    FareFattura = table.Column<bool>(type: "bit", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ordini", x => x.OrdineId);
                    table.ForeignKey(
                        name: "FK_Ordini_Clienti_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clienti",
                        principalColumn: "ClienteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RigheOrdini",
                columns: table => new
                {
                    RigaOrdineId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProdottoId = table.Column<long>(type: "bigint", nullable: false),
                    UnitaDiMisura = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantita = table.Column<int>(type: "int", nullable: false),
                    OrdineId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RigheOrdini", x => x.RigaOrdineId);
                    table.ForeignKey(
                        name: "FK_RigheOrdini_Ordini_OrdineId",
                        column: x => x.OrdineId,
                        principalTable: "Ordini",
                        principalColumn: "OrdineId");
                    table.ForeignKey(
                        name: "FK_RigheOrdini_Prodotti_ProdottoId",
                        column: x => x.ProdottoId,
                        principalTable: "Prodotti",
                        principalColumn: "ProdottoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ordini_ClienteId",
                table: "Ordini",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_RigheOrdini_OrdineId",
                table: "RigheOrdini",
                column: "OrdineId");

            migrationBuilder.CreateIndex(
                name: "IX_RigheOrdini_ProdottoId",
                table: "RigheOrdini",
                column: "ProdottoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RigheOrdini");

            migrationBuilder.DropTable(
                name: "Ordini");
        }
    }
}
